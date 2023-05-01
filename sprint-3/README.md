# NODE-CH-39770

Repositorio de trabajo en clase de curso NodeJs Coderhouse

Cada carpeta es un proyecto de un Sprint o Desafío distinto.

Se utiliza ECMAScript Modules.

1- Inicializar proyecto node

npm init

npm init -y

2- Editar archivo package.json y agregar la siguiente linea

"type": "module",

Sprint 3 (Desafío 3)

Se agrega una clase ProductManager en el archivo ProductManagerFS.js para guardar en archivos en la carpeta data.

Para utilizarla con Modules

import { ProductManager } from "./ProductManagerFS.js";

Crear una instancia de la clase para poder utilizarla

const productos = new ProductManager

Al crear la instancia init() que es un metodo interno, lee el archivo y carga en memoria los datos, caso contrario crea un archivo nuevo.

addProduct -> Guarda producto en memoria y luego en archivo, le agrega un id de forma automatica tomando como punto de partida el del ultimo elemento del archivo, devuelve el id del producto agregado.

productos.addProduct({
title: string,
description: string,
price: number,
thumbnail: string,
stock: number,
});

getProducts -> Devuelve productos guardados en memoria, si no hay productos devuelve el array vacio.

productos.getProducts()

getProductById -> Devuelve el producto guardado en memoria con el id que se envia por argumento

productos.getProductById(id)

updateProducts(id, data) -> Actualiza un producto guardado anteriormente, en caso de no enviar informacion para actualizar o enviar propiedades inadecuadas devuelve error.

productos.updateProduct(3,{
title: string,
description: string,
price: number,
thumbnail: string,
stock: number,
});

deleteProducts(id) -> Elimina un producto guardado anteriormente, en caso de no encontrar el elemento devuelve error.

productos.deleteProduct(3);

Servidor en Express

1- Iniciar servidor

npm run start

2- Endpoints

/api/products

Devuelve todos los productos cargados

/api/products?limit=1

Devuelve los primeros n productos, donde n es el numero asignado a limit

/api/products/1

Devuelve el producto con id 1

/api/carts

Devuelve todos los carritos cargados

/api/carts/1

Devuelve el carrito con id 1
