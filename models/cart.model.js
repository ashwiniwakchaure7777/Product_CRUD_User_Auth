import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    totalQty: {
      type: Number,
      default: 0,
    },
    totalTax: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      type: Object,
    },
    billingAddress: {
      type: Object,
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
