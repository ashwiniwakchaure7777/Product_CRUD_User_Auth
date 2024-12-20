import { Product } from "../models/product.model.js";

export const createproduct = async (req, res) => {
  try {
    const {
      productName,
      qty = 0,
      isMultivarient = false,
      sku = "",
      description = "",
      brandId,
      costPrice = 0,
      sellingPrice = 0,
    } = req.body;
    const { user } = req;
    console.log(req.body);
    // Proceed only if the user is authorized
    if (!productName || !qty || !sku || !costPrice || !sellingPrice) {
      return res.status(400).json({
        success: false,
        message: "Provide all required details",
      });
    }

    // Create the product, passing the user's role (from `user` object) if needed
    const product = await Product.create({
      productName,
      isMultivarient,
      sku,
      description,
      brandId,
      itemInfo: {
        qty,
        costPrice,
        sellingPrice,
      },
      productCreadtedBy: user?.id,
    });

    res.status(200).json({
      success: true,
      product,
      message: "Product created successfully",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const allProducts = async (req, res) => {
  try {

    const [products, totalProduct] = await Promise.all([
      Product.find(),
      Product.countDocuments()
    ])
  
    return res.status(200).json({
      success: true,
      products,
      totalProduct,
      message: "Products fetched successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    return res
      .status(200)
      .json({ success: true, product, message: "Product details" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const editproduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const productDetails = req.body;

    let product = await Product.findByIdAndUpdate(productId, productDetails, {
      new: true,
    });
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not available in database" });
    }

    res
      .status(200)
      .json({ success: true, product, message: "Product details updated" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteproduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.deleteOne({ _id: productId });
    

    if (product.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      product,
      message: "Product deleted successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
