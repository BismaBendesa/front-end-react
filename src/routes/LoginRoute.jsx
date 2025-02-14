import { Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthProvider);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;