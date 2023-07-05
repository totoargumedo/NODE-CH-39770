export const socket = io();

const cartLogoDB = document.getElementById("cart_logoDB");

socket.on("cart-productsTotal", (cartTotal) => {
  cartLogoDB.innerHTML = cartTotal;
});
