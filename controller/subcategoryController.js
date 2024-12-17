import {Subcategory} from "../models/subcategory.model.js";


export const getAllSubcategory = async (req, res) => {
    try {
        const subcategories = await Subcategory.find();

        if (!subcategories) {
            return res.status(400).json({ success: false, message: "Subcategories not available in db" });
        }

        res.status(200).json({ success: true, subcategories, message: "Here is your all subcategories" });
    } catch (err) {
        return res.status(200).json({ success: false, message: "Internal issue" });
    }
}

export const getAllSubcategoryById = async (req, res) => {
    try{
        const {subcategoryId} = req.params;

        if(!subcategoryId){
            return res.status(400).json({success:false,message:"Please provide subcategory id"});
        }

        const subcategory = await Subcategory.findById(subcategoryId);

        if(!subcategory){
            return res.status(400).json({success:false,message:"Data not found"});
        }

        return res.status(200).json({success:true,subcategory,message:"Here is your subcategory details"})

    }catch(err){    
        return res.status(500).json({success:false,message:"Internal issue"});
    }
}

export const createSubcategory = async (req, res) => {
    try{
        const {categoryId,subcategoryName} = req.body;

        if(!categoryId || !subcategoryName){
            return res.status(400).json({success:false,message:"Please provide all the details"});
        }

        const subcatgeory = await Subcategory.create({categoryId,subcategoryName});

        if(!subcatgeory){
            return res.status(400).json({success:false,message:"subcategory not created"});
        }

        res.status(200).json({success:true,subcatgeory,message:"subcategory created"});

    }catch(err){
        return res.status(500).json({success:false,message:"Internal issue"});
    }
}

export const updateSubcategory = async (req, res) => {
    try{    
        const {subcategoryId} = req.params;
        const updationDetails = req.body;

        if(!subcategoryId || !updationDetails){
            return res.status(400).json({success:false, message:"Please provide subcategory id"});
        }

        const subcategory = await Subcategory.findByIdAndUpdate({_id:subcategoryId},{updationDetails},{new:true});

        res.status(200).json({success:true,subcategory, message:"Subcategory updated"})

    }catch(err){
        return res.status(500).json({success:false, message:"Internal issue"});
    }
}

export const deleteSubcategory = async (req, res) => {
    try{
        const {subcategoryId} = req.params;

        if(!subcategoryId){
            return res.status(400).json({success:false,message:"Please provide the subcategory id"})
        }

        const result = await Subcategory.deleteOne({_id:subcategoryId});

        res.status(200).json({success:true,result, message:" Subcategory deleted successfully"})
    }catch(err){    
        return res.status(500).json({success:false,message:"Intenal issue"});
    }
}