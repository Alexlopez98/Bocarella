document.addEventListener("DOMContentLoaded", () => {
  // Regex
  const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // --- LOGIN ---
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

  // --- REGISTRO ---
  const form = document.getElementById("registroForm");
  const mensajeForm = document.getElementById("mensajeForm");
  const nombre = document.getElementById("regNombre");
  const usuario = document.getElementById("regUsuario");
  const email = document.getElementById("regEmail");
  const pass = document.getElementById("regPass");
  const confirm = document.getElementById("regConfirm");
  const fecha = document.getElementById("regFecha");

  function validarNombre() {
    nombre.classList.remove("is-valid", "is-invalid");
    if (nombre.value.trim() === "") nombre.classList.add("is-invalid");
    else nombre.classList.add("is-valid");
  }

  function validarUsuario() {
    usuario.classList.remove("is-valid", "is-invalid");
    if (usuario.value.trim().length < 3) usuario.classList.add("is-invalid");
    else usuario.classList.add("is-valid");
  }

  function validarEmail() {
    email.classList.remove("is-valid", "is-invalid");
    if (!emailRegex.test(email.value.trim())) email.classList.add("is-invalid");
    else email.classList.add("is-valid");
  }

  function validarPass() {
    pass.classList.remove("is-valid", "is-invalid");
    if (!passRegex.test(pass.value)) pass.classList.add("is-invalid");
    else pass.classList.add("is-valid");
    validarConfirm();
  }

  function validarConfirm() {
    confirm.classList.remove("is-valid", "is-invalid");
    if (confirm.value === "" || confirm.value !== pass.value) confirm.classList.add("is-invalid");
    else confirm.classList.add("is-valid");
  }

  function validarFecha() {
    fecha.classList.remove("is-valid", "is-invalid");
    const hoy = new Date();
    const nacimiento = new Date(fecha.value);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    if (isNaN(nacimiento.getTime()) || edad < 13) fecha.classList.add("is-invalid");
    else fecha.classList.add("is-valid");
  }

  // Eventos en vivo
  nombre.addEventListener("input", validarNombre);
  usuario.addEventListener("input", validarUsuario);
  email.addEventListener("input", validarEmail);
  pass.addEventListener("input", validarPass);
  confirm.addEventListener("input", validarConfirm);
  fecha.addEventListener("change", validarFecha);

  // Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validarNombre();
    validarUsuario();
    validarEmail();
    validarPass();
    validarConfirm();
    validarFecha();

    const invalido = form.querySelector(".is-invalid");
    if (!invalido) {
      mensajeForm.className = "alert alert-success";
      mensajeForm.textContent = "✅ Registro exitoso.";
      mensajeForm.classList.remove("d-none");

      setTimeout(() => {
        form.reset();
        form.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
      }, 1500);
    } else {
      mensajeForm.className = "alert alert-danger";
      mensajeForm.textContent = "❌ Corrige los errores antes de enviar.";
      mensajeForm.classList.remove("d-none");
    }
  });

  // --- RECUPERAR ---
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
