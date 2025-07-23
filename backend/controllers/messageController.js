export const getAllMessages = async(req,res)=>{
try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err });
  }
};

export const getMessageById = async(req,res)=>{
try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Not found" });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: "Error fetching message", error: err });
  }
};

export const deleteMessage = async(req,res)=>{
try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting message", error: err });
  }
};

export const createMessage = async(req,res)=>{
    try {
    const { text, analysis } = req.body;
    const newMessage = new Message({ text, analysis });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Error saving message", error: err });
  }
}