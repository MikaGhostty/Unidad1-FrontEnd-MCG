import React, { useEffect, useState } from "react";
import "../../assets/Body/BodyDashCoach.css";
import '../../assets/Photos/SportClubLogo.png';
import '../../assets/Photos/perfil.png';

function CoachDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="coach-dashboard">
      <header className="header-coach">
        <img
          src="/Html/Photos/SportClubLogo.png"
          alt="Logo SportClub"
          className="logo"
        />
        <nav className="nav-coach">
          <a href="#">Inicio</a>
          <a href="#">Mis Alumnos</a>
          <a href="#">Mi Horario</a>
          <a href="#">Reportes</a>
          <button className="btn-edit">Editar Perfil</button>
          <a href="/Html/login1.html" className="btn-logout">
            Cerrar Sesión
          </a>
        </nav>
      </header>

      <main className="main-coach">
        <h1 id="Bienvenido">
          {user ? `Bienvenido, ${user.name}` : "Dashboard Coach"}
        </h1>
        <p>Mis clases, alumnos inscritos y horarios.</p>

        <div className="dashboard-grid">
          {/* Mis alumnos */}
          <section className="card alumnos">
            <h2>Mis Alumnos</h2>
            <ul>
              <li>
                Elton Tito <button>Ver Progreso</button>
              </li>
              <li>
                Josepi Torrio <button>Ver Progreso</button>
              </li>
              <li>
                Leonor Gasmo <button>Ver Progreso</button>
              </li>
            </ul>
          </section>

          {/* Mi Horario */}
          <section className="card horario">
            <h2>Mi Horario</h2>
            <table>
              <thead>
                <tr>
                  <th>Lunes</th>
                  <th>Martes</th>
                  <th>Miércoles</th>
                  <th>Jueves</th>
                  <th>Viernes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Spinning 18:00</td>
                  <td>CrossFit 11:00</td>
                  <td>Boxeo 17:00</td>
                  <td>Funcional 19:00</td>
                  <td>HIIT 10:00</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Reportes */}
          <section className="card reportes">
            <h2>Reportes</h2>
            <p>Total alumnos: 15</p>
            <p>Clases asignadas: 8</p>
            <button>Ver Detalle</button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default CoachDashboard;
