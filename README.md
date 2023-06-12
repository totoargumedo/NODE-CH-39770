# NODE-CH-39770

Repositorio de trabajo en clase de curso NodeJs Coderhouse

Se utiliza ECMAScript Modules.

1- Inicializar el servidor en express

npm run start

2- Este proyecto utiliza modules

agregar a package.json -> "type": "module",

Sprint 6 (Desafío 6)

3- Pantallas

PRINCIPAL -> /
Pantalla de inicio con navegador a las siguientes pantallas

PRODUCTOS -> /new_product
Formulario de carga de productos a FS - Realiza POST a /api/productsFS
Formulario de carga de productos a DB - Realiza POST a /api/productsDB

PRODUCTOS -> /productsFS  
Galeria de tarjeta de todos los productos en FS que devuelve GET /api/productsFS
PRODUCTOS -> /productsDB
Galeria de tarjeta de todos los productos en DB que devuelve GET /api/productsDB

PRODUCTOS -> /productsFS/:id -> /productsFS/1
Pantalla de producto, devuelve el producto en FS con id 1
PRODUCTOS -> /productsDB/:id -> /productsDB/1
Pantalla de producto, devuelve el producto en DB con id 1

CARRITO -> /cartsFS
Pantalla de productos en carrito en FS con id "9", tiene opcion de eliminacion o cambio de cantidad con limite en el stock disponible
CARRITO -> /cartsDB
Pantalla de productos en carrito en DB con id "64874ecf7ac94944740664a1", tiene opcion de eliminacion o cambio de cantidad con limite en el stock disponible

PREGUNTANOS / ICONO DE CHAT -> /chat
Pantalla de chat con chatbot, presenta opciones y reconoce las opciones indicadas por numero. Tambien devuelve busquedas de producto cuando el chat incluye "/buscar alguna busqueda"

4- Endpoints Productos ----- Se crearon 2 rutas en paralelo
--> Para productos
/api/productsFS y /api/productsDB
--> Para carritos
/api/cartsFS y /api/cartsDB

GET -> /api/productsFS
Devuelve todos los productos cargados en FS
GET -> /api/productsDB
Devuelve todos los productos cargados en DB

GET -> /api/productsFS?limit=1
Devuelve los primeros n productos en FS, donde n es el numero asignado a limit
GET -> /api/productsDB?limit=1
Devuelve los primeros n productos en DB, donde n es el numero asignado a limit

GET -> /api/productsFS/:pid
GET -> /api/productsFS/1
Devuelve el producto con id 1

GET -> /api/productsDB/:pid
GET -> /api/productsDB/1
Devuelve el producto con id 1

POST -> /api/productsFS
POST -> /api/productsDB

Crea un producto nuevo, devuelve el id del producto

PUT -> /api/productsFS/:pid
PUT -> /api/productsFS/1
PUT -> /api/productsDB/:pid
PUT -> /api/productsDB/64874ecf7ac94944740664a1

Modifica un producto existe con id 1 o 64874ecf7ac94944740664a1, recibe un objeto con las siguientes propiedades {
title,
description,
price,
code,
thumbnail,
stock,
}

DELETE -> /api/productsFS/:pid
DELETE -> /api/productsFS/1
DELETE -> /api/productsDB/:pid
DELETE -> /api/productsDB/64874ecf7ac94944740664a1

Elimina el producto con id 1 o 64874ecf7ac94944740664a1

5- Endpoints Carritos

GET -> /api/cartsFS
GET -> /api/cartsDB

Devuelve todos los carritos cargados

GET -> /api/cartsFS/:cid
GET -> /api/cartsFS/1
GET -> /api/cartsDB/:cid
GET -> /api/cartsDB/1

Devuelve el carrito con id 1

GET -> /api/cartsFS/1?totalItems=true
GET -> /api/cartsDB/1?totalItems=true

Devuelve el total de items en el carrito con id 1

POST -> /api/cartsFS
POST -> /api/cartsDB

Crea un carrito nuevo y devuelve el id

PUT -> /api/cartsFS/:cid/product/:pid/:units
PUT -> /api/cartsFS/1/product/1/3
PUT -> /api/cartsDB/:cid/product/:pid/:units
PUT -> /api/cartsDB/1/product/1/3

Agrega 3 unidades del producto con id 1 al carrito con id 1. No se pueden agregar mas productos de los que el producto tiene en stock

DELETE -> /api/cartsFS/:cid/product/:pid/:units
DELETE -> /api/cartsFS/1/product/1/3
DELETE -> /api/cartsDB/:cid/product/:pid/:units
DELETE -> /api/cartsDB/1/product/1/3

Quira 3 unidades del producto con id 1 desde carrito con id 1. Si se quitan todos los productos directamente lo quita del carrito
