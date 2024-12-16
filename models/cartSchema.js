import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    products:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required: true,
        },
        cartQuantity:{
            type:Number,
            default:1,
            min:1,
        }

    }]
},{timestamps:true});

export const Cart = mongoose.model("Cart", cartSchema);