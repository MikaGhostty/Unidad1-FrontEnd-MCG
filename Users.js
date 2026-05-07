

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

    const response= await fetch('http://localhost:3000/api/auth/login', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'user1@demo.cl',
        password: '12345678'
      })
    });

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
