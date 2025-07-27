
import Footer from '../components/Footer'
import HomeLogin from '../components/HomeLogin'
import LandingNav from '../components/LandingPage/LandingNav'

function Login() {
  return (
    <div className='font-poppins bg-gradient-to-br from-white to-purple-50'>
      <LandingNav />
      <HomeLogin />
       {/* Footer */}
     <Footer />
    </div>
  )
}

export default Login