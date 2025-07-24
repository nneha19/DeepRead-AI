import React from 'react'
import {NavLink} from 'react-router-dom';

function LandingPage() {
  return (
    <div className="font-poppins">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-purple-700">🔺 DeepRead AI</div>
        </div>
        <div className="space-x-4">
          <NavLink to="/login" className="text-sm text-purple-700 hover:underline">
            Log In
          </NavLink>
          <NavLink
            to="/signup"
            className="bg-purple-700 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-800"
          >
            Sign Up
          </NavLink>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center px-6 py-16 bg-white">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          All your ideas in one place
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Write, analyze and organize smarter with DeepRead AI. Minimal design,
          powerful results – streamline your thoughts into meaning.
        </p>
        <NavLink
          to="/signup"
          className="inline-flex items-center px-6 py-3 bg-purple-700 text-white font-semibold rounded-full hover:bg-purple-800 transition"
        >
          Get Started →
        </NavLink>
        <div className="mt-12">
          <div className="w-full max-w-4xl mx-auto rounded-lg border border-purple-300 overflow-hidden shadow-lg">
            <div className="h-72 bg-purple-100 flex items-center justify-center text-purple-400 text-xl font-bold">
              [Your App Screenshot / Illustration]
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful features</h2>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Speed up your writing process with these smart built-in tools.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-purple-700">📝 Clean Editor</h3>
            <p className="text-gray-600">
              Focused layout with distraction-free writing. Just you and your words.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-purple-700">🤖 Smart Analysis</h3>
            <p className="text-gray-600">
              Powerful AI to break down tone, emotion, and readability in seconds.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-purple-700">📦 History Tracking</h3>
            <p className="text-gray-600">
              Access all past insights for better decision making.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-purple-700">🎯 Mood Mapping</h3>
            <p className="text-gray-600">
              Understand the emotional tone of your messages with clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-purple-700 text-white px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">Make something awesome</h2>
        <p className="mb-10 max-w-2xl">
          Loved by indie creators and teams who want to express clearly and deeply.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-600 rounded-xl p-6">
            <p className="mb-4 italic">
              “DeepRead AI helped me decode old messages from a whole new lens.”
            </p>
            <div className="text-sm">— Jane Cooper, Writer</div>
          </div>
          <div className="bg-purple-600 rounded-xl p-6">
            <p className="mb-4 italic">
              “It’s my favorite tool for exploring tone in chats and emails.”
            </p>
            <div className="text-sm">— Ralph Edwards, Product Designer</div>
          </div>
          <div className="bg-purple-600 rounded-xl p-6">
            <p className="mb-4 italic">
              “Simple yet effective. I now understand how I come across better.”
            </p>
            <div className="text-sm">— Courtney Henry, Freelancer</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white text-center px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">Ready to dive in?</h2>
        <p className="text-gray-600 mb-6">Start exploring your conversations today.</p>
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        © 2025 DeepRead AI. Developed by Neha Ghariyal.
      </footer>
    </div>
  );
}


export default LandingPage