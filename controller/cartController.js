import { Cart } from "../models/cartSchema.js";

export const viewCart = async (req, res) => {
    try {
        // Access decoded user from req.user (populated by authentication middleware)
        const user = req.user;

        console.log("View Cart", user);
        const cartData = await Cart.findOne({ userId: user.id });
        if (!cartData) {
            return res.status(400).json({ success: false, message: "cart data not available" })
        }
        return res.status(200).json({ success: true, cartData, message: "cart successfully fetched" });

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const addToCart = async (req, res) => {
    try {
        const user = req.user;
        const { productId, cartQuantity } = req.body;

        if (!productId || !cartQuantity) {
            return res.status(400).json({ message: "Please add the product in cart" })
        }

        let cart = await Cart.findOne({ userId: user.id });

        if (!cart) {
            cart = new Cart({
                userId: user.id,
                products: [{ productId, cartQuantity }]

            })
        } else {
            const productIndex = cart.products.findIndex(
                (item) => item.productId.toString() === productId.toString()
            );

            if (productIndex == -1) {
                cart.products.push({ productId, cartQuantity });
            } else {
                cart.products[productIndex].cartQuantity += cartQuantity;
            }
        }

        // Save the updated cart
        await cart.save();
        const populatedCartData = await Cart.findById(cart._id)
            .populate({
                path: 'products.productId', // The reference field in the products array
                select: 'productName price img' // Fields to populate from the Product model
            });
        return res.status(200).json({ success: true, populatedCartData, message: "cart created successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const updateCartQty = async (req, res) => {
    try {
        const user = req.user;

        const { cartQuantity, productId } = req.body;

        if (!productId || !cartQuantity) {
            return res.status(400).json({ message: "Please add the product in cart" })
        }
        let cart = await Cart.findOne({ userId: user.id });

        if (!cart) {
            return res.status(400).json({ success: false, message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex((item)=>item.productId.toString() === productId.toString());

        cart.products[productIndex].cartQuantity = cartQuantity;

        await cart.save();

        const populatedCart = await Cart.findById(cart._id).populate({ path: "products.productId", select: "productName price img" })

        res.status(200).json({ success: true, populatedCart, message: "cart qty updated successfully" })

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const deleteProductFromCart = async (req, res) => {
    try {
        const user = req.user;
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ success: false, message: "ProductId required" })
        }

        const updatedCart = await Cart.findOneAndUpdate({ userId: user.id }, { $pull: { products: { productId: productId } } }, { new: true });
        console.log(updatedCart);
        if (updatedCart.products.length === 0) {

            return res.status(400).json({ success: false, message: "product removed" })
        }

        res.status(200).json({ success: true, updatedCart, message: "Cart product removed successfully" });

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}


export const emptyCart = async (req, res) => {
    try {
        const user = req.user;

        const cart = await Cart.findOneAndDelete({ userId: user.id });

        if (!cart) {
            console.log("Cart deleted successfully")
        }

        res.status(200).json({ success: true, message: "Cart deleted successfully" });

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}