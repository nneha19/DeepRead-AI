import React from 'react'
import HomeSignup from '../components/HomeSignup'
import LandingNav from '../components/LandingPage/LandingNav'

function Signup() {
  return (
    <div className='bg-gradient-to-br from-white to-purple-50'>
      <LandingNav />
      <HomeSignup />
       {/* Footer */}
      <footer className="w-full px-14 sm:px-12 py-4 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto">
          © 2025 DeepRead AI. Developed by Neha Ghariyal.
        </div>
      </footer>
    </div>
  )
}

export default Signup