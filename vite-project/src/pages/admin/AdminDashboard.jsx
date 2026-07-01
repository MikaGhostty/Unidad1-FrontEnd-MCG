import React from "react";
import "../../assets/Body/BodyDashAdmin.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      

      <aside className="sidebar">
        <h2 className="sidebar-logo">SportClub</h2>
        <nav>
          <a href="/admin/dashboard" className="nav-link active">Dashboard</a>
          <a href="/admin/users" className="nav-link">Usuarios</a>
          <a href="/admin/calendar" className="nav-link">Calendario</a>
          <a href="/admin/reports" className="nav-link">Reportes</a>
          <a href="/admin/settings" className="nav-link">Configuración</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="topbar">
          <h1>Panel de Control</h1>
          <div className="profile">
            <span>Matías Contreras</span>
            <img src="/assets/Photos/react.svg" alt="profile" />
          </div>
        </header>

        {/* Stats cards */}
        <section className="stats-grid">
          <div className="stat-card">
            <h3>Total Views</h3>
            <p>3.456K <span className="up">↑ 0.43%</span></p>
          </div>
          <div className="stat-card">
            <h3>Total Profit</h3>
            <p>$45.2K <span className="up">↑ 4.35%</span></p>
          </div>
          <div className="stat-card">
            <h3>Total Products</h3>
            <p>2.450 <span className="up">↑ 2.59%</span></p>
          </div>
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>3.456 <span className="down">↓ 0.95%</span></p>
          </div>
        </section>

        {/* Charts placeholders */}
        <section className="charts">
          <div className="chart-card">[Gráfico de Revenue vs Sales]</div>
          <div className="chart-card">[Gráfico de Profit semanal]</div>
        </section>
      </main>
    </div>
  );
}
