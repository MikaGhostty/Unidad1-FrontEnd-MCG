import { Link, Outlet, useNavigate } from "react-router-dom"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { logout, getUser } from "../services/authServices"

function AdminLayout() {
  const navigate = useNavigate()
  const user = getUser()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-logo">SportClub Admin</h2>
        <nav>
          <a href="/admin/dashboard" className="nav-link">Dashboard</a>
          <a href="/admin/users" className="nav-link">Usuarios</a>
          <a href="/admin/calendar" className="nav-link">Calendario</a>
          <a href="/admin/reports" className="nav-link">Reportes</a>
          <a href="/admin/settings" className="nav-link">Configuración</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="profile">
            <span>{user?.name || "Mi perfil"}</span>
          </div>
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </header>

        {/* Aquí se renderizan las páginas hijas */}
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
