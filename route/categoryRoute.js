import express from "express";
import { authorization } from "../middlewares/authorization.js";
import { createCategory ,editCategory,getAllCategory,deleteCategory} from "../controller/categoryController.js";

const router = express.Router();


router.post("/createcategory",authorization("superadmin","admin"),createCategory);
router.post("/editcategory",authorization("superadmin","admin"),editCategory);
router.get("/getAllCategory",authorization("superadmin","admin","user"),getAllCategory);
router.delete("/deleteCategory",authorization("superadmin"),deleteCategory);

export default router;