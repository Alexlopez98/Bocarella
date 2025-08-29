// 1. Base de datos de acompañamientos con precios por tamaño
const acompanamientosData = [
  {
    titulo: "Papas Fritas",
    descripcion: "Crujientes y doradas, perfectas para acompañar tu pizza.",
    precios: { pequeño: 1990, mediano: 2990, grande: 3990 },
    img: "/Img/papas.png",
    extras: ["Salsa BBQ", "Salsa Cheddar", "Salsa Picante"]
  },
  {
    titulo: "Alitas de Pollo",
    descripcion: "Jugosas alitas bañadas en salsa.",
    precios: { pequeño: 3990, mediano: 5490, grande: 6990 },
    img: "/Img/alitas.png",
    extras: ["Salsa Picante", "Salsa Ajo Parmesano", "Salsa Miel Mostaza"]
  },
];

// 2. Renderizar acompañamientos
function renderAcompanamientos() {
  const container = document.getElementById("acompanamientos");
  container.innerHTML = "";

  acompanamientosData.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");
    card.innerHTML = `
      <div class="card h-100">
        <img src="${item.img}" class="card-img-top" alt="${item.titulo}">
        <div class="card-body">
          <h5 class="card-title">${item.titulo}</h5>
          <p class="card-text">${item.descripcion}</p>

          <label for="size-${index}" class="form-label"><strong>Tamaño:</strong></label>
          <select class="form-select mb-2 size-select" id="size-${index}">
            <option value="pequeño">Pequeño - $${item.precios.pequeño.toLocaleString()}</option>
            <option value="mediano" selected>Mediano - $${item.precios.mediano.toLocaleString()}</option>
            <option value="grande">Grande - $${item.precios.grande.toLocaleString()}</option>
          </select>

          <h6>Extras (+$500 c/u):</h6>
          ${item.extras.map((ex, i) => `
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="${ex}" id="extra-${index}-${i}">
              <label class="form-check-label" for="extra-${index}-${i}">${ex}</label>
            </div>
          `).join("")}

          <button class="btn btn-success mt-3 add-to-cart">Agregar al carrito</button>
        </div>
      </div>
    `;
    container.appendChild(card);

    // Evento agregar al carrito
    card.querySelector(".add-to-cart").addEventListener("click", () => {
      const sizeSelect = card.querySelector(".size-select");
      const selectedSize = sizeSelect.value;
      const basePrice = item.precios[selectedSize];

      const selectedExtras = Array.from(card.querySelectorAll("input[type=checkbox]:checked")).map(cb => cb.value);

      const extraCost = selectedExtras.length * 500; // 💰 cada extra vale $500
      const finalPrice = basePrice + extraCost;

      const itemWithExtras = {
        titulo: item.titulo,
        descripcion: item.descripcion,
        tamaño: selectedSize,
        precioBase: basePrice,
        precioFinal: finalPrice,
        extras: selectedExtras,
        img: item.img,
        cantidad: 1
      };

      addToCartLS(itemWithExtras);
    });
  });
}

// 3. Agregar al carrito (usa carrito.js)
function addToCartLS(item) {
  let cart = getCart();

  // Verificar si ya existe el mismo acompañamiento con mismo tamaño y extras
  const existing = cart.find(el => 
    el.titulo === item.titulo && 
    el.tamaño === item.tamaño &&
    JSON.stringify(el.extras) === JSON.stringify(item.extras)
  );

  if (existing) existing.cantidad += 1;
  else cart.push(item);

  saveCart(cart);
  if (typeof updateCartCount === "function") updateCartCount();

  alert(`${item.titulo} (${item.tamaño}) agregado con ${item.extras.length > 0 ? item.extras.join(", ") : "sin extras"} 🛒\nPrecio final: $${item.precioFinal.toLocaleString()}`);
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  renderAcompanamientos();
});
