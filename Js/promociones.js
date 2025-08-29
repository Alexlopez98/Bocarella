
// 1. Base de datos de pizzas

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
    descripcion: "La mejor pizza de toda Italia ",
    categoria: "familiar",
    precio: "$12.990",
    img: "/Img/BOCA.png"
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
    img: "/Img/hawaiana.png"
  }
  
];

// 2. Render

function renderPromos() {
  const container = document.getElementById("promos");
  container.innerHTML = ""; 

  promosData.forEach(pizza => {
    const card = `
      <div class="col-md-4 mb-4">
        <div class="card h-100" data-category="${pizza.categoria}">
          <img src="${pizza.img}" class="card-img-top" alt="${pizza.titulo}">
          <div class="card-body">
            <h5 class="card-title">${pizza.titulo}</h5>
            <p class="card-text">${pizza.descripcion}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Categoría: ${pizza.categoria}</li>
            <li class="list-group-item">Precio: ${pizza.precio}</li>
          </ul>
          <div class="card-body">
            <a href="#" class="btn btn-success">Comprar</a>
            <a href="#" class="card-link">Más detalles</a>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}


// 3. Filtrar promociones

function filterPromos(category) {
  const promos = document.querySelectorAll(".card[data-category]");
  
  promos.forEach(promo => {
    const col = promo.parentElement; 
    if (category === "all" || promo.dataset.category === category) {
      col.style.display = "block"; 
    } else {
      col.style.display = "none";  
    }
  });
}


// 4. Carga
document.addEventListener("DOMContentLoaded", renderPromos);

