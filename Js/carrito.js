
function getActiveUserKey() {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  return activeUser ? `cart_${activeUser.usuario}` : "cart_guest";
}


function getCart() {
  const key = getActiveUserKey();
  return JSON.parse(localStorage.getItem(key)) || [];
}


function saveCart(cart) {
  const key = getActiveUserKey();
  localStorage.setItem(key, JSON.stringify(cart));
  updateCartCount();
  if (window.updateHeaderCartCount) window.updateHeaderCartCount();
}


function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;
  const cart = getCart();
  const totalProducts = cart.reduce((sum, item) => sum + item.cantidad, 0);
  cartCount.textContent = totalProducts;
}


function renderCart() {
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartList || !cartTotal) return;

  cartList.innerHTML = "";
  let cart = getCart();
  let total = 0;

  cart.forEach((item, index) => {
    const price = parseInt(item.precio.replace(/\D/g, "")) || 0;
    const subtotal = price * item.cantidad;
    total += subtotal;

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "align-items-center");

    li.innerHTML = `
      <img src="${item.img}" alt="${item.titulo}" style="width:60px; height:60px; object-fit:cover; margin-right:10px; border-radius:5px;">
      <div class="flex-grow-1">
        <strong>${item.titulo}</strong> 
        ${item.tamaño ? `(${item.tamaño})` : ""}
        ${item.sabor ? ` - ${item.sabor}` : ""}
        - $${subtotal.toLocaleString("es-CL")}<br>
        ${item.ingredientesExtra && item.ingredientesExtra.length > 0 
          ? `<small>Extras: ${item.ingredientesExtra.join(", ")}</small><br>` 
          : ""}
        Cantidad: 
        <button class="btn btn-sm btn-secondary" onclick="decreaseQuantity(${index})">-</button>
        <span class="mx-2">${item.cantidad}</span>
        <button class="btn btn-sm btn-secondary" onclick="increaseQuantity(${index})">+</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  cartTotal.textContent = `$${total.toLocaleString("es-CL")}`;
  updateCartCount();
}


function increaseQuantity(index) {
  let cart = getCart();
  cart[index].cantidad += 1;
  saveCart(cart);
  renderCart();
}


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


function clearCart() {
  saveCart([]);
  renderCart();
  showToast("Carrito vaciado 🗑️");
}
document.getElementById("clear-cart")?.addEventListener("click", clearCart);


function checkoutCart() {
  let cart = getCart();
  if (cart.length === 0) {
    showToast("El carrito está vacío ❌");
    return;
  }

  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.precio.replace(/\D/g, "")) || 0;
    return sum + price * item.cantidad;
  }, 0);

  const fecha = new Date().toLocaleString();
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  if (!activeUser) {
    alert("Debes iniciar sesión para finalizar la compra");
    window.location.href = "acceso.html";
    return;
  }

  const historyKey = `history_${activeUser.usuario}`;
  let history = JSON.parse(localStorage.getItem(historyKey)) || [];
  history.push({ fecha, productos: [...cart], total });
  localStorage.setItem(historyKey, JSON.stringify(history));

  saveCart([]);
  renderCart();
  showToast(`Compra realizada con éxito 🎉 Total: $${total.toLocaleString("es-CL")}`);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});
