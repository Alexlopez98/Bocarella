const extrasData = [
  { titulo: "Brownie con Helado", descripcion: "Brownie de chocolate con bola de helado de vainilla.", precio: 2990, img: "/Img/brownie.png" },
  { titulo: "Tiramisú", descripcion: "Postre italiano con café y mascarpone.", precio: 3490, img: "/Img/tiramisu.png" },
  { titulo: "Cheesecake Frutilla", descripcion: "Tarta de queso con salsa de frutilla fresca.", precio: 3290, img: "/Img/cheesecake.png" },
  { titulo: "Bebida en lata", descripcion: "Variedades de 350 ml.", precio: 1200, img: "/Img/lata.png", sabores: ["Coca-Cola", "Sprite", "Fanta", "Coca-Cola Zero"] },
  { titulo: "Bebida botella 1.5L", descripcion: "Refrescos clásicos en formato familiar.", precio: 2500, img: "/Img/botella.png", sabores: ["Coca-Cola", "Sprite", "Fanta", "Coca-Cola Zero"] },
  { titulo: "Jugo natural", descripcion: "Jugo de frutas naturales.", precio: 1800, img: "/Img/jugo.png", sabores: ["Naranja", "Frutilla", "Durazno"] }
];

function renderExtras() {
  const container = document.getElementById("extras");
  container.innerHTML = "";

  extrasData.forEach((extra, index) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");

    let saborSelectHTML = "";
    if (extra.sabores) {
      saborSelectHTML = `
        <label class="form-label"><strong>Sabor:</strong></label>
        <select class="form-select mb-2 sabor-select">
          ${extra.sabores.map(s => `<option value="${s}">${s}</option>`).join("")}
        </select>
      `;
    }

    card.innerHTML = `
      <div class="card h-100">
        <img src="${extra.img}" class="card-img-top" alt="${extra.titulo}">
        <div class="card-body">
          <h5 class="card-title">${extra.titulo}</h5>
          <p class="card-text">${extra.descripcion}</p>
          <p class="fw-bold">Precio: $${extra.precio.toLocaleString()}</p>
          ${saborSelectHTML}
          <button class="btn btn-success add-to-cart">Agregar al carrito</button>
        </div>
      </div>
    `;
    container.appendChild(card);

    card.querySelector(".add-to-cart").addEventListener("click", () => {
      let selectedSabor = extra.sabores ? card.querySelector(".sabor-select").value : null;
      
      const newItem = {
        titulo: extra.titulo,
        precio: `$${extra.precio.toLocaleString("es-CL")}`,
        sabor: selectedSabor,
        img: extra.img,
        cantidad: 1
      };

      let cart = getCart();
      const existing = cart.find(item => item.titulo === newItem.titulo && item.sabor === newItem.sabor);

      if (existing) existing.cantidad += 1;
      else cart.push(newItem);

      saveCart(cart);
      alert(`${extra.titulo}${selectedSabor ? " - " + selectedSabor : ""} agregado 🛒`);
    });
  });
}

document.addEventListener("DOMContentLoaded", renderExtras);
