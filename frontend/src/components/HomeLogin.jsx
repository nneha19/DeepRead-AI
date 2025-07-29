import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export default function HomeLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoginError(""); // Clear any previous error

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const token = await auth.currentUser.getIdToken();
      console.log("DEBUG_TOKEN:", token);
      window.debugToken = token;
      navigate("/user");
    } catch (error) {
      console.error("Login error:", error.message);

      // Firebase login errors
      switch (error.code) {
        case "auth/user-not-found":
          setLoginError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setLoginError("Incorrect password. Please try again.");
          break;
        case "auth/too-many-requests":
          setLoginError("Too many failed attempts. Please try again later.");
          break;
        default:
          setLoginError("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-white to-purple-50 px-6 sm:px-16 py-24 lg:py-12 gap-16 sm:gap-10 md:gap-8 lg:gap-28">
      {/* Side Content */}
      <div className="order-2 md:order-none flex md:flex-row items-start gap-4 max-w-sm w-full">
        <div className="w-4 bg-purple-500 rounded self-stretch mt-1 " />

        {/* Text */}
        <div className="flex flex-col space-y-4 text-gray-700">
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Understand what was meant — privately, safely, and judgment-free.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Welcome back to your insight space.
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full md:w-2/2 max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-purple-700 mb-10 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-600 text-sm">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-purple-400"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-600 text-sm">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-purple-400"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Forgot Password */}
          <p className="text-sm text-right text-gray-600 mt-4">
            <Link
              to="/forgot-password"
              className="text-purple-600  cursor-pointer hover:underline"
            >
              Forgot Password?
            </Link>
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 cursor-pointer text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          {loginError && (
            <p className="text-sm text-red-600 mt-2 text-center">
              {loginError}
            </p>
          )}
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600  hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
