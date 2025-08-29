// ===============================
// FUNCIONES DEL CARRITO POR USUARIO
// ===============================

// Obtener la key del usuario activo
function getActiveUserKey() {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  return activeUser ? `cart_${activeUser.usuario}` : "cart_guest";
}

// Leer carrito desde LocalStorage según usuario
function getCart() {
  const key = getActiveUserKey();
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Guardar carrito en LocalStorage según usuario
function saveCart(cart) {
  const key = getActiveUserKey();
  localStorage.setItem(key, JSON.stringify(cart));
  updateCartCount(); // actualizar contador flotante en header
  if(window.updateHeaderCartCount) window.updateHeaderCartCount();
}

// Contador del carrito flotante
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;
  const cart = getCart();
  const totalProducts = cart.reduce((sum, item) => sum + item.cantidad, 0);
  cartCount.textContent = totalProducts;
}

// Renderizar carrito con imagen, botones + y -
function renderCart() {
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartList || !cartTotal) return;

  cartList.innerHTML = "";
  let cart = getCart();
  let total = 0;

  cart.forEach((item, index) => {
    const price = parseInt(item.precio.replace(/\D/g, '')); // convertir a número
    const subtotal = price * item.cantidad;
    total += subtotal;

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "align-items-center");

    li.innerHTML = `
      <img src="${item.img}" alt="${item.titulo}" style="width:60px; height:60px; object-fit:cover; margin-right:10px; border-radius:5px;">
      <div class="flex-grow-1">
        <strong>${item.titulo}</strong> - $${subtotal.toLocaleString('es-CL')}<br>
        Cantidad: 
        <button class="btn btn-sm btn-secondary" onclick="decreaseQuantity(${index})">-</button>
        <span class="mx-2">${item.cantidad}</span>
        <button class="btn btn-sm btn-secondary" onclick="increaseQuantity(${index})">+</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  cartTotal.textContent = `$${total.toLocaleString('es-CL')}`;
  updateCartCount();
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
    cart.splice(index, 1); // eliminar producto si cantidad = 0
  }
  saveCart(cart);
  renderCart();
}

// Vaciar carrito
document.getElementById("clear-cart")?.addEventListener("click", () => {
  const cart = getCart();
  if(cart.length > 0){
    saveCart([]);
    renderCart();
    alert("Carrito vaciado!");
  }
});

// Finalizar compra y registrar historial por usuario
function checkoutCart() {
  let cart = getCart();
  if(cart.length === 0){
    alert("El carrito está vacío!");
    return;
  }

  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.precio.replace(/\D/g, ''));
    return sum + price * item.cantidad;
  }, 0);

  const fecha = new Date().toLocaleString();
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  if(!activeUser){
    alert("Debes iniciar sesión para finalizar la compra");
    window.location.href = "acceso.html"; // redirige a login
    return;
  }

  // Guardar historial por usuario
  const historyKey = `history_${activeUser.usuario}`;
  let history = JSON.parse(localStorage.getItem(historyKey)) || [];
  history.push({
    fecha: fecha,
    productos: [...cart],
    total: total
  });
  localStorage.setItem(historyKey, JSON.stringify(history));

  saveCart([]); // vaciar carrito
  renderCart();
  alert(`Compra realizada con éxito! Total: $${total.toLocaleString('es-CL')}`);
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});
