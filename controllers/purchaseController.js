const { Book } = require("../models/Book");
const { Purchase } = require("../models/Purchase");
const { User } = require("../models/User");


//  We have=> bookId
async function buyBook(request,response){
  try {
    const userId = request.user.id;
    console.log(userId)
    const bookId = request.params.bookId;
    //check book exists
    if(!bookId){
      return response.status(400).json({message:"Book Not Found"});
    }
    //check stock
    const book = await Book.findById(bookId)
                             
    if(!book){
      return response.status(404).json({message:"This Book Not Found"})
    }
    if(book.stock < 1){
      return response.status(404).json({message:"This Book OUT of Stock"})
    }
    //create purchase
    const purchase = await Purchase.create({
      userId,
      bookId,
      price:book.price,
      buyDate:Date.now(),

    });

    //Decrease Stock
    book.stock -= 1;
    await book.save();

    response.status(201).json({message:"Book Purchased Successfully",
      purchase
    })



  } catch (error) {
     console.log(error);
    response.status(500).json({message:"Internal Server Error"})
  }
}

async function getMyPurchases(request,response){
  try {
    const userId = request.user.id;

    const myPurchases = await Purchase.find({userId})
    .populate("bookId","title price" ).select("buyDate ")

                                     

response.json({myPurchases,
  count:myPurchases.length,
  })
  } catch (error) {
     console.log(error);
    response.status(500).json({message:"Internal Server Error"})
  }
}





module.exports={
  buyBook,
  getMyPurchases,
}