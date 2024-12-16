import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
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
})

export default OrderItem = mongoose.model("OrderItem",orderItemSchema);