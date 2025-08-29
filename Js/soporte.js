document.addEventListener("DOMContentLoaded", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const form = document.getElementById("soporteForm");
  const mensajeSoporte = document.getElementById("mensajeSoporte");
  const nombre = document.getElementById("supNombre");
  const email = document.getElementById("supEmail");
  const telefono = document.getElementById("supTelefono");
  const mensaje = document.getElementById("supMensaje");

  // ========= Validaciones =========
  function validarNombre() {
    nombre.classList.remove("is-valid", "is-invalid");
    if (nombre.value.trim() === "") nombre.classList.add("is-invalid");
    else nombre.classList.add("is-valid");
  }
  function validarEmail() {
    email.classList.remove("is-valid", "is-invalid");
    if (!emailRegex.test(email.value.trim())) email.classList.add("is-invalid");
    else email.classList.add("is-valid");
  }
  function validarMensaje() {
    mensaje.classList.remove("is-valid", "is-invalid");
    if (mensaje.value.trim() === "") mensaje.classList.add("is-invalid");
    else mensaje.classList.add("is-valid");
  }

  // Eventos en vivo
  nombre.addEventListener("input", validarNombre);
  email.addEventListener("input", validarEmail);
  mensaje.addEventListener("input", validarMensaje);

  // ========= Submit =========
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    validarNombre();
    validarEmail();
    validarMensaje();

    const invalido = form.querySelector(".is-invalid");
    if (!invalido) {
      const data = {
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        telefono: telefono.value.trim(),
        mensaje: mensaje.value.trim(),
        fecha: new Date().toLocaleString()
      };

      // Guardar en localStorage
      let solicitudes = JSON.parse(localStorage.getItem("solicitudesSoporte")) || [];
      solicitudes.push(data);
      localStorage.setItem("solicitudesSoporte", JSON.stringify(solicitudes));

      // Mostrar éxito
      mensajeSoporte.className = "alert alert-success";
      mensajeSoporte.textContent = "✅ Tu solicitud fue enviada. Te contactaremos pronto.";
      mensajeSoporte.classList.remove("d-none");

      // Reset
      form.reset();
      form.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
    } else {
      mensajeSoporte.className = "alert alert-danger";
      mensajeSoporte.textContent = "❌ Corrige los errores antes de enviar.";
      mensajeSoporte.classList.remove("d-none");
    }
  });
});
