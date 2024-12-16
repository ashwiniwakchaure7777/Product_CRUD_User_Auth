import express from "express";
import { createproduct, getDetails, editproduct, deleteproduct, allProducts } from "../controller/productController.js";
import {authentication} from "../middlewares/authentication.js";
import { authorization } from "../middlewares/authorization.js";


const router = express.Router();


router.get("/allProducts", allProducts);
router.get("/getdetails/:productId", getDetails);


router.post("/createproduct", authorization('admin','superadmin'), createproduct);
router.put("/editproduct/:productId",  authorization('admin', 'superadmin'), editproduct);
router.delete("/deleteproduct/:productId", authorization('superadmin'), deleteproduct);


export default router;