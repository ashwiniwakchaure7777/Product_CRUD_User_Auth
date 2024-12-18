import { timeStamp } from "console";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
    },
    sku: {
      type: String,
      required: true,
    },
    isMultivarient: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    itemInfo: {
      costPrice: {
        type: Number,
      },
      sellingPrice: {
        type: Number,
      },
      qty: {
        type: Number,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    productCreadtedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
export default Product;
