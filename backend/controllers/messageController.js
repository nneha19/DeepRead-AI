import Message from "../models/Message.js";
import axios from "axios";

// GET all messages 
export const getAllMessages = async (req, res) => {
  try {
    const userId = req.user.uid; 
    const messages = await Message.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ messages }); 
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err.message });
  }
};



// GET single message by ID 
export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findOne({
      _id: req.params.id,
      userId: req.user.uid,
    });
    if (!message) return res.status(404).json({ message: "Not found" });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: "Error fetching message", error: err });
  }
};

// DELETE message by ID 
export const deleteMessage = async (req, res) => {
  try {
    const deleted = await Message.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.uid,
    });
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting message", error: err });
  }
};

// CREATE new message
export const createMessage = async (req, res) => {
  try {
    const { message, scenario } = req.body;
    const userId = req.user.uid;

    const aiRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content: `You're a communication expert analyzing this message in a ${scenario.toLowerCase()} context. Provide a thoughtful, natural-sounding analysis in paragraph form that:
            
            - Identifies the tone and emotional undercurrents
            - Interprets the intent behind the message
            - Evaluates the warnings, risks, red flags, potential misunderstandings or good intentions expressed
            - Suggests subtle improvements while keeping the original voice
            - Considers cultural/contextual factors when relevant
            
            Structure your response as:
            1. A brief overview of the message's effectiveness
            2. Key observations about tone and emotional impact
            3. Suggested refinements (if needed)
            
            Write conversationally, as if advising a friend. Avoid numbered lists and rigid formatting. Focus on delivering insights fluidly within the ${scenario} context.`
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiReply = aiRes.data?.choices?.[0]?.message?.content || "";

    const saved = await Message.create({
      message,
      scenario,
      aiResponse: aiReply,
      userId,
    });

    res.status(201).json(saved);
  } catch (err) {
    console.error("AI Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate response" });
  }
};

// Follow-up message with AI
export const updateFollowUp = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;
    
    // Get the message
    const message = await Message.findOne({ _id: id, userId });
    if (!message) return res.status(404).json({ error: "Message not found" });

    // Generate follow-up 
    const followupRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content: `Generate a natural, concise follow-up to this message: "${message.message}" in the context of "${message.scenario}". 

            Guidelines:
            1. Keep it conversational—no robotic or analysis-like language.
            2. Match the tone (friendly, professional, casual, etc.) based on the scenario.
            3. If the original message is vague (e.g., "hey"), suggest a specific next step.
            4. If it's a question, answer or expand on it.
            5. Avoid "Re:" or labels—just the raw reply.

            Example outputs:
            - For "Are you free?" → "Want to grab coffee later?"
            - For "Did you see the news?" → "Yeah, crazy stuff! What do you think?"
            - For "Hey" → "Hi! What's up? :)"
            `,
          },
          {
            role: "user",
            content: `Original message: ${message.message}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const followUp = followupRes.data?.choices?.[0]?.message?.content?.trim() || "";

    // Update the message
    const updated = await Message.findOneAndUpdate(
      { _id: id, userId },
      { followUp },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Follow-up error:", err.message);
    res.status(500).json({ error: "Could not update follow-up" });
  }
};