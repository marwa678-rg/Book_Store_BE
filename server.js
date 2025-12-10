
//Imports
const express = require("express");
const dotenv = require("dotenv");
const { default: rateLimit }=require("express-rate-limit")
const cors = require("cors")
//Internal Imports
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const purchaseRoutes = require("./routes/purchases");
const connectToDatabase = require("./utils/db");


//Global Comnfig
dotenv.config();
//App
const app = express();
const PORT = process.env.PORT || 3000;

//Global Middlewares
app.use(express.json());
app.use(cors({
  origin:JSON.parse(process.env.PRODUCTION_ENV)?
  process.env.CLIENT_ORIGIN  :"*",
}));




//rate Limit
const limiter = rateLimit({
  windowMs:15 * 60 *1000,
  limit:100,
});
app.use(limiter);
//Main Routes
app.get("/", (req, res) => {
  res.send("Welcome To Backend.");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/purchases", purchaseRoutes);


//Connection Cloud DB
connectToDatabase();



//Run server
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
