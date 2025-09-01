// Cargar header y footer dinámicamente
async function loadHTML(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Error cargando ${file}`);
    const content = await response.text();
    document.getElementById(id).innerHTML = content;

    if (id === "header") {
      updateHeader();

      // ===============================
      // SUBHEADER FIJO ABAJO DEL HEADER Y PEGADO AL TOP AL SCROLL
      // ===============================
      setTimeout(() => {
        const subHeader = document.getElementById("subHeader");
        const mainHeader = document.getElementById("mainHeader");
        if (!subHeader || !mainHeader) return;

        const headerHeight = mainHeader.offsetHeight;

        // Posición inicial del subheader debajo del header
        subHeader.style.top = `${headerHeight}px`;

        window.addEventListener("scroll", () => {
          const scrollTop = window.scrollY;

          if (scrollTop < headerHeight) {
            // Parte superior: subheader debajo del header
            subHeader.style.top = `${headerHeight}px`;
          } else {
            // Bajando: subheader pegado al top
            subHeader.style.top = "0px";
          }
        });
      }, 50);
    }

  } catch (error) {
    console.error(error);
  }
}

// Actualizar header según sesión
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
        window.location.href = "/index.html";
      };
    }
  } else {
    loginLink.textContent = "INGRESA";
    loginLink.href = "/acceso.html";
    loginLink.classList.remove("dropdown-toggle");
    loginLink.removeAttribute("data-bs-toggle");

    if (logoutBtn) logoutBtn.style.display = "none";
  }

  // Actualizar contador del carrito
  if (typeof updateHeaderCartCount === "function") updateHeaderCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "/header.html");
  loadHTML("footer", "/footer.html");

  // Contador global carrito
  window.updateHeaderCartCount = function() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    const key = activeUser ? `cart_${activeUser.usuario}` : "cart_guest";
    const cart = JSON.parse(localStorage.getItem(key)) || [];
    const totalProducts = cart.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalProducts;
  };
});
