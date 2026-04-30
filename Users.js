const users = [
  { user: "user@sportclub.cl", password: "1234", role: "user", name: "Usuario Uno" },
  { user: "coach@sportclub.cl", password: "1234", role: "coach", name: "Coach Uno" },
  { user: "admin@sportclub.cl", password: "1234", role: "admin", name: "Admin Uno" },
];

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  const user = users.find(u => u.user === email && u.password === password);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "user") {
      window.location.href = "dashboard-user.html";
    } else if (user.role === "coach") {
      window.location.href = "dashboard-coach.html";
    } else if (user.role === "admin") {
      window.location.href = "dashboard-admin.html";
    }
  } else {
    errorMsg.textContent = "Credenciales incorrectas. Intenta nuevamente.";
  }
});
