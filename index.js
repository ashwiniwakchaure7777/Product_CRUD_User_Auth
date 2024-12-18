import express from "express";
import dbConnection from "./config/dbConnection.js";
import productRoute from "./route/productRoute.js";
import userRoute from "./route/userRouter.js";
import cartRoute from "./route/cartRoute.js";
import categoryRoute from "./route/categoryRoute.js";
import subcategoryRoute from "./route/subcategoryRoute.js";
import brandRoute from "./route/brandRoute.js";
import orderRoute from "./route/orderRoute.js";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import cloudinaryConnect from "./config/cloudinary.js";
import fileupload from "express-fileupload";



const app = express();
dotenv.config({path:'./config/.env'});


app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileupload({
   useTempFiles: true,
   tempFileDir: '/tmp/', // Temporary directory for uploaded files
   createParentPath: true, // Ensures the temp directory exists
 }));

app.use("/api/product", productRoute);
app.use("/api/user",userRoute);
app.use("/api/cart",cartRoute);
app.use("/api/category",categoryRoute);
app.use("/api/subcategory",subcategoryRoute);
app.use("/api/brand",brandRoute);
app.use("/api/order",orderRoute);

app.listen(process.env.PORT || 3000, ()=>{
   try{
    dbConnection();
    cloudinaryConnect();
    console.log("server is running on port 3000...");
   }catch(err){
    console.log(err);
   }
})