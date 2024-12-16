import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    orderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        },
        orderNo:{
            type:Number,
            required:true
        },
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        varientId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Variant"
        },
        qty:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true,
        },
        subTotal:{
            type:Number,
            required:true,
        },
        tax:{
            type:Number,
            required:true,
        }
},{
    timestamps:true
})

export const CartItem = mongoose.model("CartItem",cartItemSchema)