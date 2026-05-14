document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const fecha = document.getElementById("fecha").value;

  const errorBox = document.getElementById("errorBox");
  errorBox.innerHTML = "";

  // Validaciones
  if (password !== confirmPassword) {
    mostrarError("Las contraseñas no coinciden");
    return;
  }

  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!regexPassword.test(password)) {
    mostrarError("La contraseña debe tener al menos 8 caracteres, incluir letras y números");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: nombre,
        email: email,
        password: password,
        roles: "user",
        must_change_password: false,
        birth_date: fecha || null
      })
    });

    const data = await response.json();
    console.log("Respuesta del backend:", data);

    if (response.ok) {
      // Registro exitoso → redirigir al login
      window.location.href = "login1.html";
    } else {
      mostrarError(data.message || "Error en el registro. Verifica los datos.");
    }
  } catch (error) {
    mostrarError("Error de conexión con el servidor");
  }

  function mostrarError(msg) {
    const p = document.createElement("p");
    p.style.color = "red";
    p.textContent = msg;
    errorBox.appendChild(p);
  }
});
