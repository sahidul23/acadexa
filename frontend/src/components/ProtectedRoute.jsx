import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // User not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // User doesn't have permission
  if (!allowedRoles.includes(user.role)) {
    if (user.role === "ADMIN") {
      return <Navigate to="/dashboard" replace />;
    }

    if (user.role === "STUDENT") {
      return <Navigate to="/student-dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;