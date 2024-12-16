import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    orderQuantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, 
{
    timestamps: true
})


export const Order = mongoose.model("Order", orderSchema);