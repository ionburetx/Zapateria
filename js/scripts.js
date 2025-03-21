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

// CARRITO
  // Incrementar el contador del carrito de compras
  const cartCount = document.getElementById("cart-count");
  let count = parseInt(localStorage.getItem("cartCount")) || 0;
  cartCount.textContent = count;

  const buyButtons = document.querySelectorAll(".btn-primario");
  buyButtons.forEach(button => {
    button.addEventListener("click", function () {
      count++;
      cartCount.textContent = count;
      localStorage.setItem("cartCount", count);

      const productId = this.closest(".card-producto").getAttribute("id");  
      console.log(productId);
      // Guardar el producto en el almacenamiento local
      const product = {
        id: productId,
        name: this.closest(".card-producto").querySelector("h3").textContent,
        price: this.closest(".card-producto").querySelector(".producto-precio").textContent,
        image: this.closest(".card-producto").querySelector("img").src,
        quantity: 1
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let existingProduct = cart.find(item => item.id === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
  // Redirigir a la página del carrito al hacer clic en el icono del carrito solo si el contador es mayor que 0
  document.getElementById("cart-container").addEventListener("click", function () {
    if (count > 0) {
      window.location.href = "carrito.html";
    } else {
      alert("El carrito está vacío.");
    }
  });

    // Aplica los filtros después de generar las tarjetas
    applyFilters();
  }
  
  
  // Función para filtrar las tarjetas
  function filterCards(filter) {
    const cards = document.querySelectorAll(".card-producto");
    cards.forEach(card => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block"; // Muestra las tarjetas que coinciden
      } else {
        card.style.display = "none"; // Oculta las tarjetas que no coinciden
      }
    });
  }

  // Añade eventos a los enlaces del menú
  function applyFilters() {
    const menuLinks = document.querySelectorAll(".submenu a");
    menuLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Evita que el enlace recargue la página
        const filterId = this.getAttribute("data-filter"); // Obtén el filtro del enlace
        filterCards(filterId); // Llama a la función de filtrado
        closeMenu(); // Cierra el menú después de hacer clic en un enlace
      });
    });

    // Añade evento al filtro todos
    const showAllLink = document.querySelector(".submenu-todos");
    showAllLink.addEventListener("click", function (e) {
        e.preventDefault(); // Evita que el enlace recargue la página
        const filterId = this.getAttribute("data-filter"); // Obtén el filtro del enlace
        filterCards(filterId); // Llama a la función de filtrado
        closeMenu(); // Cierra el menú después de hacer clic en un enlace
      });
  }


  // Función para cerrar y abrir el menú
  function closeMenu() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
  function openMenu() {
      document.getElementById("menu").style.display = "block";
      document.getElementById("overlay").style.display = "block";
    }

  document.getElementById("closeMenuButton").addEventListener("click", closeMenu);
  document.getElementById("openMenuButton").addEventListener("click", openMenu);
  document.getElementById("overlay").addEventListener("click", closeMenu);





  
});

