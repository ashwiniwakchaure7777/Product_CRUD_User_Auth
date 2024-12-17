import express from "express";
import { authorization } from "../middlewares/authorization.js";
import { getAllBrands,getBrandDetails,createBrand ,updateBrand,deleteBrand} from "../controller/brandController.js";

const router = express.Router();

router.get("/getAllBrands",getAllBrands);
router.get("/getBrand/:brandId", getBrandDetails);


router.post("/createBrand",authorization("superadmin","admin"),createBrand);
router.put("/updateBrand/:brandId",authorization("superadmin","admin"),updateBrand);
router.delete("/deleteBrand/:brandId",authorization("superadmin"),deleteBrand);

export default router;
