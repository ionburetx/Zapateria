
    function handleAddToCart() {
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

    export { handleAddToCart };