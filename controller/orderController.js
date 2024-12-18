import { CartItem } from "../models/cartItem.model.js";
import { Order } from "../models/order.model.js";
import { OrderItem } from "../models/orderItems.model.js";
import { Cart } from "../models/cart.model.js";

export const getAllOrders = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const skip = (page - 1) * limit;

    const orders = await Order.find().skip(skip).limit(limit);
    const totalOrders = await Order.countDocuments();

    const totalPages = Math.ceil(totalOrders / limit);
    if (!orders || !orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "orders not available" });
    }

    res
      .status(200)
      .json({ success: true, message: "Here is the orders", orders,totalOrders:totalOrders,totalPages:totalPages});
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal issue" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide order details" });
    }
    const order = await Order.findOne({ _id: orderId });
    const orderItems = await OrderItem.find({ orderId });

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not available in db" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order details", order, orderItems });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal issue" });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const user = req.user;

    const userCart = await Cart.findOne({ userId: user._id });

    if (!userCart) {
      return res
        .status(400)
        .json({ success: false, message: "Cart not available" });
    }

    const cartItems = await CartItem.find({ cartId: userCart._id });
    // Create a new order

    if (!cartItems || cartItems.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Cart items not available" });
    }

    const totalAmount = cartItems.reduce(
      (total, item) => total + item.subTotal + item.tax,
      0
    );
    const totalQty = cartItems.reduce(
      (total, item) => total + item.qty + item.tax,
      0
    );
    const totalTax = cartItems.reduce((total, item) => total + item.tax, 0);
    const newOrder = await Order.create({
      userId: user._id,
      totalAmount: totalAmount,
      totalQty: totalQty,
      discount: 0,
      grandTotal: totalAmount + totalTax,
      shippingAddress: user.shippingAddress,
      billingAddress: user.billingAddress,
    });

    console.log(newOrder);
    const orderItems = cartItems.map((cartItem) => ({
      orderId: newOrder._id,
      productId: cartItem.productId,
      varientId: cartItem.varientId || null,
      qty: cartItem.qty,
      price: cartItem.price,
      tax: cartItem.tax,
      subTotal: cartItem.subTotal,
    }));

    console.log(orderItems);

    await OrderItem.insertMany(orderItems);

    await Cart.findOneAndDelete({ _id: userCart._id });
    await CartItem.deleteMany({ _id: userCart._id });

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
