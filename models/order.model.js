import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderNo: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    totalQty: {
      type: Number,
    },
    totalTax: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    grandTotal: {
      type: Number,
    },
    shippingAddress: {
      type: String,
    },
    billingAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(autoIncrement, {
  inc_field: "orderNo",
  startAt: 1000,
  incrementBy: 1,
});

export const Order = mongoose.model("Order", orderSchema);
