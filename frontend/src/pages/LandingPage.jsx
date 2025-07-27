import React from "react";
import { NavLink } from "react-router-dom";
import LandingNav from "../components/LandingPage/LandingNav";
import LandingTestimonial from "../components/LandingPage/LandingTestimonial";
import LandingFeaturesSection from "../components/LandingPage/LandingFeatureSection";
import FeatureImg from "../assets/main.svg";
import FeatureSmImg from "../assets/smmain.svg";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="font-poppins bg-gradient-to-br from-white to-purple-50">
      {/* Navbar */}
      <LandingNav />

      {/* Hero Section */}
      <section className="relative text-center px-6 pt-26 py-16  overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Insightful communication starts here.
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto mb-6 text-base sm:text-lg">
            Reflect on your conversations, uncover patterns, and gain insights
            with precision — all while keeping your data secure.
          </p>
          <NavLink
            to="/signup"
            className="inline-flex items-center px-6 py-3 bg-purple-700 text-white font-semibold rounded-full hover:bg-purple-800 transition"
          >
            Get Started →
          </NavLink>

          {/*Illustration */}
          <div className="mt-12">
            {/* Desktop View Image */}
            <div className="w-full mx-auto rounded-lg overflow-hidden hidden md:flex justify-center">
              <img
                src={FeatureImg}
                alt="App Screenshot"
                className="
        w-auto
        max-w-[640px]        // base for md (768px+)
        lg:max-w-[720px]     // 1024px+
        xl:max-w-[860px]     // 1280px+
        2xl:max-w-[920px]    // 1536px+
        object-contain
      "
              />
            </div>

            {/* Mobile View Image */}
            <div className="w-full mx-auto rounded-lg overflow-hidden md:hidden flex justify-center">
              <img
                src={FeatureSmImg}
                alt="App Screenshot"
                className="
        w-auto
        max-w-[260px]        // default
        sm:max-w-[360px]     // 640px+
        [@media(min-width:547px)]:max-w-[300px]
        [@media(min-width:700px)]:max-w-[320px]
        object-contain
      "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <LandingFeaturesSection />

      {/* Testimonials */}
      <LandingTestimonial />

      {/* Footer */}
    <Footer />
    </div>
  );
}

export default LandingPage;
