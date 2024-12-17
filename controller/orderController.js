import { Order } from "../models/order.model.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) {
            return res.status(404).json({ success: false, message: "orders not available" });
        }

        res.status(200).json({ success: true, message: "Here is the orders", orders });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal issue" })
    }
}
export const getOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        if (!orderId) {
            return res.status(400).json({ success: false, message: "Please provide order details" });
        }
        const order = await Order.findOne({ _id: orderId });

        if (!order) {
            return res.status(400).json({ success: false, message: "Order not available in db" });
        }

        res.status(200).json({ success: true, message: "Order details", order });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal issue" })
    }
}
export const placeOrder = async (req, res) => {
    try {
        const user = req.user;

        const userCart = await Cart.findOne({ userId: user.id });

        if(!userCart){
            return res.status(400).json({ success: false, message: "Cart not available" });
        }

        


    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal issue" })
    }
}
export const updateCart = async (req, res) => {
    try {

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal issue" })
    }
}
export const deleteCart = async (req, res) => {
    try {

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal issue" })
    }
}