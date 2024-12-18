import express from "express";
import { authorization } from "../middlewares/authorization.js";
import { getAllOrders ,getOrder,placeOrder} from "../controller/orderController.js";

const router = express.Router();

router.get("/getAllOrders",authorization("admin","superadmin"),getAllOrders);
router.get("/getOrder/:orderId",authorization("admin","user","superadmin"),getOrder);

router.patch("/placeOrder",authorization("superadmin","user","admin"),placeOrder);

export default router;