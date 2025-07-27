import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomeSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

 const [signupError, setSignupError] = useState(""); 
 const navigate = useNavigate();

const onSubmit = async (data) => {
    setSignupError(""); // Clear previous error before submitting
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      console.log("User created:", userCredential.user);
      navigate("/login");

    } catch (error) {
      console.error("Signup error:", error.message);
      
      // Firebase-specific error handling
      if (error.code === "auth/email-already-in-use") {
        setSignupError("An account with this email already exists.");
      } else {
        setSignupError("Something went wrong. Please try again.");
      }
    }
  };

  return (
<div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-white to-purple-50 px-6 sm:px-16 py-24 lg:py-12 gap-16 sm:gap-10 md:gap-10 lg:gap-28">

  {/* Text */}
  <div className="order-2 md:order-none flex md:flex-row items-start gap-4 max-w-sm w-full">
  
   <div className="w-4 bg-purple-500 rounded self-stretch mt-1 " />

    {/* Text */}
    <div className="flex flex-col space-y-4 text-gray-700">
      <p className="text-base sm:text-lg md:text-xl leading-relaxed">
        Some messages confuse, some linger. We help you decode them —
        clearly, privately, and without judgment.
      </p>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed">
        Let your inbox make more sense.
      </p>
    </div>
  </div>

  {/* Signup Form */}
  <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
    <h2 className="text-3xl font-bold text-purple-700 mb-10 text-center">
      Create Your Account
    </h2>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block mb-1 text-gray-600 text-sm">Full Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="Enter your name"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.name ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-purple-400"
          }`}
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>

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
            errors.email ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-purple-400"
          }`}
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block mb-1 text-gray-600 text-sm">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Create a password"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.password ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-purple-400"
          }`}
        />
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Sign Up"}
      </button>

      {signupError && (
  <p className="text-sm text-red-600 mt-2 text-center">{signupError}</p>
)}
    </form>

    <p className="text-sm text-center text-gray-600 mt-4">
      Already have an account?{" "}
      <Link to="/login" className="text-purple-600  hover:underline">
        Log in
      </Link>
    </p>
  </div>
</div>

  );
}
