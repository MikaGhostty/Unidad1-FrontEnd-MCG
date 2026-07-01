import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Páginas públicas
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";

// Dashboards
import UserDashboard from "../pages/user/UserDashboard";
import CoachDashboard from "../pages/coach/CoachDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

// Layouts
import UserLayout from "../layouts/UserLayout";
import CoachLayout from "../layouts/CoachLayout";
import AdminLayout from "../layouts/AdminLayout";

// Rutas protegidas
import ProtectedRoute from "../routes/ProtectedRoute";
import RoleRoute from "../routes/RoleRoute";

// Página de gestión de usuarios para admin
import UserPage from "../pages/admin/UserPage"; // nombre correcto

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Rutas protegidas por rol */}
        <Route
          path="/user"
          element={
            <RoleRoute allowedRoles={["user"]}>
              <UserLayout />
            </RoleRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        <Route
          path="/coach"
          element={
            <RoleRoute allowedRoles={["coach"]}>
              <CoachLayout />
            </RoleRoute>
          }
        >
          <Route path="dashboard" element={<CoachDashboard />} />
        </Route>

        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </RoleRoute>
          }
        >
          {/* Redirección por defecto */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Dashboard con sub‑rutas */}
          <Route path="dashboard/*" element={<AdminDashboard />} />

          {/* Gestión de usuarios */}
          <Route path="users" element={<UserPage />} />
        </Route>

        {/* Ruta protegida genérica */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <h1>Perfil del usuario autenticado</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
