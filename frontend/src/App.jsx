
import './App.css'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PrivateLayout from './pages/PrivateLayout'
import UserHome from './pages/UserHome'
import History from './pages/History'
import MessageDetail from './pages/MessageDetail'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
  <Routes>
  {/* Public Routes */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/signup" element={<Signup />} />

  {/* Protected Routes (after login) */}
  <Route path="/user" element={<PrivateLayout />}>
  <Route index element={<UserHome />} />
  <Route path="profile" element={<Profile />} />
  <Route path="history" element={<History />} />
  <Route path="message/:id" element={<MessageDetail />} />
</Route>
</Routes>

  )
}

export default App
