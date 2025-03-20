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
    });
  
    // Añade evento al filtro todos
    const showAllLink = document.querySelector(".submenu-todos");
    if (showAllLink) {
      showAllLink.addEventListener("click", function (e) {
        e.preventDefault(); // Evita que el enlace recargue la página
        const filterId = this.getAttribute("data-filter"); // Obtén el filtro del enlace
        filterCards(filterId); // Llama a la función de filtrado
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
  
    // Incrementar el contador del carrito de compras
    const cartCount = document.getElementById("cart-count");
    let count = 0;
  
    const buyButtons = document.querySelectorAll(".btn-primario");
    buyButtons.forEach(button => {
      button.addEventListener("click", function () {
        count++;
        cartCount.textContent = count;
  
        // Guardar el producto en el almacenamiento local
        const product = {
          name: this.closest(".card-producto").querySelector("h3").textContent,
          price: this.closest(".card-producto").querySelector(".producto-precio").textContent,
          image: this.closest(".card-producto").querySelector("img").src,
          quantity: 1
        };
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
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
  
    // Mostrar los productos en el carrito
    const cartContainer = document.querySelector("#cart-container");
    const totalAmount = document.getElementById("total-amount");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
  
    cart.forEach(product => {
      const productRow = document.createElement("div");
      productRow.classList.add("cart-row");
  
      const imageCell = document.createElement("div");
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.style.width = "50px"; // Ajusta el tamaño de la imagen según sea necesario
      imageCell.appendChild(img);
      productRow.appendChild(imageCell);
  
      const nameCell = document.createElement("div");
      nameCell.textContent = product.name;
      productRow.appendChild(nameCell);
  
      const priceCell = document.createElement("div");
      priceCell.textContent = product.price;
      productRow.appendChild(priceCell);
  
      const quantityCell = document.createElement("div");
      quantityCell.textContent = product.quantity;
      productRow.appendChild(quantityCell);
  
      const totalCell = document.createElement("div");
      const productTotal = parseFloat(product.price.replace("€", "")) * product.quantity;
      totalCell.textContent = productTotal.toFixed(2) + "€";
      productRow.appendChild(totalCell);
  
      cartContainer.appendChild(productRow);
  
      // Sumar al total
      total += productTotal;
    });
  
    // Mostrar el total
    totalAmount.textContent = total.toFixed(2) + "€";
  
    // Añadir evento de clic para limpiar el carrito
    document.getElementById("clear-cart").addEventListener("click", function () {
      localStorage.clear();
      cartContainer.innerHTML = ""; // Limpiar la tabla del carrito
      totalAmount.textContent = "0€"; // Reiniciar el total
    });
  
    // Añadir evento de clic para imprimir el carrito
    document.getElementById("print-cart").addEventListener("click", function () {
      window.print();
    });
  });