import { useState, useEffect } from "react";
import { Search, Eye, Trash2, Rabbit } from "lucide-react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { Link } from "react-router-dom";

export default function History() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.error("User not logged in");
          return;
        }

        const token = await user.getIdToken();
        const res = await axios.get("/api/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const msgs = res.data?.messages;
        if (Array.isArray(msgs)) {
          setMessages(msgs.reverse());
        } else {
          console.error("Expected messages to be an array, got:", msgs);
        }
      } catch (err) {
        console.error("Failed to fetch messages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not logged in");
        return;
      }

      const token = await user.getIdToken();

      await axios.delete(`/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Error deleting message", err);
    }
  };

  const filteredMessages = messages.filter((msg) =>
    msg.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh] text-gray-400 text-sm">
          Loading...
        </div>
      ) : messages.length === 0 ? (
        <div className="flex-grow flex items-center justify-center px-6 sm:px-8">
          <div className="text-center flex items-center flex-col justify-center text-gray-500 py-10 min-h-[60vh]">
            <Rabbit className="w-12 h-12 mb-2" />
            <p className="text-md font-semibold mt-1">
              Start analyzing <br />
              to see your message history here.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Message History
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            View, revisit, or delete your previously analyzed messages.
          </p>

          <div className="flex items-center gap-2 mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <p className="text-gray-500 mt-24 text-center">
                No messages found.
              </p>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="bg-white shadow-sm border text-ellipsis border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:shadow-md transition"
                >
                  <div>
                    <p className="text-sm text-gray-800 font-medium line-clamp-1">
                      {msg.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(msg.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      to={`/user/history/${msg._id}`}
                      className="flex items-center gap-1 cursor-pointer text-sm px-3 py-1.5 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50"
                    >
                      <Eye className="w-4 h-4" /> View
                    </Link>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="flex items-center gap-1 cursor-pointer text-sm px-3 py-1.5 border border-red-500 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
