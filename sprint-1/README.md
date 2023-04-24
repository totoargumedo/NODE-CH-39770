# NODE-CH-39770

Repositorio de trabajo en clase de curso NodeJs Coderhouse

Cada carpeta es un proyecto de un Sprint o Desafío distinto.

Se utiliza ECMAScript Modules.

1- Inicializar proyecto node

npm init

npm init -y

2- Editar archivo package.json y agregar la siguiente linea

"type": "module",

Sprint 1 (Desafío 1)

Se crea clase ProductManager en el archivo ProductManager.js

Para utilizarla con Modules

import { ProductManager } from "./ProductManager.js";

Crear una instancia de la clase para poder utilizarla

const productos = new ProductManager

addProduct -> Guarda producto en memoria, le agrega un id de forma automatica, devuelve el producto agregado

productos.addProduct({
title: string,
description: string,
price: number,
thumbnail: string,
stock: number,
});

getProducts -> Devuelve productos guardados en memoria, si no hay productos devuelve el array vacio

productos.getProducts()

getProductById -> Devuelve el producto guardado en memoria con el id que se envia por argumento

productos.getProductById(id)
