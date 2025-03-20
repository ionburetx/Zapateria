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
    localStorage.clear();

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
  document.getElementById("view-quote").addEventListener("click", function () {
    const quoteWindow = window.open("", "Presupuesto", "width=800,height=600");
    quoteWindow.document.write("<html><head><title>Presupuesto</title>");
    quoteWindow.document.write("<link rel='stylesheet' type='text/css' href='css/styles.css'>");
    quoteWindow.document.write("</head><body>");
    quoteWindow.document.write("<h1>Presupuesto</h1>");
    quoteWindow.document.write("<div id='quote-container' class='productos'>");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(product => {
      const productTotal = parseFloat(product.price.replace("€", "")) * product.quantity;
      total += productTotal;

      quoteWindow.document.write(`
        <div class="quote-row">
          <div class="quote-image"><img src="${product.image}" alt="${product.name}" style="width: 50px;"></div>
          <div class="quote-name">${product.name}</div>
          <div class="quote-price">${product.price}</div>
          <div class="quote-quantity">${product.quantity}</div>
          <div class="quote-total">${productTotal.toFixed(2)}€</div>
        </div>
      `);
    });

    quoteWindow.document.write("</div>");
    quoteWindow.document.write(`<div id='total-container'><strong>Total: ${total.toFixed(2)}€</strong></div>`);
    quoteWindow.document.write("<button onclick='window.print()'>Imprimir Presupuesto</button>");
    quoteWindow.document.write("</body></html>");
    quoteWindow.document.close();
  });

  // Evento para el botón de continuar comprando
  document.getElementById("continue-shopping").addEventListener("click", function () {
    window.location.href = "index.html"; // Redirigir a la página principal o a otra página de productos
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