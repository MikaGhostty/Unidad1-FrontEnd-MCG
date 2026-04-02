function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === "admin" && pass === "1234") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("toggleBtn").style.display = "block";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}