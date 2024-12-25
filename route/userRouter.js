import express from "express";
import { signup, login } from "../controller/userController.js";
import passport from "passport";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);




export default router;
