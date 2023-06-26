async function modify_cart_quantity(e) {
  e.preventDefault();
  let formElements = e.target.elements;
  let units = formElements.units.valueAsNumber;
  let quantity = Number(formElements.quantity.value);
  let pid = formElements.pid.value;
  if (units === 0) {
    await delete_cart_product(pid, quantity);
  }
  if (units > quantity) {
    units -= quantity;
    const modify_cart_quantity = await fetch(
      `/api/cartsFS/9/product/${pid}/${units}`,
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
      `/api/cartsFS/9/product/${pid}/${units}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    return await location.reload();
  }
}

async function delete_cart_product(pid, quantity) {
  const modify_cart_products = await fetch(
    `/api/cartsFS/9/product/${pid}/${quantity}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  document.getElementById(`product-${pid}`).remove();
  await socket.emit("cart-addProduct");
}
