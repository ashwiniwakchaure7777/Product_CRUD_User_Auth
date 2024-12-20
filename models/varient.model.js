import mongoose from "mongoose";

const varientSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    skuName: {
      type: String,
    },
    parentSku: {
      type: String,
    },
    itemName: {
      type: String,
    },
    costPrice: {
      type: Number,
    },
    sellingPrice: {
      type: Number,
    },
    qty: {
      type: Number,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    varientCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Variant = mongoose.model("Variant", varientSchema);
export default Variant;
