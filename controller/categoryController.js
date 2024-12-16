

export const createCategory = async (req, res) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ success: false, message: "category image required" })
        }
        const { categoryImage } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedFormats.includes(categoryImage.mimetype)) {
            return  res.status(400).json({ success: false, message: "file format not supported" })
        }

        const { categoryName, categoryDescription } = req.body;

        if (!categoryName || !categoryDescription) {
            return res.status(400).json({ success: false, message: "Please provide all the required details" })
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(
            categoryImage.tempFilePath
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary Error:", cloudinaryResponse?.error || "Unknown Cloudinary Error");
            return res.status(500).json({ success: false, message: "Cloudinary upload failed", error: cloudinaryResponse.error });
        }
        const category = await Category.create({
            categoryName, categoryDescription, categoryImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        })

    } catch (err) {
        return res.status(500).json({ success: false, category,message: "Internal issue" });
    }
}

export const editCategory = async (req, res) => {

}

export const getAllCategory = async (req, res) => {

}

export const deleteCategory = async (req, res) => {

}