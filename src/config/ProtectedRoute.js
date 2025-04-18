import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles, children }) => {
  //Fetching current User Object
  const user = useSelector((state) => state.auth.user);

  // user not logged in => navigate to login("/")
  if (!user) return <Navigate to="/" replace />;
  const role = user?.role?.toLowerCase();

  // authorization
  return allowedRoles.includes(role) ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default ProtectedRoute;
