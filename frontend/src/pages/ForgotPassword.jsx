import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import LandingNav from "../components/LandingPage/LandingNav";
import Footer from "../components/Footer";

export default function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async ({ email }) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("\Password reset email sent. Please check your inbox/spam.");
      reset();
    } catch (error) {
      setErrorMessage("❌ " + error.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 ">
        <LandingNav/>
    <div className="min-h-screen flex items-center justify-center font-poppins px-6 sm:px-16 ">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-8 text-purple-700 text-center">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white py-2 rounded-md cursor-pointer hover:bg-purple-700 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        {successMessage && (
          <p className="text-green-600 text-sm mt-6 text-center font-medium">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="text-red-600 text-sm mt-6 text-center font-medium">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
}
