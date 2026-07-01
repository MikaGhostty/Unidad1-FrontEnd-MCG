import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../../services/adminService";
import "../../assets/Body/BodyDashAdmin.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await getUsers();
    setUsers(Array.isArray(data) ? data : []);
  };

  const handleDelete = async id => {
    await deleteUser(id);
    cargarUsuarios();
  };

  const paginatedUsers = users.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <section className="card usuarios">
      <h1>Gestión de Usuarios</h1>
      <button className="btn btn-success">Nuevo Usuario</button>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>
                  <button className="btn btn-primary">Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(u.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>Página {page + 1} de {Math.ceil(users.length / pageSize)}</span>
        <button disabled={(page + 1) * pageSize >= users.length} onClick={() => setPage(page + 1)}>Siguiente</button>
      </div>
    </section>
  );
}
