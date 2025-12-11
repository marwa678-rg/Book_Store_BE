//Imports
const multer= require("multer")
const path=require("path")
//STORAGE CONFIG
const storage = multer.diskStorage({
  destination :function(request,file,cb){
   cb(null,path.join(__dirname,"..","public","uploads"));
  },

  filename: function(request,file,cb){
    const uniqueName = Date.now()+"_"+file.originalname;
    cb(null,uniqueName);
  }
});

//fileFilter
function fileFilter(request,file,cb){
  if(file.mimetype.startsWith("image")){
    cb(null,true);
  }else{
    cb(new Error("Only images allowed"),false);
  }
}


const upload = multer({storage,
  fileFilter
})

module.exports={upload};