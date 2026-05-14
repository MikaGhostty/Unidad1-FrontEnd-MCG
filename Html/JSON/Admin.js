// Mostrar bienvenida
const user = JSON.parse(localStorage.getItem("user"));
if (user && user.name) {
  document.getElementById("Bienvenido").textContent = `Bienvenido, ${user.name}`;
} else {
  document.getElementById("Bienvenido").textContent = "Bienvenido al sistema";
}

// Control de secciones
function mostrarSeccion(id) {
  document.querySelectorAll(".card").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";

  if (id === "usuarios") {
    cargarUsuarios();
  }
}

// Conexión al backend
const token = localStorage.getItem("token");

function cargarUsuarios() {
  fetch("http://localhost:3000/api/users", {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => renderUsers(data))
  .catch(err => console.error("Error cargando usuarios:", err));
}

function renderUsers(users) {
  const tbody = document.getElementById("usersTableBody");
  tbody.innerHTML = "";

  users.forEach(user => {
    const rol = user.role ? user.role : "user"; // si no existe, por defecto "user"
    const fecha = user.created_at
      ? new Date(user.created_at).toLocaleDateString("es-CL")
      : "-";

    tbody.innerHTML += `
      <tr>
        <td>${user.id}</td>
        <td>${user.full_name}</td>
        <td>${user.email}</td>
        <td><span class="badge ${getRoleClass(rol)}">${rol}</span></td>
        <td>${fecha}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarUsuario(${user.id})">✏️ Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${user.id})">🗑️ Eliminar</button>
        </td>
      </tr>`;
  });
}

function getRoleClass(role) {
  switch (role) {
    case "admin": return "bg-admin";
    case "coach": return "bg-info";
    case "user": return "bg-success";
    default: return "bg-secondary";
  }
}

// Botón Crear Usuario
document.addEventListener("DOMContentLoaded", () => {
  const nuevoBtn = document.querySelector(".btn.btn-success");
  if (nuevoBtn) {
    nuevoBtn.addEventListener("click", () => {
      document.getElementById("nuevoUsuarioForm").style.display = "block";
    });
  }

  const form = document.getElementById("nuevoUsuarioForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const full_name = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const role = document.getElementById("rol").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ full_name, email, role, password })
      })
      .then(res => res.json())
      .then(() => {
        alert("Usuario creado correctamente");
        cargarUsuarios();
        form.reset();
        form.style.display = "none";
      })
      .catch(err => console.error("Error creando usuario:", err));
    });
  }
});

// Eliminar usuario
function eliminarUsuario(id) {
  if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

  fetch(`http://localhost:3000/api/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(() => {
    alert("Usuario eliminado");
    cargarUsuarios();
  })
  .catch(err => console.error("Error eliminando usuario:", err));
}

// Editar usuario (placeholder)
function editarUsuario(id) {
  alert("Función de edición pendiente para usuario ID: " + id);
}
