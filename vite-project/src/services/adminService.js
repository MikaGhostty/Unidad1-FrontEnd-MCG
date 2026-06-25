const API_URL = "http://localhost:3000/api/users";

function getToken() {
  return localStorage.getItem("token"); // si usas JWT
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`, // opcional si tu backend requiere token
  };
}

// === Obtener todos los usuarios ===
export async function getUsers() {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener usuarios");
  }

  return data; // debe ser un array
}

// === Crear usuario ===
export async function createUser(userData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al crear usuario");
  }

  return data;
}

// === Actualizar usuario ===
export async function updateUser(id, userData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar usuario");
  }

  return data;
}

// === Eliminar usuario ===
export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Error al eliminar usuario");
  }

  return true;
}
