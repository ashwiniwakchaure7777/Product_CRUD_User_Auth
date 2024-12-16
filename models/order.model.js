import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);
const orderSchema = new mongoose.Schema({
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

},
    {
        timestamps: true
    })

orderSchema.plugin(autoIncrement, { inc_field: "orderNo", startAt: 1000, incrementBy: 1 })

export const Order = mongoose.model("Order", orderSchema);