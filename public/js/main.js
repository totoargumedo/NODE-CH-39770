const socket = io();

const cartLogo = document.getElementById("cart_logo");

socket.on("cart-productsTotal", (cartTotal) => {
  cartLogo.innerHTML = cartTotal;
});
