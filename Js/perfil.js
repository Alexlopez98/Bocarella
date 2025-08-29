document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("perfilForm");
  const mensaje = document.getElementById("mensajePerfil");

  const campos = {
    nombre: document.getElementById("perfilNombre"),
    email: document.getElementById("perfilEmail"),
    direccion: document.getElementById("perfilDireccion"),
    pass: document.getElementById("perfilPass"),
    confirm: document.getElementById("perfilConfirm")
  };

  const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/;

  const strengthBar = document.querySelector("#passwordStrength");
  const strengthFill = strengthBar.querySelector(".progress-bar");

  // Cargar datos del usuario activo
  let activeUser = JSON.parse(localStorage.getItem("activeUser"));
  if (!activeUser) window.location.href = "index.html";
  campos.nombre.value = activeUser.usuario || "";
  campos.email.value = activeUser.email || "";
  campos.direccion.value = activeUser.direccion || "";

  Object.values(campos).forEach(campo => {
    campo.addEventListener("input", () => campo.classList.remove("is-invalid"));
  });

  // Barra fortaleza
  campos.pass.addEventListener("input", () => {
    const val = campos.pass.value;
    strengthBar.classList.toggle("d-none", val === "");

    let strength = 0;
    if (val.length >= 6) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/\d/.test(val)) strength++;
    if (/[@$!%*?&]/.test(val)) strength++;

    const colors = ["danger", "warning", "info", "success"];
    strengthFill.style.width = `${(strength / 4) * 100}%`;
    strengthFill.className = `progress-bar bg-${colors[strength - 1] || "danger"}`;
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    let valido = true;

    if (!campos.nombre.value.trim()) { campos.nombre.classList.add("is-invalid"); valido = false; }
    if (!campos.email.checkValidity()) { campos.email.classList.add("is-invalid"); valido = false; }
    if (campos.direccion.value.trim().length < 5) { campos.direccion.classList.add("is-invalid"); valido = false; }

    if (campos.pass.value !== "") {
      if (!passRegex.test(campos.pass.value)) { campos.pass.classList.add("is-invalid"); valido = false; }
      if (campos.confirm.value !== campos.pass.value || campos.confirm.value === "") { campos.confirm.classList.add("is-invalid"); valido = false; }
    }

    if (valido) {
      activeUser.usuario = campos.nombre.value;
      activeUser.email = campos.email.value;
      activeUser.direccion = campos.direccion.value;
      if (campos.pass.value) activeUser.password = campos.pass.value;

      localStorage.setItem("activeUser", JSON.stringify(activeUser));

      mensaje.className = "alert alert-success";
      mensaje.textContent = "✅ Perfil actualizado correctamente.";
      mensaje.classList.remove("d-none");

      setTimeout(() => mensaje.classList.add("d-none"), 2500);
      campos.pass.value = "";
      campos.confirm.value = "";
      strengthBar.classList.add("d-none");
      // actualizar header
      if (window.userHeaderUpdate) window.userHeaderUpdate();
    } else {
      mensaje.className = "alert alert-danger";
      mensaje.textContent = "❌ Corrige los errores antes de guardar.";
      mensaje.classList.remove("d-none");
    }
  });
});
