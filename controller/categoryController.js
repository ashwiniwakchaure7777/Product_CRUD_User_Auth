import { Category } from "../models/category.model.js";
// import cloudinary from "cloudinary";

export const createCategory = async (req, res) => {
  try {
    console.log(req.files, req.body);

    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "category image required" });
    // }
    // const { categoryImage } = req.files;
    // const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
    // if (!allowedFormats.includes(categoryImage.mimetype)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "file format not supported" });
    // }
    const categoryImage =
      "https://images.squarespace-cdn.com/content/v1/62ec1ff71a3945114dc3c287/1681763230299-CSLTFH492FGT1ML3RCMD/654-010+Roll-on.jpg";
    const { categoryName, categoryDescription } = req.body;

    if (!categoryName || !categoryDescription) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required details",
      });
    }
    // const cloudinaryResponse = await cloudinary.uploader.upload(
    //   categoryImage.tempFilePath
    // );
    // if (!cloudinaryResponse || cloudinaryResponse.error) {
    //   console.error(
    //     "Cloudinary Error:",
    //     cloudinaryResponse?.error || "Unknown Cloudinary Error"
    //   );
    //   return res
    //     .status(500)
    //     .json({
    //       success: false,
    //       message: "Cloudinary upload failed",
    //       error: cloudinaryResponse.error,
    //     });
    // }
    const category = await Category.create({
      categoryName,
      categoryDescription,
      categoryImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res
      .status(200)
      .json({ success: true, category, message: "category created" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal issue" });
  }
};

export const editCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const categoryData = req.body;
    if (!categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide category id" });
    }
    let category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category not found" });
    }

    category = await Category.findByIdAndUpdate(
      { _id: categoryId },
      categoryData
    );

    return res.status(200).json({ success: true, message: "Category updated" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res
        .status(400)
        .json({ success: false, message: "Categories not available" });
    }

    res.status(400).json({
      success: true,
      categories,
      message: "Here is your category list",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal issue" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide category id" });
    }

    const result = await Category.deleteOne({ _id: categoryId });

    return res
      .status(200)
      .json({ success: true, result, message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal Issue" });
  }
};
