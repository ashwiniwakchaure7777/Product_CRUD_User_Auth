import { timeStamp } from "console";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["electonics", "clothing", "gadgets", "homeDecor"],
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    qty: {
        type: String,
        required: true,
    },
    productCreadtedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    img:{
        type:String,
    }
}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema);
export default Product;