import { Cart } from "../models/cart.model.js";
import { CartItem } from "../models/cartItem.model.js";
import Product from "../models/product.model.js";
import Variant from "../models/varient.model.js";

export const viewCart = async (req, res) => {
  try {
    // Access decoded user from req.user (populated by authentication middleware)
    const user = req.user;

    console.log("View Cart", user);
    const cartData = await Cart.findOne({ userId: user.id });
    if (!cartData) {
      return res
        .status(400)
        .json({ success: false, message: "cart data not available" });
    }
    return res
      .status(200)
      .json({ success: true, cartData, message: "cart successfully fetched" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const user = req.user;
    const {
      productId = null,
      varientId = null,
      isMultivarient = false,
      qty = 0,
      tax = 0,
    } = req.body;
    console.log(req.body, {
      productId,
      varientId,
      isMultivarient,
      qty,
      tax,
    });
    if (!productId || !qty) {
      return res.status(400).json({
        success: false,
        message: "Please add the product in cart",
      });
    }

    const isMultivarientBool = isMultivarient === "true";

    if (isMultivarientBool && !varientId) {
      return res.status(400).json({
        success: false,
        message: "Please send the variant id if multivariant",
      });
    }

    let cart = await Cart.findOne({ userId: user.id });

    if (!cart) {
      cart = await Cart.create({ userId: user.id });
    }

    let price = 0;

    if (isMultivarientBool) {
      console.log("I m coming");
      const isVarient = await Variant.findById(varientId);
      if (!isVarient) {
        return res.status(404).json({
          success: false,
          message: "selected item not found",
        });
      }
      if (qty > isVarient?.qty) {
        return res.status(400).json({
          success: false,
          message: "Order qty is out of stock",
        });
      }
      price = isVarient?.sellingPrice;
    } else {
      const isProduct = await Product.findById(productId);
      if (!isProduct) {
        return res.status(404).json({
          success: false,
          message: "selected product not found",
        });
      }

      if (qty > isProduct?.itemInfo?.qty) {
        return res.status(400).json({
          success: false,
          message: "Order qty is out of stock",
        });
      }
      price = isProduct?.itemInfo?.sellingPrice;
    }
    
    const subTotal = parseFloat(price) * parseInt(qty);
    console.log("subTotal",price,qty, subTotal)
    await CartItem.findOneAndUpdate(
      {
        cartId: cart?._id,
        productId,
        isMultivarient: isMultivarientBool,
        varientId,
      },
      {
        $set: {
          tax: +tax,
          price: parseFloat(price),
        },
        $inc: {
          qty,
          subTotal,
        },
      },
      {
        upsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      cart,
      message: "Product added to cart successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateCartQty = async (req, res) => {
  try {
    const user = req.user;

    const { cartQuantity, productId } = req.body;

    if (!productId || !cartQuantity) {
      return res
        .status(400)
        .json({ message: "Please add the product in cart" });
    }
    let cart = await Cart.findOne({ userId: user.id });

    if (!cart) {
      return res
        .status(400)
        .json({ success: false, message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    cart.products[productIndex].cartQuantity = cartQuantity;

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate({
      path: "products.productId",
      select: "productName price img",
    });

    res.status(200).json({
      success: true,
      populatedCart,
      message: "cart qty updated successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "ProductId required" });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: user.id },
      { $pull: { products: { productId: productId } } },
      { new: true }
    );
    console.log(updatedCart);
    if (updatedCart.products.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "product removed" });
    }

    res.status(200).json({
      success: true,
      updatedCart,
      message: "Cart product removed successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const emptyCart = async (req, res) => {
  try {
    const user = req.user;

    const cart = await Cart.findOneAndDelete({ userId: user.id });

    if (!cart) {
      console.log("Cart deleted successfully");
    }

    res
      .status(200)
      .json({ success: true, message: "Cart deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
