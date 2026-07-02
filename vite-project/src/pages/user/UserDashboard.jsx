import React, { useEffect, useState } from "react";
import "../../assets/Body/BodyDashUser.css";
import '../../assets/Photos/SportClubLogo.png';
import '../../assets/Photos/perfil.png';

function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="user-dashboard">
      <header className="header-user">
        <img
          src='../assets/Photos/SportClubLogo.png'
          alt="Logo SportClub"
          className="logo"
        />
        <nav className="nav-user">
          <a href="#">Inicio</a>
          <a href="#">Clases</a>
          <a href="#">Reservas</a>
          <a href="#">Mi Progreso</a>
          <button className="btn-edit">Editar Perfil</button>
          <a href="/Html/login1.html" className="btn-logout">
            Cerrar Sesión
          </a>
        </nav>
      </header>

      <main className="main-user">
        <h1 id="Bienvenido">
          {user ? `Bienvenido, ${user.name}` : "Dashboard Usuario"}
        </h1>
        <p>Mis reservas, clases disponibles y perfil.</p>

        <div className="dashboard-grid">
          {/* Perfil */}
          <section className="card perfil">
            <h2>Mi Perfil</h2>
            <img src="/Html/Photos/perfil.png" alt="Foto perfil" />
            <p>
              <strong>Nombre:</strong>{" "}
              <span id="perfilNombre">Josepi torrio</span>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <span id="perfilEmail">Josepitoelmascapito@sportclub.com</span>
            </p>
            <p>
              <strong>Objetivos Personales:</strong> Calistenia - Box - Taekwondo
            </p>
          </section>

          {/* Progreso */}
          <section className="card progreso">
            <h2>Mi Progreso</h2>
            <p>Avance: 24% del programa</p>
            <div className="barra-progreso">
              <div className="relleno"></div>
            </div>
            <div className="ejercicios">
              <h3>Ejercicios realizados</h3>
              <ul>
                <li>Curl de bíceps con barra – 12 reps – 50kg</li>
                <li>Curl alterno con mancuernas – 12 reps – 30kg cada brazo</li>
                <li>Curl concentrado – 10 reps – 15kg</li>
              </ul>
            </div>
          </section>

          {/* Clases */}
          <section className="card clases">
            <h2>Clases Disponibles</h2>
            <ul>
              <li>
                Box – Viernes 09:00 <button>Reservar</button>
              </li>
              <li>
                Taekwondo – Martes 10:00 <button>Reservar</button>
              </li>
              <li>
                Zumba – Jueves 18:00 <button>Reservar</button>
              </li>
            </ul>
          </section>
        </div>

        {/* Calendario */}
        <section className="calendario">
          <h2>Calendario de Clases</h2>
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
                <td>Taekwondo 10:00</td>
                <td>CrossFit 10:00</td>
                <td>Zumba 18:00</td>
                <td>Box 09:00</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default UserDashboard;
