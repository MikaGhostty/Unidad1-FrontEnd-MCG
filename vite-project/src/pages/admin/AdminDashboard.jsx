import React, { useState, useEffect } from "react";
import logo from "../../assets/Photos/SportClubLogo.png";
import { getUsers, createUser, updateUser, deleteUser } from "../../services/adminService";
import "../../assets/Body/BodyDashAdmin.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    rol: "user",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setUsers([]);
    }
  };

  const abrirModalNuevo = () => {
    setIsEditing(false);
    setFormData({
      nombre: "",
      email: "",
      rol: "user",
      password: "",
      confirmPassword: ""
    });
    setShowModal(true);
  };

  const abrirModalEditar = (user) => {
    setIsEditing(true);
    setCurrentId(user.id);
    setFormData({
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      password: "",
      confirmPassword: ""
    });
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.email) {
      alert("El email es obligatorio");
      return;
    }
    if (formData.password && formData.password.length < 8) {
      alert("Contraseña mínima 8 caracteres");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (isEditing) {
      await updateUser(currentId, formData);
    } else {
      await createUser(formData);
    }
    cerrarModal();
    cargarUsuarios();
  };

  const handleDelete = async id => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      await deleteUser(id);
      cargarUsuarios();
    }
  };

  const formatDate = isoString => {
    const date = new Date(isoString);
    return date.toLocaleDateString("es-CL");
  };

  const roleBadge = rol => {
    switch (rol) {
      case "admin":
        return <span className="badge bg-danger">admin</span>;
      case "coach":
        return <span className="badge bg-primary">coach</span>;
      default:
        return <span className="badge bg-success">user</span>;
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="header-admin">
        <img src={logo} alt="Logo SportClub" className="logo" />
        <nav className="nav-admin">
          <a href="#" className="active">Usuarios</a>
          <a href="#">Dashboard</a>
          <a href="#">Deportes</a>
          <a href="#">Equipos</a>
          <a href="#">Entrenamientos</a>
          <a href="#">Reportes</a>
          <a href="#">Perfil</a>
          <a href="login1.html" className="btn-logout">Cerrar Sesión</a>
        </nav>
      </header>

      <main className="main-admin">
        <h1>Gestión de Usuarios</h1>
        <p>Administra los usuarios del sistema</p>

        <section className="card usuarios">
          <button className="btn btn-success" onClick={abrirModalNuevo}>
            <i className="bi bi-person-plus"></i> Nuevo Usuario
          </button>

          {/* Tabla envuelta en contenedor con scroll */}
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre completo</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Fecha de registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
                    <td>{roleBadge(u.rol)}</td>
                    <td>{formatDate(u.fechaRegistro)}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => abrirModalEditar(u)}>
                        <i className="bi bi-pencil"></i> Editar
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(u.id)}>
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? "Editar Usuario" : "Nuevo Usuario"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                required
                value={formData.nombre}
                onChange={handleChange}
                autoComplete="name"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              <select
                name="rol"
                required
                value={formData.rol}
                onChange={handleChange}
                autoComplete="role"
              >
                <option value="user">Usuario</option>
                <option value="coach">Coach</option>
                <option value="admin">Admin</option>
              </select>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "Actualizar" : "Guardar"}
                </button>
                <button type="button" className="btn btn-danger" onClick={cerrarModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
