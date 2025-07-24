
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PrivateLayout from './pages/PrivateLayout'
import UserHome from './pages/UserHome'
import History from './pages/History'
import AnalyzeMessage from './pages/AnalyzeMessage'
import MessageDetail from './pages/MessageDetail'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
  <Routes>
  {/* Public Routes */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* Protected Routes (after login) */}
  <Route path="/user" element={<PrivateLayout />}>
   <Route index element={<UserHome />} />
    <Route path="/user/analyze" element={<AnalyzeMessage />} />
    <Route path="/user/history" element={<History />} />
    <Route path="/user/message/:id" element={<MessageDetail />} />
  </Route>
</Routes>

  )
}

export default App
