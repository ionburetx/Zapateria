document.addEventListener("DOMContentLoaded", function () {
  // Función para filtrar las tarjetas
  function filterCards(filter) {
    const cards = document.querySelectorAll(".card");
    console.log(cards);
    cards.forEach(card => {
      if (card.classList.contains(filter)) {
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
      const filter = this.getAttribute("data-filter"); // Obtén el filtro del enlace
      filterCards(filter); // Llama a la función de filtrado
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

});