import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
       },
       orderNo: {
           type: Number
       },
       totalAmount: {
           type: Number,
           required: true
       },
       totalQty: {
           type: Number,
           required: true,
       },
       totalTax: {
           type: Number,
           required: true,
       },
       discount: {
           type: Number,
           required: true,
       },
       grandTotal: {
           type: Number,
           required: true,
       },
       shippingAddress: {
           type: Object,
           required: true,
       },
       billingAddress: {
           type: Object,
           required: true
       }
},{timestamps:true});

export const Cart = mongoose.model("Cart", cartSchema);