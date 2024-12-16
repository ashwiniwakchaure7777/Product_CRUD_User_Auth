import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
     // Attach decoded user information to the request
    req.user = decoded;
    next();

    // Middleware should not send a response unless there’s an error. Instead, it should pass control to the next middleware using next().

  } catch (error) {
    console.error("Authentication error:", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please log in again."
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token. Please log in again."
    });
  }
};

export { authentication };
