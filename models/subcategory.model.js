import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subcategoryName: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    varientCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

export const Subcategory = mongoose.model("Subcategory",subcategorySchema);