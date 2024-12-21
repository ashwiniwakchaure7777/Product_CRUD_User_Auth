import { Message } from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    // Fetch messages from MongoDB
    const messages = await Message.find().populate("sender", "name email"); // Optional: populate sender info
    res.status(200).json({
      success: true,
      messages: messages,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal error", error });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { senderId, message } = req.body;
    
    // Validate request
    if (!senderId || !message) {
      return res.status(400).json({ success: false, message: "Please provide senderId and message" });
    }

    // Save message to database
    const newMessage = new Message({
      sender: senderId,
      content: message,
    });

    await newMessage.save();

    // Emit message to other users through WebSocket
    req.io.emit("receiveMessage", {
      senderId: senderId,
      message: message,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      newMessage: newMessage,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal error", error });
  }
};
