# NODE-CH-39770

Repositorio de trabajo en clase de curso NodeJs Coderhouse

Se utiliza ECMAScript Modules.

1- Inicializar el servidor

npm run start

2- Este proyecto utiliza modules

agregar a package.json -> "type": "module",

Sprint 4 (Desafío 4)

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

2- Endpoints Productos

GET -> /api/products

Devuelve todos los productos cargados

GET -> /api/products?limit=1

Devuelve los primeros n productos, donde n es el numero asignado a limit

GET -> /api/products/:pid
GET -> /api/products/1

Devuelve el producto con id 1

POST -> /api/products

Crea un producto nuevo, devuelve el id del producto

PUT -> /api/products/:pid
PUT -> /api/products/1

Modifica un producto existe con id 1, recibe un objeto con las siguientes propiedades {
title,
description,
price,
code,
thumbnail,
stock,
}

DELETE -> /api/products/:pid
DELETE -> /api/products/1

Elimina el producto con id 1

2- Endpoints Carritos

GET -> /api/carts

Devuelve todos los carritos cargados

GET -> /api/carts/:cid
GET -> /api/carts/1

Devuelve el carrito con id 1

POST -> /api/carts

Crea un carrito nuevo y devuelve el id

PUT -> /api/carts/:cid/product/:pid/:units
PUT -> /api/carts/1/product/1/3

Agrega 3 unidades del producto con id 1 al carrito con id 1. No se pueden agregar mas productos de los que el producto tiene en stock

DELETE -> /api/carts/:cid/product/:pid/:units
DELETE -> /api/carts/1/product/1/3

Quira 3 unidades del producto con id 1 desde carrito con id 1. Si se quitan todos los productos directamente lo quita del carrito
