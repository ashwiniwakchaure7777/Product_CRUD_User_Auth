import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryImage: {
        public_id: {type:String},
        url: {type:String},
      },
    categoryDescription: {
        type: String,
        default: "",
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

export const Category = mongoose.model("Category", categorySchema); 