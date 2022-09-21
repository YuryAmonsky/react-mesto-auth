import React from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({loggedIn, children }) => {
  return loggedIn ? children : <Redirect to="/react-mesto-auth/sign-in" />
};

export default ProtectedRoute;  