import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivateLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? (
    <div className="font-poppins bg-gradient-to-br from-white to-purple-50">
      <Navbar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateLayout;