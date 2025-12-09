

//Imports
const express = require("express");
const dotenv = require("dotenv");
//config
dotenv.config();
//
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const purchaseRoutes = require("./routes/purchases");
const errorHandler = require("./middleware/errorHandler");
const{connectToDatabase}=require("./utils/db");


//APP
const app = express();

//Global
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/purchases", purchaseRoutes);

app.use(errorHandler);
//connection Mongo DB
connectToDatabase();
//Main Routes
app.get("/",(request,response)=>{
  response.send("Welcome To Backend .")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
