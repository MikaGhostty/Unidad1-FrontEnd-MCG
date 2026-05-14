let idUsuarioAEditar = null;

// ===== Inicialización =====
document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();

    const btnDesplegar = document.getElementById('btnDespliegue');
    const seccionForm = document.getElementById('seccionNuevoUsuario');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnGuardar = document.getElementById('btnGuardar');
    const form = document.getElementById('registroAdmin');
    const inputBusqueda = document.querySelector('.buscador');
    const selectRol = document.querySelector('.filtro_seleccion');

    // Mostrar formulario nuevo usuario
    btnDesplegar.addEventListener('click', () => {
        idUsuarioAEditar = null;
        form.reset();
        btnGuardar.textContent = "Guardar Usuario";
        btnGuardar.style.backgroundColor = "var(--morado)";
        btnGuardar.style.color = "white";
        seccionForm.classList.remove('hidden');
        seccionForm.scrollIntoView({ behavior: 'smooth' });
    });

    // Cancelar creación/edición
    btnCancelar.addEventListener('click', () => {
        seccionForm.classList.add('hidden');
        idUsuarioAEditar = null;
        form.reset();
        btnGuardar.textContent = "Guardar Usuario";
        btnGuardar.style.backgroundColor = "var(--morado)";
        btnGuardar.style.color = "white";
        limpiarErrores();
    });

    // Filtros
    inputBusqueda.addEventListener('input', aplicarFiltros);
    selectRol.addEventListener('change', aplicarFiltros);

    // Guardar usuario
    btnGuardar.addEventListener('click', guardarUsuario);
});

// ===== Mostrar usuarios =====
async function cargarUsuarios() {
    const token = localStorage.getItem('token');
    const cuerpo = document.getElementById('cuerpoTabla');
    try {
        const resp = await fetch('http://localhost:3000/api/users', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await resp.json();
        if (resp.ok) {
            cuerpo.innerHTML = "";
            result.data.forEach(u => {
                const fechaOriginal = u.createdAt || u.created_at;
                const fechaFormateada = fechaOriginal
                    ? new Date(fechaOriginal).toLocaleDateString('es-ES')
                    : 'Sin fecha';
                cuerpo.innerHTML += `
                    <tr>
                        <td>${u.id}</td>
                        <td>${u.full_name}</td>
                        <td>${u.email}</td>
                        <td>${rolBadge(u.role)}</td>
                        <td>${fechaFormateada}</td>
                        <td>
                            <button class="btn-warning" onclick="prepararEdicion(${u.id})"><i class="bi bi-pencil"></i> Editar</button>
                            <button class="btn-red" onclick="eliminarUsuario(${u.id})"><i class="bi bi-trash"></i> Eliminar</button>
                        </td>
                    </tr>`;
            });
        }
    } catch (err) {
        console.error("Error al cargar usuarios:", err);
    }
}

// ===== Eliminar usuario =====
async function eliminarUsuario(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;
    const token = localStorage.getItem('token');
    try {
        const resp = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resp.ok) {
            cargarUsuarios();
        } else {
            alert("No se pudo eliminar el usuario.");
        }
    } catch (err) {
        console.error("Error al eliminar:", err);
    }
}

// ===== Guardar usuario (crear/editar) =====
async function guardarUsuario() {
    const name = document.getElementById('reg_nombre');
    const email = document.getElementById('reg_email');
    const role = document.getElementById('reg_rol').value;
    const pass = document.getElementById('reg_contraseña');
    const confirmPass = document.getElementById('reg_contraseña_buena');

    limpiarErrores();
    let isValid = true;

    if (name.value.trim() === "") {
        document.getElementById('err-name').textContent = "El nombre es obligatorio";
        name.classList.add('invalid');
        isValid = false;
    }
    if (!idUsuarioAEditar || pass.value.length > 0) {
        if (pass.value.length < 8) {
            document.getElementById('error_contraseña').textContent = "Mínimo 8 caracteres";
            pass.classList.add('invalid');
            isValid = false;
        }
        if (pass.value !== confirmPass.value) {
            document.getElementById('error_contraseña_buena').textContent = "Las contraseñas no coinciden";
            confirmPass.classList.add('invalid');
            isValid = false;
        }
    }
    if (!isValid) return;

    const token = localStorage.getItem('token');
    const url = idUsuarioAEditar
        ? `http://localhost:3000/api/users/${idUsuarioAEditar}`
        : 'http://localhost:3000/api/users';
    const metodo = idUsuarioAEditar ? 'PUT' : 'POST';

    try {
        const resp = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                full_name: name.value,
                email: email.value,
                password: pass.value,
                role: role
            })
        });
        if (resp.ok) {
            alert(idUsuarioAEditar ? "¡Usuario actualizado con éxito!" : "¡Usuario creado con éxito!");
            idUsuarioAEditar = null;
            document.getElementById('registroAdmin').reset();
            document.getElementById('seccionNuevoUsuario').classList.add('hidden');
            cargarUsuarios();
        } else {
            const data = await resp.json();
            document.getElementById('error_email').textContent = data.message || "Error en la operación";
        }
    } catch (err) {
        console.error("Error en la conexión:", err);
    }
}

// ===== Preparar edición =====
async function prepararEdicion(id) {
    const token = localStorage.getItem('token');
    try {
        const resp = await fetch(`http://localhost:3000/api/users/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await resp.json();
        if (resp.ok) {
            const u = result.data;
            document.getElementById('reg_nombre').value = u.full_name;
            document.getElementById('reg_email').value = u.email;
            document.getElementById('reg_rol').value = u.role;
            idUsuarioAEditar = id;
            const seccionForm = document.getElementById('seccionNuevoUsuario');
            seccionForm.classList.remove('hidden');
            seccionForm.scrollIntoView({ behavior: 'smooth' });
            const btnGuardar = document.getElementById('btnGuardar');
            btnGuardar.textContent = "Actualizar Datos";
            btnGuardar.className = "btn-warning";
        }
    } catch (err) {
        console.error("Error al obtener datos:", err);
    }
}

// ===== Filtros =====
function aplicarFiltros() {
    const textoBusqueda = document.querySelector('.buscador').value.toLowerCase();
    const rolFiltro = document.querySelector('.filtro_seleccion').value.toLowerCase();
    const filas = document.querySelectorAll('#cuerpoTabla tr');
    filas.forEach(fila => {
        const nombre = fila.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const rol = fila.querySelector('td:nth-child(4)').textContent.toLowerCase();
        const coincideNombre = nombre.includes(textoBusqueda);
        const coincideRol = (rolFiltro === "filtrar por rol" || rolFiltro === "" || rol === rolFiltro);
        fila.style.display = (coincideNombre && coincideRol) ? "" : "none";
    });
}

// ===== Utilidades =====
function limpiarErrores() {
    document.querySelectorAll('.msg_error').forEach(span => span.textContent = "");
    document.querySelectorAll('input').forEach(input => input.classList.remove('invalid'));
}

function rolBadge(role) {
    if (role === "user") return '<span class="badge bg-success">User</span>';
    if (role === "coach") return '<span class="badge bg-primary">Coach</span>';
    if (role === "admin") return '<span class="badge bg-danger">Admin</span>';
    return role;
}
