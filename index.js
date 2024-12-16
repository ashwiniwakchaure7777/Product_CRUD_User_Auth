import express from "express";
import dbConnection from "./config/dbConnection.js";
import productRoute from "./route/productRoute.js";
import userRoute from "./route/userRouter.js";
import cartRoute from "./route/cartRoute.js";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import cloudinaryConnect from "./config/cloudinary.js";



const app = express();
dotenv.config({path:'./config/.env'});

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/product", productRoute);
app.use("/api/user",userRoute);
app.use("/api/cart",cartRoute);

app.listen(process.env.PORT || 3000, ()=>{
   try{
    dbConnection();
    cloudinaryConnect();
    console.log("server is running on port 3000...");
   }catch(err){
    console.log(err);
   }
})