import React from 'react'
import HomeSignup from '../components/HomeSignup'
import LandingNav from '../components/LandingPage/LandingNav'
import Footer from '../components/Footer'

function Signup() {
  return (
    <div className='font-poppins bg-gradient-to-br from-white to-purple-50'>
      <LandingNav />
      <HomeSignup />
       {/* Footer */}
    <Footer />
    </div>
  )
}

export default Signup