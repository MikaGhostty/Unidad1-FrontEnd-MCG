import { useEffect, useState } from "react";
import { Badge, Button, Card, Spinner, Table, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import UserFormModal from "../../components/users/UserFormModal";
import { createUser, deleteUser, getUsers, updateUser } from "../../services/UserService";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Paginación
  const [page, setPage] = useState(0);
  const pageSize = 8;

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data.data || []);
      setError(null);
    } catch (err) {
      setError("Error cargando usuarios: " + err.message);
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openCreateModal = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSave = async (userData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, userData);
        setMessage("Usuario actualizado correctamente");
        Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
      } else {
        await createUser(userData);
        setMessage("Usuario creado correctamente");
        Swal.fire("Éxito", "Usuario creado correctamente", "success");
      }
      loadUsers();
      closeModal();
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleDelete = async (user) => {
    try {
      await deleteUser(user.id);
      setMessage("Usuario eliminado correctamente");
      Swal.fire("Éxito", "Usuario eliminado correctamente", "success");
      loadUsers();
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
    }
  };

  const paginatedUsers = users.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <Card className="shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Gestión de Usuarios</h4>
        <Button variant="primary" onClick={openCreateModal}>
          Nuevo Usuario
        </Button>
      </Card.Header>

      <Card.Body>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center p-4">
            <Spinner animation="border" />
            <p className="mt-2">Cargando usuarios...</p>
          </div>
        ) : (
          <>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Badge
                        bg={
                          user.role === "admin"
                            ? "danger"
                            : user.role === "user"
                            ? "success"
                            : "primary"
                        }
                      >
                        {user.role === "admin"
                          ? "Administrador"
                          : user.role === "user"
                          ? "Usuario"
                          : "Entrenador"}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => openEditModal(user)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(user)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Paginación */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Button
                variant="secondary"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                Anterior
              </Button>
              <span>
                Página {page + 1} de {Math.ceil(users.length / pageSize)}
              </span>
              <Button
                variant="secondary"
                disabled={(page + 1) * pageSize >= users.length}
                onClick={() => setPage(page + 1)}
              >
                Siguiente
              </Button>
            </div>
          </>
        )}
      </Card.Body>

      <UserFormModal
        show={showModal}
        handleClose={closeModal}
        handleSave={handleSave}
        selectedUser={selectedUser}
      />
    </Card>
  );
}

export default UsersPage;
