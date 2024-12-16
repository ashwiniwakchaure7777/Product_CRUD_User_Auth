import { timeStamp } from "console";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productImage:{
        type:String,
        required:true,
    },
    sku:{
        type:String,
        required:true,
    },
    isMultivarient:{
        type:Boolean,
    },
    description:{
        type:String,
        required:true
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Brand"
    },
    itemInfo:{
        costPrice:{
            type:Number,
            required:true
        },
        sellingPrice:{
            type:Number,
            required:true,
        },
        qty:{
            type:Number,
            required:true
        }
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    productCreadtedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
   
}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema);
export default Product;