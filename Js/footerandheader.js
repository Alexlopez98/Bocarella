// Cargar header y footer dinámicamente
async function loadHTML(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Error cargando ${file}`);
    const content = await response.text();
    document.getElementById(id).innerHTML = content;

    if (id === "header") {
      updateHeader();

      // Subheader flotante debajo del header
      setTimeout(() => {
        const subHeader = document.getElementById("subHeader");
        const mainHeader = document.getElementById("mainHeader");
        if (!subHeader || !mainHeader) return;

        const headerHeight = mainHeader.offsetHeight;
        subHeader.style.top = `${headerHeight}px`;

        // Scroll handler
        window.addEventListener("scroll", () => {
          const scrollTop = window.scrollY;
          if (scrollTop < headerHeight) {
            subHeader.style.top = `${headerHeight}px`;
          } else {
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
    loginLink.innerHTML = 'Ingresa <i class="fa-regular fa-circle-user"></i> ';
    loginLink.href = "/acceso.html";
    loginLink.classList.remove("dropdown-toggle");
    loginLink.removeAttribute("data-bs-toggle");

    if (logoutBtn) logoutBtn.style.display = "none";
  }

  if (typeof updateHeaderCartCount === "function") updateHeaderCartCount();
}

// DOMContentLoaded
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
