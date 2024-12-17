import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    varientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
    },
    isMultivarient: {
      type: Boolean,
      default: false,
    },
    qty: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    subTotal: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const CartItem = mongoose.model("CartItem", cartItemSchema);
