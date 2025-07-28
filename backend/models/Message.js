import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  scenario: {
    type: String,
    required: true,
  },
  aiResponse: {
    type: String,
    default: "",
  },
  followUp: { 
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", messageSchema);
