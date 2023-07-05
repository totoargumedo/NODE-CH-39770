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

4- Endpoints Productos

GET -> /api/products
Devuelve todos los productos cargados en DB

GET -> /api/products?page=1&limit=10$title=sable
Puede recibir las siguientes queries para paginar, page para indicar en que pagina esta (default es 1) y debe mostrar, y tambien limit para mostrar un numero limitado de resultados (default 6).
Tambien recibe query y devuelve los objetos que incluyan el string buscado en el campo title, no distingue entre minusculas y mayusculas

GET -> /api/products?page=1&limit=10&title=Luke
Tambien puede recibir query de busqueda utilizando title, no filtra por mayus y minus y devuelve los resultados que incluyan lo buscado en el campo title

GET -> /api/products/:pid
GET -> /api/products/1
Devuelve el producto con id 1

POST -> /api/products
Crea un producto nuevo, devuelve el id del producto, recibe objetos en JSON con el siguiente formato
{title: String, description: String, price: Number, code: String-unique, thumbnail: String, stock: Number}

PUT -> /api/products/:pid
PUT -> /api/products/64874ecf7ac94944740664a1

Modifica un producto existe con id 1 o 64874ecf7ac94944740664a1, recibe un objeto con las siguientes propiedades {title: String, description: String, price: Number, code: String-unique, thumbnail: String, stock: Number}

DELETE -> /api/products/:pid
DELETE -> /api/products/64874ecf7ac94944740664a1
Elimina el producto con id 64874ecf7ac94944740664a1

5- Endpoints Carritos

GET -> /api/carts
Devuelve todos los carritos cargados

GET -> /api/carts/:cid
GET -> /api/carts/1
Devuelve el carrito con id 1 junto con los productos cargados

POST -> /api/carts
Crea un carrito nuevo y devuelve el id

PUT -> /api/carts/:cid/product/:pid/:units
PUT -> /api/carts/1/product/1/3
Agrega 3 unidades del producto con id 1 al carrito con id 1. No se pueden agregar mas productos de los que el producto tiene en stock, se restan del stock de producto

DELETE -> /api/carts/:cid/product/:pid/:units
DELETE -> /api/carts/1/product/1/3
Quita 3 unidades del producto con id 1 desde carrito con id 1. Si se quitan todos los productos directamente lo quita del carrito, devuelve los productos al stock

GET -> /api/carts/bills/:cid
GET -> /api/carts/bills/1
Devuelve el costo total de lo que esta cargado en el carrito con id 1
