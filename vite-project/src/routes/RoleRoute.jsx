import { Navigate } from "react-router-dom"
import { getUser, isAuthenticated } from "../services/authServices"

function RoleRoute({ children, allowedRoles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  const user = getUser()

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default RoleRoute
