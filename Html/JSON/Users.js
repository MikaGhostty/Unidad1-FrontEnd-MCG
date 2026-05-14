

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");


    const response= await fetch('http://localhost:3000/api/auth/login', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }); 

    const data = await response.json();

    console.log(data)


  if (data.ok) {
    localStorage.setItem("user", JSON.stringify(data.data.user));

    if (data.data.user.role === "user") {
      window.location.href = "dashboard-user.html";
    } else if (data.data.user.role === "coach") {
      window.location.href = "dashboard-coach.html";
    } else if (data.data.user.role === "admin") {
      window.location.href = "dashboard-admin.html";
    }
  } else {
    errorMsg.textContent = "Credenciales incorrectas. Intenta nuevamente.";
  }
});
