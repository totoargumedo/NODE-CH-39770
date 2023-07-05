import { socket } from "./main.js";

const chat_box = document.getElementById("chat-body");

function renderMessageAsistance(data) {
  //contenido del mensaje del chat
  let message_text = `<p class="small mb-0">${data.message || "Con gusto"}</p>`;

  //en caso de que traiga opciones las agrega al contenido del mensaje
  if (data.options) {
    data.options.forEach((option) => {
      message_text += `<p class="small mb-0">${option.id}- ${option.message}</p>`;
    });
  }

  //para redireccionar a otra parte de la web
  if (data.redirect) {
    message_text += `<a href="${data.redirect}" class="small mb-0 d-block">Productos de la tienda</a>`;
  }

  //redireccionar a pagina de productos
  if (data.products) {
    data.products.forEach((product) => {
      message_text += `<a href="./product.html?pid=${product._id}" class="small mb-0 d-block">${product.title}</a>`;
    });
  }

  //estructura del mensaje del chat
  let message_body = document.createElement("div");
  message_body.classList = "d-flex flex-row justify-content-start mb-4";
  message_body.innerHTML = `
              <img
                src="https://p.turbosquid.com/ts-thumb/oG/7J2zYt/Aie4ON3q/jawa_v01_0008/jpg/1282314962/1920x1080/fit_q87/2fcbaf20c1b4e1899bb94957da64e712b09e6235/jawa_v01_0008.jpg"
                alt="avatar 1"
                style="width: 45px; height: 100%; border-radius:30px;"
              />
              <div
                class="p-3 ms-3"
                style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);"
              >
                ${message_text}
              </div>`;

  chat_box.append(message_body);
}

function renderMessageClient(data) {
  //estructura del mensaje del chat
  let message_body = document.createElement("div");
  message_body.classList = "d-flex flex-row justify-content-end mb-4";
  message_body.innerHTML = `
              <div
                class="p-3 me-3 border"
                style="border-radius: 15px; background-color: #fbfbfb;"
              >
                <p class="small mb-0">${data}</p>
              </div>
              <img
                src="https://avatars.githubusercontent.com/u/2608369?v=4"
                alt="avatar 1"
                style="width: 45px; height: 100%;border-radius:30px;"
              />`;
  chat_box.append(message_body);
}

//tomar ingresos del chat
const chat_textbox = document.getElementById("chat-entry");
chat_textbox.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    renderMessageClient(chat_textbox.value);
    socket.emit("new-message", chat_textbox.value);
    chat_textbox.value = "";
    chat_textbox.focus();
  }
});

socket.emit("bot-new-connection");

socket.on("bot-welcome", (data) => {
  renderMessageAsistance(data);
});

socket.on("message-response", (data) => {
  renderMessageAsistance(data);
});
