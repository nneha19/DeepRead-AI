import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    text:String,
    analysis:Object,
    createdAt:{
        type:Date,
        default: Date.now,
    }
})

export default mongoose.model("Message", messageSchema);