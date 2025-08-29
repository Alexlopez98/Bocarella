document.addEventListener("DOMContentLoaded", () => {
  // Regex
  const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // =====================
  // Helpers de localStorage
  // =====================
  function getUsers() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  }
  function saveUsers(users) {
    localStorage.setItem("usuarios", JSON.stringify(users));
  }
  function getActiveUser() {
    return JSON.parse(localStorage.getItem("activeUser")) || null;
  }
  function setActiveUser(user) {
    localStorage.setItem("activeUser", JSON.stringify(user));
  }
  function logoutUser() {
    localStorage.removeItem("activeUser");
    alert("👋 Sesión cerrada.");
    window.location.href = "../index.html"; 
  }

  // =====================
  // --- LOGIN ---
  // =====================
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail");
    const pass = document.getElementById("loginPass");

    let valido = true;
    if (!emailRegex.test(email.value.trim())) { 
      email.classList.add("is-invalid"); 
      valido = false; 
    } else email.classList.remove("is-invalid");

    if (pass.value.trim() === "") { 
      pass.classList.add("is-invalid"); 
      valido = false; 
    } else pass.classList.remove("is-invalid");

    if (valido) {
      const users = getUsers();
      const user = users.find(u => u.email === email.value.trim() && u.pass === pass.value);

      if (user) {
        setActiveUser(user);
        alert(`✅ Bienvenido ${user.usuario || user.nombre}`);
        window.location.href = "categorias-promociones/promociones.html"; 
      } else {
        alert("❌ Usuario o contraseña incorrectos.");
      }
    }
  });

  // =====================
  // --- REGISTRO ---
  // =====================
  const form = document.getElementById("registroForm");
  const mensajeForm = document.getElementById("mensajeForm");
  const nombre = document.getElementById("regNombre");
  const usuario = document.getElementById("regUsuario");
  const email = document.getElementById("regEmail");
  const pass = document.getElementById("regPass");
  const confirm = document.getElementById("regConfirm");
  const fecha = document.getElementById("regFecha");
  const direccion = document.getElementById("regDireccion");

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

  // Submit registro
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
      const users = getUsers();
      const existe = users.some(u => u.email === email.value.trim() || u.usuario === usuario.value.trim());
      
      if (existe) {
        mensajeForm.className = "alert alert-danger";
        mensajeForm.textContent = "❌ El usuario o email ya están registrados.";
        mensajeForm.classList.remove("d-none");
        return;
      }

      const nuevoUsuario = {
        nombre: nombre.value.trim(),
        usuario: usuario.value.trim(),
        email: email.value.trim(),
        pass: pass.value,
        fecha: fecha.value,
        direccion: direccion.value.trim()
      };

      users.push(nuevoUsuario);
      saveUsers(users);

      mensajeForm.className = "alert alert-success";
      mensajeForm.textContent = "✅ Registro exitoso. Ya puedes iniciar sesión.";
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

  // =====================
  // --- RECUPERAR ---
  // =====================
  document.getElementById("recuperarForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const emailRec = document.getElementById("recEmail");
    if (!emailRegex.test(emailRec.value.trim())) {
      emailRec.classList.add("is-invalid");
    } else {
      emailRec.classList.remove("is-invalid");
      const users = getUsers();
      const user = users.find(u => u.email === emailRec.value.trim());
      if (user) {
        alert(`📧 Se envió un correo de recuperación a ${user.email} (simulación)`);
      } else {
        alert("❌ No hay ninguna cuenta con ese correo.");
      }
    }
  });

  // =====================
  // --- SESIÓN ACTIVA ---
  // =====================
  const activeUser = getActiveUser();
  if (activeUser) {
    const header = document.getElementById("header");
    if (header) {
      const div = document.createElement("div");
      div.className = "p-3 bg-secondary text-light d-flex justify-content-between align-items-center";
      div.innerHTML = `
        <span>👤 Hola, <b>${activeUser.usuario || activeUser.nombre}</b></span>
        <button id="logoutBtn" class="btn btn-sm btn-danger">Cerrar sesión</button>
      `;
      header.prepend(div);

      document.getElementById("logoutBtn").addEventListener("click", logoutUser);
    }
  }
});
