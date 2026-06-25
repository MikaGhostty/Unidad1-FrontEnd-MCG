import '../assets/Body/BodyRegister.css';
import { useState } from "react";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!nombre) {
      setError("El nombre es obligatorio");
      return;
    }
    if (!email) {
      setError("El email es obligatorio");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas deben coincidir");
      return;
    }

    // Aquí podrías conectar con tu backend o servicio de registro
    alert("Usuario registrado correctamente");
  };

  return (
    <>
      <div className="register-card">
        <h1>Registro para Nuevo Usuario</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          <label htmlFor="confirmPassword">Repetir Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <label htmlFor="fecha">Fecha de Nacimiento (opcional)</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <button type="submit">Registrarse</button>
        </form>
        {error && <div id="errorBox" className="error">{error}</div>}
      </div>

      <nav className="login-link">
        <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
      </nav>

      <footer>
        <p>© 2026 Club Deportivo</p>
      </footer>
    </>
  );
}

export default Register;
