document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("perfilForm");
  const mensaje = document.getElementById("mensajePerfil");

  const nombre = document.getElementById("perfilNombre");
  const email = document.getElementById("perfilEmail");
  const direccion = document.getElementById("perfilDireccion");
  const pass = document.getElementById("perfilPass");
  const confirm = document.getElementById("perfilConfirm");

  const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;

    // Nombre
    if (nombre.value.trim() === "") { nombre.classList.add("is-invalid"); valido = false; }
    else nombre.classList.remove("is-invalid");

    // Email
    if (!email.checkValidity()) { email.classList.add("is-invalid"); valido = false; }
    else email.classList.remove("is-invalid");

    // Dirección
    if (direccion.value.trim().length < 5) { direccion.classList.add("is-invalid"); valido = false; }
    else direccion.classList.remove("is-invalid");

    // Contraseña (opcional)
    if (pass.value !== "") {
      if (!passRegex.test(pass.value)) { pass.classList.add("is-invalid"); valido = false; }
      else pass.classList.remove("is-invalid");

      if (confirm.value !== pass.value || confirm.value === "") {
        confirm.classList.add("is-invalid"); valido = false;
      } else confirm.classList.remove("is-invalid");
    }

    if (valido) {
      mensaje.className = "alert alert-success";
      mensaje.textContent = "✅ Perfil actualizado correctamente.";
      mensaje.classList.remove("d-none");
      setTimeout(() => mensaje.classList.add("d-none"), 2000);
    } else {
      mensaje.className = "alert alert-danger";
      mensaje.textContent = "❌ Corrige los errores antes de guardar.";
      mensaje.classList.remove("d-none");
    }
  });
});
