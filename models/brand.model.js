import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brandName:{
        type:String,
        required:true,
    },
    brandImage:{
        type:String,
        required:true
    },
    description:{   
        type:String,
        required:true,
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    } ,
    brandCreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }  
},
{
    timestamps:true
})

export const Brand = mongoose.model("Brand", brandSchema);