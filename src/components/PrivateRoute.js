import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    // Check if there is a token stored in localStorage
    const token = localStorage.getItem('token');

    // If token exists, render the Outlet (child routes)
    // Otherwise, redirect to the login page
    return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
