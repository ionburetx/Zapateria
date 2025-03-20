document.addEventListener("DOMContentLoaded", function () {
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
  const menuLinks = document.querySelectorAll(".submenu a");
  menuLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Evita que el enlace recargue la página
      const filterId = this.getAttribute("data-filter"); // Obtén el filtro del enlace
      filterCards(filterId); // Llama a la función de filtrado
    });

    // Añade evento al filtro todos
    const showAllLink = document.querySelector(".submenu-todos");
    showAllLink.addEventListener("click", function (e) {
      e.preventDefault(); // Evita que el enlace recargue la página
      const filterId = this.getAttribute("data-filter"); // Obtén el filtro del enlace
      filterCards(filterId); // Llama a la función de filtrado
    });
  });


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
      //console.log(productId);
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
});

