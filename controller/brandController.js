import {Brand} from "../models/brand.model.js";



export const getAllBrands = async(req,res)=>{
    try{
        const brands = await Brand.find();

        if(!brands){
            return res.status(400).json({success:false, message:"Brands not found"});
        }
        res.status(200).json({success:true,message:"Here is your brand details"});

    }catch(err){
        return res.status(500).json({success:false,brands,message:"Internal issue"})
    }
}
export const getBrandDetails = async(req,res)=>{
    try{
        const {brandId} = req.params;

        if(!brandId){
            return res.status(400).json({success:false,message:"Please provide brand id"})
        }

        const brand = await Brand.findOne({_id:brandId});

        if(!brand){
            return res.status(400).json({success:false,message:"brand not found"})
        }
        res.status(200).json({success:true, message:"Here is you brand details"});
    }catch(err){
        return res.status(500).json({success:false,message:"Internal issue"})
    }
}
export const createBrand = async(req,res)=>{
    try{
        const {brandName,description} = req.body;

        if(!brandName || !description){
            res.status(400).json({success:false, message:"Please provide the details"});
        }
        const brandImage = "https://imgs.search.brave.com/aSVDlntDUJUB8_MmRVuFaQZztB01_fRwbfY3EUJdDk8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FybG9nb3Mub3Jn/L2xvZ28vRmVycmFy/aS1sb2dvLnBuZw";
        const brand = await Brand.create({brandName,description,brandImage});

        if(!brand){
            res.staus(400).json({success:true, message:"Brand not created"})
        }
        res.status(200).json({success:true,brand,message:"brand created"})
    }catch(err){
        return res.status(500).json({success:false,brandmessage:"Internal issue"})
    }
}
export const updateBrand = async(req,res)=>{
    try{
        const {brandId} = req.params;
        const updationData = req.body;

        if(!brandId || !updationData){
            return res.status(400).json({success:false, message:"Please provide the details"})
        }

        const updatedBrand = await Brand.findByIdAndUpdate({_id:brandId}, {updationData},{new:true});

        if(!updatedBrand){
            return res.status(400).json({success:false, message:"brand not updated"})
        }
        res.status(200).json({success:true,message:"Brand updated"})
    }catch(err){
        return res.status(500).json({success:false,message:"Internal issue"})
    }
}
export const deleteBrand = async(req,res)=>{
    try{    
        const {brandId} = req.params;

        if(!brandId){
            return res.status(400).json({success: true, message:"PLease provide brand id"});
        }
        const brand = await Brand.findOne({_id:brandId});
        if(!brand){
            return res.status(404).json({message:"Brand Id not available in db"});
        }
        const result = await Brand.deleteOne({_id:brandId});

        res.status(200).json({success:true, message:"Brand deleted",brand,result});

    }catch(err){
        return res.status(500).json({success:false,message:"Internal issue"})
    }
}