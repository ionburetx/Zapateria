document.addEventListener("DOMContentLoaded", function () {
    const quoteContainer = document.getElementById("quote-container");
    const totalAmount = document.getElementById("total-amount");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(product => {
        const productRow = document.createElement("div");
        productRow.classList.add("quote-row");

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

        quoteContainer.appendChild(productRow);

        // Sumar al total
        total += productTotal;
    });

    // Mostrar el total
    totalAmount.textContent = total.toFixed(2) + "€";
});