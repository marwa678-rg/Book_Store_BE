//IMPORTS
const {Book} = require("../models/Book");
const { addBookSchema, updateBookSchema } = require("../validation/bookValidation");

//INTERNAL IMPORTS

//Get All Books
//Get all Books by Pagination
async function getALLBooks(request,response){
  try {
    //Pagination
    let {page=1,pageSize=10,search=""}=request.query;

    const limit= pageSize;
    const skip=(page-1) * pageSize;
//search condition
    const query ={$or:[
      {title:{$regex:search,$options:"i"}},
      {author:{$regex:search,$options:"i"}},
      {category:{$regex:search,$options:"i"}},
    ]}



    const books= await Book.find(query)
                  .populate("userId","_password")
                  .skip(skip)
                  .limit(limit)
                  .sort({createdAt:-1})// sort by newest book
                  

      //total of books
      const total = await Book.countDocuments(query);  
      //response
      response.json({page,limit,search,total,books});
      
  } catch (error) {
    console.log(error);
    response.status(500).json({message:"Internal Server Error"})
  }
}
//Get Single Book + user info
async function getSingleBook(request,response){
try {
  
    const bookId = request.params.id;
  const book = await Book.findById(bookId)
                .populate("userId", "name  email")  ;
   //validate              
  if(!book){
    return response.status(404).json({message:"Book Not Found"})
  }

  response.json({data:book});
} catch (error) {
   console.log(error);
    response.status(500).json({message:"Internal Server Error"})
}
}
//Add New Book
async function addNewBook(request,response){
try {
    //validate
  const {error,value}= addBookSchema.validate(request.body,{abortEarly:true})
  if(error){
   return response.status(400).json({
        messages: error.details.map((e) => e.message),
      });
  }
  //extract data
const {title,author,category,coverImage,stock,price}= value;
//get user by authMiddleware
const userId= request.user.id;
//create book
const book= await Book.create({
  title,
  author,
  category,
  coverImage,
  stock,
  price,
  userId,
})
return response.status(201).json({message:"Book Added successfully",book})
} catch (error) {
  console.log(error);
    response.status(500).json({message:"Internal Server Error"})
}

}
//update BOOK
async function updateBook(request,response){
  try {
    const bookId = request.params.id;
    //validate
    const {error,value}=updateBookSchema.validate(request.body,{abortEarly:true});
    if(error){
      return response.status(400).json({messages:error.details.map((e)=>e.message)})
    }
//Extract DATA  
const {stock,price}=value;
//check if book exists
const book = await Book.findById(bookId);
if(!book){
  return response.status(404).json({message:"Book Not Found"})
}

//update 
if(stock !== undefined) book.stock = stock;

if(price !== undefined) book.price = price;

await book.save();

response.json({
  message:"Book Updated Successfully",
  data:book,
})
  } catch (error) {
    console.log(error);
    response.status(500).json({message:"Internal Server Error"})
  }

}
//DELETE BOOK
async function deleteBook (request,response){
  try {
    const bookId = request.params.id;
    //check existence
    const isExist= await Book.findById(bookId);
    if(!isExist){
      return response.status(404).json({message:"Book Not Found"})
    }

    await isExist.deleteOne();

    response.json({message:"Book Removed from Site"})



  } catch (error) {
        console.log(error);
    response.status(500).json({message:"Internal Server Error"})
  }
}


module.exports={
  getALLBooks,
  getSingleBook,
  addNewBook,
  updateBook,
  deleteBook,
}