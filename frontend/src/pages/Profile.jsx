import { auth } from "../firebase";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LogOut, KeyRound } from "lucide-react";
import { useState, useEffect } from "react";

import Avatar1 from "../assets/avatars/avatar1.svg";
import Avatar2 from "../assets/avatars/avatar2.svg";
import Avatar3 from "../assets/avatars/avatar3.svg";
import Avatar4 from "../assets/avatars/avatar4.svg";
import Avatar5 from "../assets/avatars/avatar5.svg";

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5];

export default function Profile() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) {
      setAvatar(storedAvatar);
    } else {
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
      setAvatar(randomAvatar);
      localStorage.setItem("userAvatar", randomAvatar);
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userAvatar"); // clear avatar on logout
    navigate("/login");
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, user.email);
      setMsg("Password reset email sent!");
    } catch (err) {
      setMsg("Error sending reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 space-y-6 text-center">
        {avatar && (
          <img
            src={avatar}
            alt="User Avatar"
            className="mx-auto h-24 w-24 sm:h-28 sm:w-28 rounded-full shadow-md mb-2"
          />
        )}

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Welcome,
          <br />
          {user?.displayName || "User"}!
        </h2>

        <p className="text-sm mt-4 text-gray-500">{user?.email}</p>

        {msg && (
          <p className="text-center text-purple-600 text-sm font-medium">
            {msg}
          </p>
        )}

        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl cursor-pointer bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            <KeyRound className="w-4 h-4" />
            {loading ? "Sending..." : "Change Password"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border cursor-pointer border-purple-600 text-purple-600 hover:bg-purple-50 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
