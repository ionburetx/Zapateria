document.addEventListener("DOMContentLoaded", function () {
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

function agregarAlCarrito(product) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let productoExistente = carrito.find(item => item.id === product.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        product.cantidad = 1;
        carrito.push(product);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let carritoHTML = '';

    carrito.forEach(producto => {
        carritoHTML += `
            <div class="producto">
                <span>${product.nombre}</span>
                <span>Cantidad: ${product.cantidad}</span>
            </div>
        `;
    });

    document.getElementById('carrito').innerHTML = carritoHTML;
}