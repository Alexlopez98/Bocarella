// Leer carrito desde LocalStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Guardar carrito en LocalStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Renderizar carrito con imagen, botones + y -
function renderCart() {
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartList.innerHTML = "";

  let cart = getCart();
  let total = 0;

  cart.forEach((item, index) => {
    const price = parseInt(item.precio.replace(/\D/g, ''));
    const subtotal = price * item.cantidad;
    total += subtotal;

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "align-items-center");

    li.innerHTML = `
      <img src="${item.img}" alt="${item.titulo}" style="width:60px; height:60px; object-fit:cover; margin-right:10px; border-radius:5px;">
      <div class="flex-grow-1">
        <strong>${item.titulo}</strong> - $${subtotal}<br>
        Cantidad: 
        <button class="btn btn-sm btn-secondary" onclick="decreaseQuantity(${index})">-</button>
        <span class="mx-2">${item.cantidad}</span>
        <button class="btn btn-sm btn-secondary" onclick="increaseQuantity(${index})">+</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  cartTotal.textContent = total;
}

// Aumentar cantidad
function increaseQuantity(index) {
  let cart = getCart();
  cart[index].cantidad += 1;
  saveCart(cart);
  renderCart();
}

// Disminuir cantidad
function decreaseQuantity(index) {
  let cart = getCart();
  if (cart[index].cantidad > 1) {
    cart[index].cantidad -= 1;
  } else {
    cart.splice(index, 1);
  }
  saveCart(cart);
  renderCart();
}

// Vaciar carrito
document.getElementById("clear-cart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  renderCart();
});

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", renderCart);
//fin