// const modify_cart = document.getElementById("modify-cart-quantity");
// modify_cart.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   let formElements = e.target.elements;
//   const modify_cart_quantity = await fetch(
//     `/api/carts/9/product/${formElements.pid.value}/${formElements.units.valueAsNumber}`,
//     {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//     }
//   );
//   location.reload();
//   //recibo nuevas unidades
//   //saco o agrego mas al stock
//   //modifico quantity en el cart
//   //recargo pagina
// });

async function modify_cart_quantity(e) {
  e.preventDefault();
  let formElements = e.target.elements;
  let units = formElements.units.valueAsNumber;
  let quantity = Number(formElements.quantity.value);
  let pid = formElements.pid.value;
  console.log(units, quantity, pid);
  if (units === 0) {
    const modify_cart_quantity = await fetch(
      `/api/carts/9/product/${pid}/${quantity}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    document.getElementById(`product-${pid}`).remove();
    return;
  }
  if (units > quantity) {
    units -= quantity;
    console.log(units);
    const modify_cart_quantity = await fetch(
      `/api/carts/9/product/${pid}/${units}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
    return await location.reload();
  }
  if (units < quantity) {
    units = quantity - units;
    const modify_cart_quantity = await fetch(
      `/api/carts/9/product/${pid}/${units}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    return await location.reload();
  }
}

async function send_cart(pid, units) {
  const send_cart_data = await fetch(`/api/carts/9/product/${pid}/${units}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  })
    .then()
    .catch((error) => console.error(error));
  await socket.emit("cart-addProduct");
}
