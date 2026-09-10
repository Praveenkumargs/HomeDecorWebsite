import React from "react";
import { Navigate } from "react-router-dom"

function ProtectedRoute({children}) {

    const token = localStorage.getItem("adminToken");

    if (!token) {
        return <Navigate to="/admin" replace />
    }

    return children;
    
}

export default ProtectedRoute;