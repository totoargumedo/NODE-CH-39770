const add_product_form = document.getElementById("add-product");

add_product_form.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = event.target.elements;
  let product = {
    title: data.title.value,
    description: data.description.value,
    price: data.price.valueAsNumber,
    code: data.code.value,
    thumbnail: data.thumbnail.value,
    stock: data.stock.valueAsNumber,
  };
  add_product_form.reset();
  document.querySelector("input[name=title]").focus();
  fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Producto creado exitosamente",
          showConfirmButton: true,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "bottom-end",
          icon: "error",
          title: data.response,
          showConfirmButton: true,
          timer: 1500,
        });
      }
    })
    .catch((error) => console.log(error));
});
