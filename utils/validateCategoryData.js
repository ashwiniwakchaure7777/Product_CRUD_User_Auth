const validateCategoryData = (body, files) => {
    if (!req.files || Object.keys(files).length === 0) {
        return "Category image required";
    }
    if (!["image/png", "image/jpeg", "image/jpg"].includes(files.categoryImage.mimetype)) {
        return "File format not supported";
    }
    const { categoryName, categoryDescription } = body;
    if (!categoryName || !categoryDescription) {
        return "Please provide all the required details";
    }
    return null;
};

export default validateCategoryData;