import mongoose from "mongoose";

const varientSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    skuName:{
        type:String,
        required:true,
    },
    parentSku:{
        type:String,
        required:true,
    },
    itemName:{
        type:String,
        required:true,
    },
    costPrice:{
        type:Number,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true,
    },
    qty:{
        type:Number,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false,
        required:true
    },
    varientCreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

export default Variant = mongoose.model("Variant", varientSchema);