import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const PrivateLayout = () => {
  const { user } = useAuth();
  return user ? (
    <div className="flex">
      <Navbar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateLayout;