import { applyFilters } from "./menu.js";
import { handleAddToCart } from "./icono-carrito.js";

  // Función para mostrar los productos que recorre los datos del JSON 
  // y genere dinámicamente el HTML para cada producto.
  function mostrarProductos(zapatillas) {
    const contenedorProductos = document.querySelector(".productos"); // Selecciona el contenedor donde se mostrarán los productos
    contenedorProductos.innerHTML = ""; // Limpia el contenedor antes de insertar nuevos productos

    zapatillas.forEach(categoria => {
      categoria.productos.forEach(producto => {
        // Crea el HTML para cada producto
        const productoHTML = `
          <article class="card-producto ${categoria.categoria}-${categoria.subcategoria}" id="${producto.id}">
            <header class="header-producto">
              <img src="${producto.imagen}" alt="${producto.titulo}" class="img-producto">
              <section>
                <button class="btn-secundario"><i class="fas fa-heart"></i></button>
              </section>
            </header>
            <main class="main-producto">
              <h3>${producto.titulo}</h3>
              <p>${producto.descripcion}</p>
              <section class="precio-producto-unidades">
                <section class="precio-tachado-final">
                  <p class="producto-precio-tachado">${producto.precioAnterior}€</p>
                  <p class="producto-precio">${producto.precioActual}</p>
                </section>
                <section class="tallas-unidades">
                  <select class="producto-tallas">
                    ${producto.tallas.map(talla => `<option>${talla}</option>`).join("")}
                  </select>
                  <p class="producto-unidades">${producto.unidades} ud.</p>
                </section>
              </section>
            </main>
            <footer class="main-producto">
              <button class="btn-primario">Comprar</button>
            </footer>
          </article>
        `;

        // Inserta el producto en el contenedor
        contenedorProductos.innerHTML += productoHTML;
      });
      
    });
    
    

    //FAVORITOS
    //Array para almacenar los favoritos
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    //Asigna eventos a los botones favoritos después de generar las tarjetas
    //Marcar el botón del corazón cuando se le hace click
    // Selecciona todos los botones con la clase btn-secundario
    const secondaryButtons = document.querySelectorAll(".btn-secundario");

    secondaryButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Alterna la clase "marked" en el botón clicado
            this.classList.toggle("marked");

        //Obtén el producto relacionado con el botón
        const card = this.closest(".card-producto");
        const productId = card.getAttribute("id");
        const product = {
            id: productId,
            name: card.querySelector("h3").textContent,
            price: card.querySelector(".producto-precio").textContent,
            image: card.querySelector("img").src
        };

        // Verifica si el producto ya está en favoritos
        const index = favoritos.findIndex(item => item.id === productId);
        if (index === -1) {
            // Si no está en favoritos, lo añade
            favoritos.push(product);
        } else {
            // Si ya está en favoritos, lo elimina
            favoritos.splice(index, 1);
        }

        // Actualiza el localStorage
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        });
    });
    //Función para renderizar los productos favoritos en una sección
    function mostrarFavoritos() {
      // Selecciona el contenedor de favoritos
      const contenedorFavoritos = document.querySelector(".favoritos"); 
      // Limpia el contenedor antes de insertar nuevos productos
      contenedorFavoritos.innerHTML = ""; 

      const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  
      if (favoritos.length === 0) {
          contenedorFavoritos.innerHTML = "<p>No tienes productos favoritos.</p>";
          return;
      }
  
      favoritos.forEach(producto => {
          const productoHTML = `
              <article class="card-producto" id="${producto.id}">
                  <header class="header-producto">
                      <img src="${producto.image}" alt="${producto.name}" class="img-producto">
                  </header>
                  <main class="main-producto">
                      <h3>${producto.name}</h3>
                      <p>${producto.price}</p>
                  </main>
              </article>
          `;
          contenedorFavoritos.innerHTML += productoHTML;
      });

      


      // Desplázate automáticamente al contenedor de favoritos
      contenedorFavoritos.scrollIntoView({ behavior: "smooth" });
  }


  const buyButtons = document.querySelectorAll(".btn-primario");
  buyButtons.forEach(button => {
    button.addEventListener("click", handleAddToCart);
    console.log("click");
  });



    // Aplica los filtros después de generar las tarjetas
    applyFilters();
  }

 

export { mostrarProductos };