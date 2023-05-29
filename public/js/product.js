const add_cart = document.getElementById("add_cart");
add_cart.addEventListener("submit", async (e) => {
  e.preventDefault();
  let units = Number(e.target.elements.units.value);
  let pid = Number(e.target.elements.product.value);
  await send_cart(pid, units);
});

async function send_cart(pid, units) {
  const send_cart_data = await fetch(`/api/carts/9/product/${pid}/${units}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  })
    .then()
    .catch((error) => console.error(error));
  await socket.emit("cart-addProduct");
}
