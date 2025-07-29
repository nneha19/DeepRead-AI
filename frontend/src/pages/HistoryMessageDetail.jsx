import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { Loader2, Sparkles, Copy, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function HistoryMessageDetail() {
  const { id } = useParams();
  const [messageData, setMessageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followupLoading, setFollowupLoading] = useState(false);
  const [username, setUsername] = useState("You");
  const [copied, setCopied] = useState(false);

  const fetchMessage = async () => {
    try {
      const user = getAuth().currentUser;
      const token = await user.getIdToken();
      setUsername(user.displayName || "You");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/messages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessageData(res.data);
    } catch (err) {
      console.error("Error fetching message detail:", err);
    } finally {
      setLoading(false);
    }
  };

  const getFollowUp = async () => {
    setFollowupLoading(true);
    try {
      const user = getAuth().currentUser;
      const token = await user.getIdToken();
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/messages/followup/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessageData((prev) => ({ ...prev, followUp: res.data.followUp }));
    } catch (err) {
      console.error("Follow-up error:", err);
    } finally {
      setFollowupLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-6 h-6 text-purple-600" />
      </div>
    );
  }

  if (!messageData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Message not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-8 lg:px-32 bg-gradient-to-br from-white to-purple-50 text-gray-800">
      {/* Back button */}
      <Link
        to="/user/history"
        className="flex items-center gap-2 font-medium text-purple-600 mb-6 hover:text-purple-800 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </Link>

      {/* User Message */}
      <div className="bg-purple-50 border-l-4 border-purple-400 px-5 py-4 rounded-xl mb-6 shadow-sm">
        <p className="font-semibold text-purple-800 mb-2">{username}:</p>
        <p className="text-gray-700 whitespace-pre-wrap">
          {messageData.message}
        </p>
        <span className="mt-2 inline-block bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
          Scenario: {messageData.scenario}
        </span>
        <p className="text-xs text-gray-500 mt-6">
          {new Date(messageData.createdAt).toLocaleString()}
        </p>
      </div>

      {/* AI Response */}
      {messageData?.aiResponse && (
        <div className="bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl mb-6 shadow">
          <p className="font-semibold text-gray-800 mb-2">DeepRead AI:</p>
          <p className="text-gray-700 whitespace-pre-wrap">
            {messageData.aiResponse}
          </p>
        </div>
      )}

      {/* Follow-Up */}
      {messageData.followUp ? (
        <div className="bg-green-50 border border-green-200 px-5 py-4 rounded-xl shadow relative">
          <p className="font-semibold text-green-700 mb-2">
            Follow-Up Insight:
          </p>
          <p className="text-gray-700 whitespace-pre-wrap mb-4">
            {messageData.followUp}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(messageData.followUp);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-2 cursor-pointer bg-green-600 text-white px-4 py-2 rounded-full font-medium hover:bg-green-700 transition"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy Reply"}
            </button>

            <Link
              to="/user"
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full font-medium hover:bg-purple-700 transition"
            >
              <Sparkles className="w-4 h-4" />
              Analyze New Message
            </Link>
          </div>
        </div>
      ) : (
        <button
          onClick={getFollowUp}
          disabled={followupLoading}
          className="flex items-center gap-2 mt-4 px-5 py-2 cursor-pointer bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700 transition disabled:opacity-50"
        >
          {followupLoading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Generating follow-up...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Get Follow-Up Reply
            </>
          )}
        </button>
      )}
    </div>
  );
}
