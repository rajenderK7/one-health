import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/userContext";

export interface AuthRouteProps {
  requiredRole: number;
}

const AuthRoute = ({ requiredRole }: AuthRouteProps) => {
  const { role } = useContext(UserContext);

  return role === requiredRole ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AuthRoute;
