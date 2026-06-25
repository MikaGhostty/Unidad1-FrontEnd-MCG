import { useEffect, useState } from "react"
import { Badge, Button, Card, Spinner, Table } from "react-bootstrap"
import Swal from "sweetalert2"
import UserFormModal from "../../components/users/UserFormModal"
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../services/UserService"

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Cargar usuarios desde API
  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await getUsers()
      setUsers(data.data) // asegúrate que tu backend devuelve { data: [...] }
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  // Abrir modal para crear
  const openCreateModal = () => {
    setSelectedUser(null)
    setShowModal(true)
  }

  // Abrir modal para editar
  const openEditModal = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  // Cerrar modal
  const closeModal = () => {
    setShowModal(false)
    setSelectedUser(null)
  }

  // Guardar usuario (crear o actualizar)
  const handleSave = async (userData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, userData)
        Swal.fire("Éxito", "Usuario actualizado correctamente", "success")
      } else {
        await createUser(userData)
        Swal.fire("Éxito", "Usuario creado correctamente", "success")
      }
      loadUsers()
      closeModal()
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    }
  }

  // Eliminar usuario
  const handleDelete = async (user) => {
    try {
      await deleteUser(user.id)
      Swal.fire("Éxito", "Usuario eliminado correctamente", "success")
      loadUsers()
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    }
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Gestión de Usuarios</h4>
        <Button variant="primary" onClick={openCreateModal}>
          Nuevo Usuario
        </Button>
      </Card.Header>

      <Card.Body>
        {loading ? (
          <div className="text-center p-4">
            <Spinner animation="border" />
            <p className="mt-2">Cargando usuarios...</p>
          </div>
        ) : (
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
              {users.map((user) => (
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
        )}
      </Card.Body>

      <UserFormModal
        show={showModal}
        handleClose={closeModal}
        handleSave={handleSave}
        selectedUser={selectedUser}
      />
    </Card>
  )
}

export default UsersPage
