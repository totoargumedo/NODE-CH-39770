import { socket } from "./main.js";

const params = new URLSearchParams(location.search);
const pid = params.get("pid");
let add_to_cart;

const gallery = document.getElementById("product-show");

fetch(`/api/products/${pid}`)
  .then((response) => response.json())
  .then((data) => {
    renderProduct(data.response);
  })
  .catch((error) => console.warn(error));

function renderProduct(product) {
  let add_button =
    product.stock > 0
      ? `<input
                type="submit"
                 value="Agregar"
                class="btn btn-primary flex-grow-1 mx-3"
                id="add_cart"
              ></input>`
      : `<input
                type="submit"
                 value="Sin stock"
                class="btn btn-outline-danger flex-grow-1 mx-3" disabled
              ></input>`;
  let content = `<div class="card m-3" style="width: 18rem;min-height:570px;">
            <a href="/product/${product._id}"></a>
            <img
              src="${product.thumbnail}"
              class="object-fit-cover card-img-top"
              style="height:290px;"
              alt="${product.title}"
            />
          </a>
          <div
            class="card-body d-flex flex-column justify-content-between align-items-center" 
          >
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <div class="container-fluid row-cols-1 ">
              <p class="btn btn-outline-success col">U$D ${product.price}</p>
             <form class="d-flex justify-content-between align-items-center" id="add-cart">
                <input
                  type="number"
                  class="form-control "
                  style="width:4rem;
                  placeholder="1"
                    name="units"
                      min="1" max="${product.stock}"
                             required />
                             <input
                  type="text"
                  value="${product._id}"
                    name="pid"
                             hidden />
                ${add_button}
            </form>
            </div>
            </div>
              
          </div>
        </div>`;
  gallery.innerHTML = content;
  add_to_cart = document.getElementById("add-cart");
  add_to_cart.addEventListener("submit", (event) => {
    event.preventDefault();
    addToCart(
      "64874ecf7ac94944740664a1",
      event.target.elements.pid.value,
      event.target.elements.units.valueAsNumber
    );
  });
}

async function addToCart(cid, pid, units) {
  fetch(`/api/carts/${cid}/product/${pid}/${units}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Agregado al carrito",
          showConfirmButton: false,
          timer: 1500,
        });
        socket.emit("added-product");
      } else {
        Swal.fire({
          position: "bottom-end",
          icon: "error",
          title: data.response,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((error) => console.warn(error));
}
