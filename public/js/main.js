export const socket = io();

const cartLogoDB = document.getElementById("cart_logoDB");
const cartLogoFS = document.getElementById("cart_logoFS");

socket.on("cart-productsTotalFS", (cartTotal) => {
  cartLogoFS.innerHTML = cartTotal;
});

socket.on("cart-productsTotalDB", (cartTotal) => {
  cartLogoDB.innerHTML = cartTotal;
});
