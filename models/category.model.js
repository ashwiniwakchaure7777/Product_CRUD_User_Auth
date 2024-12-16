import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String,
        required: true
    },
    categoryDescription: {
        type: String,
        default:"",
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }, 
    varientCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, 
{
    timestamps: true
}
)

export default Category = mongoose.model("Category", categorySchema); 