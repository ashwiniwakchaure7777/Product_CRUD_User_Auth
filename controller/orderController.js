import { CartItem } from "../models/cartItem.model.js";
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItems.model.js";
import { Cart } from "../models/cart.model.js";

export const getAllOrders = async (req, res) => {
  try {
    let { page = 1, limit = 2, search = null } = req.query;
    const skip = (page - 1) * limit;
    let query = {};

    if (search) {
      const searchQuery = new RegExp(search.toString(), "i") || null;
      query.$or = [
        { shippingAddress: searchQuery },
        { billingAddress: searchQuery },
      ];
    }

    const [orders, totalOrders] = await Promise.all([
      Order.find(query).skip(skip).limit(limit),
      Order.countDocuments(query),
    ]);

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "orders not available",
      });
    }

    const totalPages = Math.ceil(totalOrders / limit);
    res.status(200).json({
      success: true,
      message: "Here is the orders",
      orders,
      totalOrders: totalOrders,
      totalPages: totalPages,
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json({
      success: false,
      message: "Internal issue",
      error: err,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Please provide order details",
      });
    }
    const [order,orderItems] = await Promise.all([
      Order.findOne({ _id: orderId }),
      OrderItem.find({ orderId })
    ])

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not available in db" });
    }

    res.status(200).json({
      success: true,
      message: "Order details",
      order,
      orderItems,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal issue" });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const user = req.user;

    const userCart = await Cart.findOne({ userId: user._id });

    if (!userCart) {
      return res.status(400).json({
        success: false,
        message: "Cart not available",
      });
    }
    const cartItems = await CartItem.find({ cartId: userCart._id });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart items not available",
      });
    }

    const { totalAmount, totalQty, totalTax } = cartItems.reduce(
      (acc, item) => {
        acc.totalAmount += item.subTotal + item.tax;
        acc.totalQty += item.qty + item.tax;
        acc.totalTax += item.qty + item.tax;

        return acc;
      },
      { totalAmount: 0, totalQty: 0, totalTax: 0 }
    );

    const newOrder = await Order.create({
      userId: user._id,
      totalAmount: totalAmount,
      totalQty: totalQty,
      discount: 0,
      grandTotal: totalAmount + totalTax,
      shippingAddress: user.shippingAddress,
      billingAddress: user.billingAddress,
    });

    if (!newOrder) {
      return res.status(500).json({
        status: false,
        message: "Error while creating the order",
      });
    }

    const orderItems = cartItems.map((cartItem) => ({
      orderId: newOrder._id,
      productId: cartItem.productId,
      varientId: cartItem.varientId || null,
      qty: cartItem.qty,
      price: cartItem.price,
      tax: cartItem.tax,
      subTotal: cartItem.subTotal,
    }));

    const placeItems = await OrderItem.insertMany(orderItems);

    if (!placeItems || placeItems?.length == 0) {
      return res.status(500).json({
        status: false,
        message: "Error while creating order items",
      });
    }

    await Promise.all([
      Cart.findOneAndDelete({ _id: userCart._id }),
      CartItem.deleteMany({ _id: userCart._id }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      newOrder,
      orderItems,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal issue" });
  }
};
