import { actualizarStock } from "./stock.js";

//Funciones realizadas al clicar boton comprar
function handleAddToCart() {
  count++;
  cartCount.textContent = count;
  localStorage.setItem("cartCount", count);

  const productId = this.closest(".card-producto").getAttribute("id");
  console.log(productId);
  // Guardar el producto en el almacenamiento local
  const productElement = this.closest(".card-producto");
  const product = {
    id: productId,
    name: productElement.querySelector("h3").textContent,
    price: productElement.querySelector(".producto-precio").textContent,
    image: productElement.querySelector("img").src,
    unidad: productElement.querySelector(".producto-unidades").textContent,
    quantity: 1,
    totalAmount: 0
  };
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  // Restar la cantidad de unidades en stock
  const stockElement = productElement.querySelector(".producto-unidades");
  if (stockElement) {
    let stock = parseInt(stockElement.textContent);
    stock -= 1;
    stockElement.textContent = `${stock} ud.`;
    actualizarStock(productId, stock)
  } else {
    console.error("Elemento .producto-unidades no encontrado");
  }
}

///////////////////////////////////////////////////////////////////////////////////////

function handleRemoveFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productIndex = cart.findIndex(item => item.id === productId);

  if (productIndex !== -1) {
    let product = cart[productIndex];
    product.quantity -= 1;

    if (product.quantity === 0) {
      cart.splice(productIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Aumentar la cantidad de unidades en stock
    const productElement = document.getElementById(productId);
    if (productElement) {
      const stockElement = productElement.querySelector(".producto-unidades");
      if (stockElement) {
        let stock = parseInt(stockElement.textContent);
        stock += 1;
        stockElement.textContent = stock;
        actualizarStock(productId, stock)
      } else {
        console.error("Elemento .producto-unidades no encontrado");
      }
    } else {
      console.error("Elemento con id " + productId + " no encontrado");
    }

    // Actualizar el contador del carrito
    count--;
    cartCount.textContent = count;
    localStorage.setItem("cartCount", count);
  }
}

// CARRITO
// Incrementar el contador del carrito de compras
const cartCount = document.getElementById("cart-count");
let count = parseInt(localStorage.getItem("cartCount")) || 0;
cartCount.textContent = count;

// Redirigir a la página del carrito al hacer clic en el icono del carrito solo si el contador es mayor que 0
document.getElementById("cart-container").addEventListener("click", function () {
  if (count > 0) {
    window.location.href = "carrito.html";
  } else {
    alert("El carrito está vacío.");
  }
});

export { handleAddToCart, handleRemoveFromCart };