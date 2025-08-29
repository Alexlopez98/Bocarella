// 1. Base de datos de pizzas con precios según tamaño
const pizzasData = [
  {
    titulo: "Pizza Margarita",
    descripcion: "Clásica con salsa de tomate, mozzarella y albahaca.",
    precios: { individual: 5990, mediana: 7990, familiar: 9990 },
    img: "/Img/margarita.png",
    ingredientes: ["Extra Queso", "Champiñones", "Aceitunas", "Tomates Cherry"]
  },
  {
    titulo: "Pizza Pepperoni",
    descripcion: "Mozzarella y mucho pepperoni.",
    precios: { individual: 6990, mediana: 8990, familiar: 10990 },
    img: "/Img/pepperoni.png",
    ingredientes: ["Extra Queso", "Orégano", "Jalapeños", "Cebolla"]
  },
  {
    titulo: "Pizza Hawaiana",
    descripcion: "Jamón, piña y mozzarella.",
    precios: { individual: 6490, mediana: 8490, familiar: 10490 },
    img: "/Img/hawaiana.png",
    ingredientes: ["Extra Queso", "Champiñones", "Pimientos", "Tocino"]
  }
];

// 2. Renderizar pizzas
function renderPizzas() {
  const container = document.getElementById("pizzas");
  container.innerHTML = "";

  pizzasData.forEach((pizza, index) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");
    card.innerHTML = `
      <div class="card h-100">
        <img src="${pizza.img}" class="card-img-top" alt="${pizza.titulo}">
        <div class="card-body">
          <h5 class="card-title">${pizza.titulo}</h5>
          <p class="card-text">${pizza.descripcion}</p>

          <label for="size-${index}" class="form-label"><strong>Tamaño:</strong></label>
          <select class="form-select mb-2 size-select" id="size-${index}">
            <option value="individual">Individual - $${pizza.precios.individual.toLocaleString()}</option>
            <option value="mediana" selected>Mediana - $${pizza.precios.mediana.toLocaleString()}</option>
            <option value="familiar">Familiar - $${pizza.precios.familiar.toLocaleString()}</option>
          </select>

          <h6>Elige ingredientes extra (+$1.000 c/u):</h6>
          ${pizza.ingredientes.map((ing, i) => `
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="${ing}" id="ing-${index}-${i}">
              <label class="form-check-label" for="ing-${index}-${i}">${ing}</label>
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
      const basePrice = pizza.precios[selectedSize];

      const selectedIngredients = Array.from(card.querySelectorAll("input[type=checkbox]:checked")).map(cb => cb.value);

      const extraCost = selectedIngredients.length * 1000;
      const finalPrice = basePrice + extraCost;

      const pizzaWithExtras = {
        titulo: pizza.titulo,
        descripcion: pizza.descripcion,
        tamaño: selectedSize,
        precio: `$${finalPrice.toLocaleString("es-CL")}`,
        ingredientesExtra: selectedIngredients,
        img: pizza.img,
        cantidad: 1
      };

      addToCartLS(pizzaWithExtras);
      showToast(`${pizza.titulo} (${selectedSize}) agregado 🛒`);
    });
  });
}

// 3. Agregar al carrito usando carrito.js
function addToCartLS(pizza) {
  let cart = getCart();

  // Verificamos por titulo + tamaño + extras
  const existing = cart.find(item =>
    item.titulo === pizza.titulo &&
    item.tamaño === pizza.tamaño &&
    JSON.stringify(item.ingredientesExtra) === JSON.stringify(pizza.ingredientesExtra)
  );

  if (existing) existing.cantidad += 1;
  else cart.push(pizza);

  saveCart(cart);
  if (typeof updateCartCount === "function") updateCartCount();
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  renderPizzas();
});
