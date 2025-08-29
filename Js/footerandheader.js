document.addEventListener("DOMContentLoaded", () => {
  async function loadHTML(id, file) {
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Error cargando ${file}`);
      const content = await response.text();
      document.getElementById(id).innerHTML = content;

      if (id === "header") updateHeader();
    } catch (error) {
      console.error(error);
    }
  }

  function updateHeader() {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    const loginLink = document.querySelector(".ingresa");
    const logoutBtn = document.getElementById("logoutBtn");

    if (activeUser) {
      loginLink.textContent = activeUser.usuario;
      loginLink.href = "#";
      loginLink.classList.add("dropdown-toggle");
      loginLink.setAttribute("data-bs-toggle", "dropdown");
      if (logoutBtn) {
        logoutBtn.style.display = "block";
        logoutBtn.onclick = () => {
          localStorage.removeItem("activeUser");
          window.location.href = "index.html";
        };
      }
    } else {
      loginLink.textContent = "Ingresa";
      loginLink.href = "acceso.html";
      loginLink.classList.remove("dropdown-toggle");
      loginLink.removeAttribute("data-bs-toggle");
      if (logoutBtn) logoutBtn.style.display = "none";
    }
  }

  loadHTML("header","../header.html");
  loadHTML("footer", "../footer.html");

  window.userHeaderUpdate = updateHeader;
});
