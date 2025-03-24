  // Función para mostrar los productos que recorre los datos del JSON 
  // y genere dinámicamente el HTML para cada producto.
  import { mostrarProductos } from "./cards.js";

  

document.addEventListener("DOMContentLoaded", function () {

  // CARCAR ARCHIVO JSON. 
  // El método fetch permite cargar el archivo JSON de forma asincrona.
  fetch("assets/data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json(); // Convierte la respuesta a JSON
    })
    .then(data => {
      console.log(data); // Verifica que los datos se carguen correctamente
      mostrarProductos(data.zapatillas); // Llama a la función para mostrar los productos
    })
    .catch(error => {
      console.error("Error:", error);
    });


  });  

