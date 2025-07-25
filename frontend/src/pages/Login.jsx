
import HomeLogin from '../components/HomeLogin'
import LandingNav from '../components/LandingPage/LandingNav'

function Login() {
  return (
    <div className='bg-gradient-to-br from-white to-purple-50'>
      <LandingNav />
      <HomeLogin />
       {/* Footer */}
      <footer className="w-full px-14 sm:px-12 py-4 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto">
          © 2025 DeepRead AI. Developed by Neha Ghariyal.
        </div>
      </footer>
    </div>
  )
}

export default Login