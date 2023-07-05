const gallery = document.getElementById("products-gallery");
const searchBtn = document.getElementById("search-title");
const paginationList = document.getElementById("pagination-list");

async function getProducts(quantity, pagination, query) {
  let page = pagination ?? 1;
  let limit = quantity ?? 10;
  let title = query ?? {};
  fetch(`/api/products?limit=${limit}&page=${page}&title=${title}`)
    .then((response) => response.json())
    .then((data) => {
      renderGallery(data.response.docs);
      renderPagination(data.response);
    })
    .catch((error) => console.warn(error));
}

function renderGallery(data) {
  let content = "";
  data.forEach((product) => {
    content += `<div class="col">

        <div class="card m-3" style="width: 18rem;min-height:570px;">
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
              <a
                href="./product.html?pid=${product._id}"
                class="btn btn-primary col"
              >Comprar</a>
            </div>
            </div>
              
          </div>
        </div>
      </div>`;
  });
  gallery.innerHTML = content;
}

function renderPagination(data) {
  paginationList.innerHTML = "";
  if (data.hasPrevPage) {
    let li = document.createElement("li");
    li.classList = "page-item";
    li.innerHTML = `
                <a class="page-link" href="#" onclick="getProducts(10,${
                  data.page - 1
                })">Anterior</a>
            `;
    paginationList.append(li);
  } else {
    let li = document.createElement("li");
    li.classList = "page-item disabled";
    li.innerHTML = `
                <a class="page-link">Anterior</a>
            `;
    paginationList.append(li);
  }
  for (let i = 0; i < data.totalPages; i++) {
    let liPage = document.createElement("li");
    liPage.classList = "page-item";
    liPage.innerHTML = `<a class="page-link" href="#" onclick="getProducts(10,${
      i + 1
    })">${i + 1}</a>`;
    paginationList.append(liPage);
  }
  if (data.hasNextPage) {
    let li = document.createElement("li");
    li.classList = "page-item";
    li.innerHTML = `
                <a class="page-link" href="#" onclick="getProducts(10,${
                  data.page + 1
                })">Siguiente</a>
            `;
    paginationList.append(li);
  } else {
    let li = document.createElement("li");
    li.classList = "page-item disabled";
    li.innerHTML = `
                <a class="page-link">Siguiente</a>
            `;
    paginationList.append(li);
  }
}

searchBtn.addEventListener("submit", (event) => {
  event.preventDefault();
  getProducts(10, 1, event.target.elements.query.value);
});

getProducts(10, 1);
