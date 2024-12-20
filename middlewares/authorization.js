import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authorization = (...role) => {
  return async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ success: false, message: "token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    // console.log(decoded);
    req.user = await User.findById(decoded.id);
    // console.log(req.user);

    if (!req?.user || !req?.user?.role) {
      return res.status(401).json({  //not authorised
        success: false,
        message: "Unauthorized, Kindly use correct credentials"
      });
    }
    if (!role.includes(req.user.role)) {
      return res.status(403).json({     //forbidden authorisation
        success: false,
        message: "You are not authorized to perform this action"
      });
    }
    next();
  };
};

export { authorization };
