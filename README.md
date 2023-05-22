# NODE-CH-39770

Repositorio de trabajo en clase de curso NodeJs Coderhouse

Se utiliza ECMAScript Modules.

1- Inicializar el servidor

npm run start

2- Este proyecto utiliza modules

agregar a package.json -> "type": "module",

Sprint 5 (Desafío 5)

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

GET -> /api/carts/:cid?totalItems=true
GET -> /api/carts/1

Devuelve el carrito con id 1

GET -> /api/carts/1?totalItems=true

Devuelve el total de items en el carrito con id 1

POST -> /api/carts

Crea un carrito nuevo y devuelve el id

PUT -> /api/carts/:cid/product/:pid/:units
PUT -> /api/carts/1/product/1/3

Agrega 3 unidades del producto con id 1 al carrito con id 1. No se pueden agregar mas productos de los que el producto tiene en stock

DELETE -> /api/carts/:cid/product/:pid/:units
DELETE -> /api/carts/1/product/1/3

Quira 3 unidades del producto con id 1 desde carrito con id 1. Si se quitan todos los productos directamente lo quita del carrito
