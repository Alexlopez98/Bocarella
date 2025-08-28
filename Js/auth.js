document.addEventListener("DOMContentLoaded", () => {
  // Regex de contraseña segura
  const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/;

  // Login
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail");
    const pass = document.getElementById("loginPass");

    let valido = true;
    if (!email.checkValidity()) { email.classList.add("is-invalid"); valido = false; } 
    else email.classList.remove("is-invalid");

    if (pass.value.trim() === "") { pass.classList.add("is-invalid"); valido = false; }
    else pass.classList.remove("is-invalid");

    if (valido) alert("✅ Login exitoso (simulación)");
  });

  // Registro
  document.getElementById("registroForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("regNombre");
    const email = document.getElementById("regEmail");
    const pass = document.getElementById("regPass");
    const confirm = document.getElementById("regConfirm");

    let valido = true;
    if (nombre.value.trim() === "") { nombre.classList.add("is-invalid"); valido = false; } 
    else nombre.classList.remove("is-invalid");

    if (!email.checkValidity()) { email.classList.add("is-invalid"); valido = false; } 
    else email.classList.remove("is-invalid");

    if (!passRegex.test(pass.value)) { pass.classList.add("is-invalid"); valido = false; } 
    else pass.classList.remove("is-invalid");

    if (confirm.value !== pass.value || confirm.value === "") { confirm.classList.add("is-invalid"); valido = false; } 
    else confirm.classList.remove("is-invalid");

    if (valido) alert("✅ Registro exitoso (simulación)");
  });

  // Recuperar
  document.getElementById("recuperarForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("recEmail");
    if (!email.checkValidity()) {
      email.classList.add("is-invalid");
    } else {
      email.classList.remove("is-invalid");
      alert("📧 Se envió un correo de recuperación (simulación)");
    }
  });
});
