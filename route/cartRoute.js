import express from "express";
import { authentication } from "../middlewares/authentication.js";
import { authorization } from "../middlewares/authorization.js";
import { viewCart,addToCart,updateCartQty,deleteProductFromCart,emptyCart } from "../controller/cartController.js";

const router = express.Router();

router.use(authentication);
router.get("/viewcart",viewCart);
router.post("/addToCart",addToCart);

router.patch("/updateCart",authorization("user"),updateCartQty);
router.post("/deleteItem/:productId",authorization("user"), deleteProductFromCart);
router.delete("/emptyCart",authorization("user"),emptyCart);

export default router;