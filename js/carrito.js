import { actualizarStock } from "./stock.js";
import { leerStock } from "./stock.js";

document.addEventListener("DOMContentLoaded", function () {
  // Función para limpiar el carrito
  function clearCart() {
    localStorage.removeItem("cart");
    document.getElementById("cart-container").innerHTML = "";
    document.getElementById("total-amount").textContent = "0€";
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = "0";
    }
  }

  // Función para eliminar un producto del carrito
  function removeProductFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      let stock = parseInt(cart[productIndex].stock); // Obtener el stock antes de eliminar el producto
      cart.splice(productIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      actualizarStock(productId, stock);
      location.reload(); // Recargar la página para actualizar la vista del carrito
    }
  }

  // Función para actualizar el contador del carrito
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((count, product) => count + product.quantity, 0);
    localStorage.setItem("cartCount", cartCount);
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = cartCount;
    }
  }

  // Evento para el botón de finalizar compra
  const finalizePurchaseButton = document.getElementById("finalize-purchase");
  if (finalizePurchaseButton) {
    finalizePurchaseButton.addEventListener("click", function () {
      clearCart();
      alert("Compra finalizada. ¡Gracias por su compra!");
      window.location.href = "index.html"; // Redirigir a la página principal o a otra página
    });
  }

  // Evento para el botón de ver presupuesto
  const viewQuoteButton = document.getElementById("view-quote");
  if (viewQuoteButton) {
    viewQuoteButton.addEventListener("click", function () {
      const modal = document.getElementById("quote-modal");
      modal.style.display = "block";
    });
  }

  // Manejar el cierre del modal
  const modal = document.getElementById("quote-modal");
  const closeModal = document.querySelector(".close");
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Manejar el envío del formulario
  const quoteForm = document.getElementById("quote-form");
  quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const quoteWindow = window.open("", "Presupuesto", "width=800,height=600");
    quoteWindow.document.write("<html><head><title>Presupuesto</title>");
    quoteWindow.document.write("<link rel='stylesheet' type='text/css' href='./css/presupuesto.css'>");
    quoteWindow.document.write("<link rel='stylesheet' type='text/css' href='./css/print.css' media='print'>");
    quoteWindow.document.write("<meta name='viewport' content='width=device-width, initial-scale=1'>");
    quoteWindow.document.write("</head><body>");
    quoteWindow.document.write("<h1 class='titulo-presupuesto'>Presupuesto</h1>");
    quoteWindow.document.write(`<h2>Datos personales</h2>`);
    quoteWindow.document.write("<section class='datos-cliente'>");
    quoteWindow.document.write(`<p><strong>Nombre:</strong> ${name}</p>`);
    quoteWindow.document.write(`<p><strong>Apellido:</strong> ${surname}</p>`);
    quoteWindow.document.write(`<p><strong>Teléfono:</strong> ${phone}</p>`);
    quoteWindow.document.write(`<p><strong>Dirección:</strong> ${address}</p>`);
    quoteWindow.document.write("</section>");
    quoteWindow.document.write("<div id='quote-container' class='productos'><h2>Artículos</h2>");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(product => {
      const productTotal = parseFloat(product.price.replace("€", "")) * product.quantity;
      total += productTotal;

      quoteWindow.document.write(`
        <div class="quote-row">
          <div class="quote-image"><img src="${product.image}" alt="${product.name}"></div>
          <section class="quote-details">
            <div class="quote-name">${product.name}</div>
            <div class="quote-price"><strong>Precio unidad: </strong>${product.price}€</div>
            <div class="quote-quantity"><strong>Unidades: </strong>${product.quantity}</div>
            <div class="quote-total"><strong>Precio total: </strong>${productTotal.toFixed(2)}€</div>
          </section>
        </div>
      `);
    });

    quoteWindow.document.write("</div>");
    quoteWindow.document.write(`<div id='total-container'><strong>Total: ${total.toFixed(2)}€</strong></div>`);
    quoteWindow.document.write("<button onclick='window.print()' class='btn-primario'>Imprimir Presupuesto</button>");
    quoteWindow.document.write("</body></html>");
    quoteWindow.document.close();

    modal.style.display = "none";
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
    imageCell.appendChild(img);
    productRow.appendChild(imageCell);

    const nameCell = document.createElement("div");
    nameCell.textContent = product.name;
    productRow.appendChild(nameCell);

    const priceCell = document.createElement("div");
    priceCell.textContent = product.price;
    productRow.appendChild(priceCell);

    const quantityCell = document.createElement("div");
    quantityCell.classList.add("cantidad-container");

    // Botón de decremento
    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.classList.add("decrementar-cantidad");
    decrementButton.addEventListener("click", function () {
      if (product.quantity > 1) {
        product.quantity--;
        quantitySpan.textContent = product.quantity;
        let stock = leerStock(product.id, product.unidades);
        //stock = parseInt(product.stock);
        //stock -= 1;
        stock++;
        actualizarStock(product.id, stock);
        updateProductTotal(product, totalCell);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        updateTotalAmount();

      }
    });
    quantityCell.appendChild(decrementButton);

    // Span de cantidad
    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = product.quantity;
    quantitySpan.classList.add("producto-cantidad");
    quantityCell.appendChild(quantitySpan);

    // Botón de incremento
    const incrementButton = document.createElement("button");
    incrementButton.textContent = "+";
    incrementButton.classList.add("incrementar-cantidad");
    incrementButton.addEventListener("click", function () {
      product.quantity++;
      let stock = document.querySelector(".producto-unidades").textContent;
      stock--;  
      actualizarStock(product.id, stock);
      quantitySpan.textContent = product.quantity;
      updateProductTotal(product, totalCell);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      updateTotalAmount();
    });
    quantityCell.appendChild(incrementButton);

    productRow.appendChild(quantityCell);

    const totalCell = document.createElement("div");
    const productTotal = parseFloat(product.price.replace("€", "")) * product.quantity;
    totalCell.textContent = productTotal.toFixed(2) + "€";
    productRow.appendChild(totalCell);

    // Añadir botón de eliminar
    const deleteButton = document.createElement("div");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.addEventListener("click", function () {
      if (product.quantity > 1) {
        const quantityToRemove = parseInt(prompt(`¿Cuántas unidades de ${product.name} deseas eliminar?`, "1"));
        if (!isNaN(quantityToRemove) && quantityToRemove > 0 && quantityToRemove <= product.quantity) {
          product.quantity -= quantityToRemove;
          if (product.quantity === 0) {
            removeProductFromCart(product.id);
          } else {
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            location.reload(); // Recargar la página para actualizar la vista del carrito
          }
        } else {
          alert("Cantidad no válida.");
        }
      } else {
        removeProductFromCart(product.id);
      }
    });
    productRow.appendChild(deleteButton);

    cartContainer.appendChild(productRow);

    // Sumar al total
    total += productTotal;
  });

  // Evento para el botón de continuar comprando
  const continueShoppingButton = document.getElementById("continue-shopping");

  if (continueShoppingButton) {
    updateTotalAmount();
    continueShoppingButton.addEventListener("click", function () {
      window.location.href = "index.html"; // Redirigir a la página principal o a otra página de productos
    });
  }

  // Función para actualizar el total de un producto
  function updateProductTotal(product, totalCell) {
    const productTotal = parseFloat(product.price.replace("€", "")) * product.quantity;
    totalCell.textContent = productTotal.toFixed(2) + "€";
  }

  // Función para actualizar el total del carrito
  function updateTotalAmount() {
    let total = 0;
    cart.forEach(product => {
      const productTotal = parseFloat(product.price.replace("€", "")) * product.quantity;
      total += productTotal;
    });
    localStorage.setItem("totalAmount", total);
    totalAmount.textContent = total.toFixed(2) + "€";
  }

  // Añadir evento de clic para limpiar el carrito
  const clearCartButton = document.getElementById("clear-cart");
  if (clearCartButton) {
    clearCartButton.addEventListener("click", function () {
      clearCart();
    });
  }

  // Añadir evento de clic para imprimir el carrito
  const printCartButton = document.getElementById("print-cart");
  if (printCartButton) {
    printCartButton.addEventListener("click", function () {
      window.print();
    });
  }

  // Actualizar el contador del carrito al cargar la página
  updateCartCount();
});