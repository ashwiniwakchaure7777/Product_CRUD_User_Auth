import express from "express";
import { authorization } from "../middlewares/authorization.js";
import { getAllSubcategory,getAllSubcategoryById ,createSubcategory,updateSubcategory,deleteSubcategory} from "../controller/subcategoryController.js";

const router = express.Router();


router.get("/getAllSubcategory",authorization("superadmin","admin","user"),getAllSubcategory);
router.get("/getSubcategory/:subcategoryId",authorization("superadmin","admin","user"),getAllSubcategoryById);


router.post("/createSubcategory",authorization("superadmin","admin"),createSubcategory);
router.put("/updateSubcategory/:subcategoryId",authorization("superadmin","admin"),updateSubcategory);
router.delete("/deleteSubcategory/:subcategoryId",authorization("superadmin"),deleteSubcategory);

export default router;