const promosData = [
 
  {
    titulo: "pizza gamer",
    descripcion: "La mejor pizza para ratas 2x1 pizza pepperoni",
    categoria: "2x1",
    precio: "$19.990",
    img: "../Img/pizzagamer.jpg"
  },
  {
    titulo: "Pizza Pepperonipizz",
    descripcion: "La mejor pizza de toda Italia",
    categoria: "familiar",
    precio: "$12.990",
    img: "../img/pepperoni.jpeg"
  },
  {
    titulo: "Super Dúo",
    descripcion: "🔥 ¡DOBLEMENTE IRRESISTIBLE! 🔥 2 Pizzas Familiares SELECCION ",
    categoria: "2x1",
    precio: "$9.990",
    img: "../Img/PIZZADUO.jpg"
  },
  {
    titulo: "Pizza Individual Hawaiana",
    descripcion: "Ideal para disfrutar solo ",
    categoria: "individual",
    precio: "$5.990",
    img: "../img/hawaiana.avif"
  }
];

function updateCartCountPromos() {
  if(window.updateHeaderCartCount) window.updateHeaderCartCount();
}

function renderPromos() {
  const container = document.getElementById("promos");
  container.innerHTML = "";

  promosData.forEach(pizza => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");
    card.innerHTML = `
      <div class="card h-100" data-category="${pizza.categoria}">
        <img src="${pizza.img}" class="card-img-top" alt="${pizza.titulo}">
        <div class="card-body">
          <h5 class="card-title">${pizza.titulo}</h5>
          <p class="card-text">${pizza.descripcion}</p>
          <button class="btn btn-success add-to-cart">Comprar</button>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Categoría: ${pizza.categoria}</li>
          <li class="list-group-item">Precio: ${pizza.precio}</li>
        </ul>
      </div>
    `;
    container.appendChild(card);

    card.querySelector(".add-to-cart").addEventListener("click", () => {
      addToCartLS(pizza);
    });
  });
}

function filterPromos(category) {
  const promos = document.querySelectorAll(".card[data-category]");
  promos.forEach(promo => {
    const col = promo.parentElement;
    col.style.display = (category === "all" || promo.dataset.category === category) ? "block" : "none";
  });
}

function addToCartLS(pizza) {
  let cart = getCart();
  const existing = cart.find(item => item.titulo === pizza.titulo);
  if (existing) existing.cantidad += 1;
  else cart.push({ ...pizza, cantidad: 1 });

  saveCart(cart);
  updateCartCountPromos();
  alert(`${pizza.titulo} agregado al carrito! 🛒`);
}

document.addEventListener("DOMContentLoaded", () => {
  renderPromos();
  updateCartCountPromos();
});