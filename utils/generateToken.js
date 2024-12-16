import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  try{
      const token = jwt.sign(user, process.env.JWT_SECRETKEY);

      const cookieName = user.role;

      res.status(200).cookie(cookieName,token);
  }catch(err){
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

