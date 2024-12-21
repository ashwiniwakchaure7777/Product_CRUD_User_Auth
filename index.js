import express from "express";
import dbConnection from "./config/dbConnection.js";
import productRoute from "./route/productRoute.js";
import userRoute from "./route/userRouter.js";
import cartRoute from "./route/cartRoute.js";
import categoryRoute from "./route/categoryRoute.js";
import subcategoryRoute from "./route/subcategoryRoute.js";
import brandRoute from "./route/brandRoute.js";
import orderRoute from "./route/orderRoute.js";
import messageRoute from "./route/messageRoute.js";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import cloudinaryConnect from "./config/cloudinary.js";
import fileupload from "express-fileupload";
import { Server } from "socket.io";
import http from "http";

const app = express();
dotenv.config({ path: "./config/.env" });

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware (Uncomment if needed)
// app.use(
//   fileupload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/", // Temporary directory for uploaded files
//     createParentPath: true, // Ensures the temp directory exists
//   })
// );

app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/category", categoryRoute);
app.use("/api/subcategory", subcategoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/order", orderRoute);
app.use("/api/message", messageRoute);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("sendMessage", async (data) => {
    io.emit("receiveMessage", data);

    const newMessage = new Message({
      sender: data.senderId,
      content: data.message,
    });
    await newMessage.save();
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(process.env.PORT || 3000, async () => {
  try {
    await dbConnection();
    await cloudinaryConnect();
    console.log("Server is running on port 3000...");
  } catch (err) {
    console.error("Error starting server:", err);
  }
});
