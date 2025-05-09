import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/" replace />;

  const role = user?.role?.toLowerCase() ?? "";
  console.log(role, "role");
  console.log(allowedRoles, "allowedRoles");
  if (!allowedRoles.includes(role)) {
    console.warn(`Access denied: role "${role}" not in`, allowedRoles);
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
