import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }:any) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
