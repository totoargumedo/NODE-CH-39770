const cart_gallery = document.getElementById("cart-gallery");
const cart_total = document.getElementById("cart-total");

function renderCart() {
  fetch("/api/carts/64874ecf7ac94944740664a1")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("cart-total-items").innerText =
        data.response.products.length + " artículos";
      renderProducts(data.response.products, data.response._id);
    })
    .catch((error) => console.log(error));
}

function getTotalBill() {
  fetch("/api/carts/bills/64874ecf7ac94944740664a1")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("cart-partial").innerText =
        "U$D " + data.response.total;
      let transport = document.getElementById("transport-cost").value;
      cart_total.innerText = `U$D ${data.response.total + Number(transport)}`;
    })
    .catch((error) => console.log(error));
}

function renderProducts(data, cid) {
  cart_gallery.innerHTML = "";
  data.forEach((product) => {
    let div = document.createElement("div");
    div.classList =
      "row mb-4 d-flex justify-content-between align-items-center";
    div.innerHTML = `
                    <div class="col-md-2 col-lg-2 col-xl-2">
                        <a href="/product.html?pid=${product._id}">
                            <img src="${
                              product.thumbnail
                            }" class="img-fluid rounded-3" alt="${
      product.title
    }">
                        </a>    
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="text-muted">${product.title}</h6>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input id="units-input" min="1" max="${
                          product.stock + product.quantity
                        } name="units" value="${
      product.quantity
    }" type="number" class="form-control form-control-sm" />
                        <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">U$D ${product.price}</h6>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#" onclick="cartDeleteItem(event)" class="text-muted">
                            <i pid="${product._id}" cid="${cid}" units="${
      product.quantity
    }" class="fas fa-times"></i>
                        </a>
                    </div>`;
    let hr = document.createElement("hr");
    hr.classList = "my-4";
    cart_gallery.append(div);
    cart_gallery.append(hr);
  });
}

function checkCoupon(event) {
  if (event.key == "Enter") {
    Swal.fire({
      position: "bottom-end",
      heigh: 100,
      width: 200,
      title: "Codigo invalido",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

function totalCalculator(event) {
  fetch("/api/carts/bills/64874ecf7ac94944740664a1")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("cart-partial").innerText =
        "U$D " + data.response.total;
      let transport = document.getElementById("transport-cost").value;
      cart_total.innerText = `U$D ${
        data.response.total + Number(event.target.value)
      }`;
    })
    .catch((error) => console.log(error));
}

function buyMsg(event) {
  event.preventDefault();
  Swal.fire({
    position: "center",
    icon: "warning",
    title: "Todavia no implementamos esa funcionalidad",
    showConfirmButton: true,
    timer: 1500,
  });
}

function cartDeleteItem(event) {
  event.preventDefault();
  fetch(
    `/api/carts/${event.target.attributes.cid.value}/product/${event.target.attributes.pid.value}/${event.target.attributes.units.value}`,
    { method: "DELETE" }
  )
    .then((response) => response.json())
    .then((data) => {
      renderCart();
      getTotalBill();
    })
    .catch((error) => console.log(error));
}

renderCart();
getTotalBill();
