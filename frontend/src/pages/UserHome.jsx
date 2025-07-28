import { useState } from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
  const [message, setMessage] = useState("");
  const [selectedScenario, setSelectedScenario] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const scenarios = [
    "Professional",
    "Friends",
    "Relationship",
    "Family",
    "Stranger",
  ];

  const handleSubmit = async () => {
    if (!message.trim()) {
      setValidationError("Please enter a message");
      return;
    }
    if (!selectedScenario) {
      setValidationError("Please select a scenario");
      return;
    }

    setLoading(true);
    setValidationError(""); // Clear previous errors
    try {
      const user = getAuth().currentUser;
      const token = await user.getIdToken();

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/messages`,
        {
          message,
          scenario: selectedScenario,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const savedId = res.data._id;
      setMessage("");
      setSelectedScenario("");

      // Navigate to the detailed message view
      navigate(`/user/message/${savedId}`);
    } catch (err) {
      console.error("Error saving message:", err);
      setValidationError("Failed to analyze message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-purple-50 flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
        What's on your mind?
      </h1>
      <p className="mt-2 text-gray-600 text-center max-w-xl">
        Paste your message and select the context — we'll decode the tone and
        emotion for you.
      </p>

      {/* Input */}
      <div className="mt-8 w-full max-w-2xl relative">
        <textarea
          rows={6}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (e.target.value.trim()) setValidationError(""); 
          }}
          placeholder="Paste your conversation or message..."
          className="w-full px-5 py-4 pr-12 rounded-2xl border border-gray-200 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="absolute bottom-5 right-4 p-2 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition"
        >
          {loading ? (
            <Loader2 size={18} className="text-gray-700 animate-spin" />
          ) : (
            <ArrowUp size={18} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Scenario Buttons */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {scenarios.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setSelectedScenario(tag);
              setValidationError(""); 
            }}
            className={`px-4 py-2 cursor-pointer rounded-full font-medium text-sm transition-all border-2
              ${
                selectedScenario === tag
                  ? "bg-purple-600 text-white border-purple-700 shadow-md scale-105 ring-2 ring-purple-300"
                  : "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200"
              }
            `}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Validation Error Message */}
      {validationError && (
        <div className="mt-10 text-red-500 text-sm animate-fade-in">
          {validationError}
        </div>
      )}
    </div>
  );
}
