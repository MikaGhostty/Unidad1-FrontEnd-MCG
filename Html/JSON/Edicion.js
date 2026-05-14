// Simulación: obtener usuario desde localStorage o backend
const token = localStorage.getItem("token");

function cargarPerfil() {
fetch("http://localhost:3000/api/profile", {
    headers: { Authorization: `Bearer ${token}` }
})
.then(res => res.json())
.then(user => {
    // Mostrar datos en la card
    document.getElementById("perfilNombre").textContent = capitalizar(user.full_name);
    document.getElementById("perfilEmail").textContent = user.email.toLowerCase();
    document.getElementById("perfilRol").innerHTML = `<span class="badge ${getRoleClass(user.role)}">${user.role}</span>`;
    document.getElementById("perfilFecha").textContent = user.birth_date
    ? new Date(user.birth_date).toLocaleDateString("es-CL")
    : "-";

    // Prellenar formulario de edición
    document.getElementById("editNombre").value = user.full_name;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editFecha").value = user.birth_date ? user.birth_date.split("T")[0] : "";
    document.getElementById("editMeta").value = user.meta || "";
})
.catch(err => console.error("Error cargando perfil:", err));
}

function capitalizar(texto) {
return texto ? texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase() : "";
}

function getRoleClass(role) {
switch (role) {
    case "admin": return "bg-danger";
    case "coach": return "bg-primary";
    case "user": return "bg-success";
    default: return "bg-secondary";
}
}

// Botón Editar Perfil
document.getElementById("btnEditar").addEventListener("click", () => {
document.querySelector(".perfil").style.display = "none";
document.getElementById("formEditar").classList.remove("oculto");
});

// Botón Cancelar
document.getElementById("btnCancelar").addEventListener("click", () => {
document.getElementById("formEditar").classList.add("oculto");
document.querySelector(".perfil").style.display = "block";
});

// Guardar cambios de perfil
document.getElementById("editForm").addEventListener("submit", e => {
e.preventDefault();

const full_name = document.getElementById("editNombre").value;
const email = document.getElementById("editEmail").value;
const birth_date = document.getElementById("editFecha").value;
const meta = document.getElementById("editMeta").value;

if (!full_name) {
    marcarError("editNombre", "El nombre es obligatorio");
    return;
}
if (!email.includes("@")) {
    marcarError("editEmail", "Email inválido");
    return;
}

fetch("http://localhost:3000/api/profile", {
    method: "PUT",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ full_name, email, birth_date, meta })
})
.then(res => res.json())
.then(() => {
    alert("Perfil actualizado correctamente");
    cargarPerfil();
    document.getElementById("formEditar").classList.add("oculto");
    document.querySelector(".perfil").style.display = "block";
})
.catch(err => console.error("Error actualizando perfil:", err));
});

function marcarError(id, mensaje) {
const input = document.getElementById(id);
input.classList.add("error");
input.nextElementSibling.textContent = mensaje;
input.nextElementSibling.style.color = "red";
}

// Cambio de contraseña
document.getElementById("passwordForm").addEventListener("submit", e => {
e.preventDefault();

const actualPass = document.getElementById("actualPass").value;
const newPass = document.getElementById("newPass").value;
const confirmPass = document.getElementById("confirmPass").value;

if (newPass.length < 8) {
    marcarError("newPass", "Debe tener al menos 8 caracteres");
    return;
}
if (newPass !== confirmPass) {
    marcarError("confirmPass", "Las contraseñas deben coincidir");
    return;
}

fetch("http://localhost:3000/api/profile/password", {
    method: "PUT",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ actualPass, newPass })
})
.then(res => res.json())
.then(() => {
    alert("Contraseña actualizada correctamente");
    document.getElementById("passwordForm").reset();
})
.catch(err => console.error("Error cambiando contraseña:", err));
});

// Inicializar
document.addEventListener("DOMContentLoaded", cargarPerfil);
