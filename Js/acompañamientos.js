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

          <label class="form-label"><strong>Tamaño:</strong></label>
          <select class="form-select mb-2 size-select">
            <option value="pequeño">Pequeño - $${item.precios.pequeño.toLocaleString()}</option>
            <option value="mediano" selected>Mediano - $${item.precios.mediano.toLocaleString()}</option>
            <option value="grande">Grande - $${item.precios.grande.toLocaleString()}</option>
          </select>

          <h6>Extras (+$500 c/u):</h6>
          ${item.extras.map((ex, i) => `
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="${ex}">
              <label class="form-check-label">${ex}</label>
            </div>
          `).join("")}

          <button class="btn btn-success mt-3 add-to-cart">Agregar al carrito</button>
        </div>
      </div>
    `;
    container.appendChild(card);

    card.querySelector(".add-to-cart").addEventListener("click", () => {
      const sizeSelect = card.querySelector(".size-select");
      const selectedSize = sizeSelect.value;
      const basePrice = item.precios[selectedSize];

      const selectedExtras = Array.from(card.querySelectorAll("input[type=checkbox]:checked"))
        .map(cb => cb.value);

      const extraCost = selectedExtras.length * 500;
      const finalPrice = basePrice + extraCost;

      const itemWithExtras = {
        titulo: item.titulo,
        tamaño: selectedSize,
        precio: `$${finalPrice.toLocaleString("es-CL")}`,
        ingredientesExtra: selectedExtras,
        img: item.img,
        cantidad: 1
      };

      let cart = getCart();
      const existing = cart.find(el => 
        el.titulo === itemWithExtras.titulo && 
        el.tamaño === itemWithExtras.tamaño &&
        JSON.stringify(el.ingredientesExtra) === JSON.stringify(itemWithExtras.ingredientesExtra)
      );

      if (existing) existing.cantidad += 1;
      else cart.push(itemWithExtras);

      saveCart(cart);
      alert(`${item.titulo} agregado 🛒`);
    });
  });
}

document.addEventListener("DOMContentLoaded", renderAcompanamientos);
