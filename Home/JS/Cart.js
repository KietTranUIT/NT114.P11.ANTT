// Function to update quantity and total
function updateQuantity(button, change) {
    const row = button.closest("tr");
    const quantitySpan = row.querySelector(".quantity span");
    const priceCell = row.cells[3];
    const totalCell = row.cells[5];

    let quantity = parseInt(quantitySpan.textContent);
    const price = parseInt(priceCell.textContent.replace("$", ""));

    // Update quantity (ensure it doesn't go below 1)
    quantity = Math.max(1, quantity + change);
    quantitySpan.textContent = quantity;

    // Update total for the row
    totalCell.textContent = `$${price * quantity}`;

    // Update subtotal
    updateSubtotal();
}

// Function to delete a row
function deleteRow(button) {
    const row = button.closest("tr");
    row.remove();
    updateSubtotal();
}

// Function to update subtotal
function updateSubtotal() {
    let subtotal = 0;
    const rows = document.querySelectorAll(".cart-table tbody tr");

    rows.forEach(row => {
        const totalCell = row.cells[5];
        subtotal += parseInt(totalCell.textContent.replace("$", ""));
    });

    document.getElementById("subtotal").textContent = `$${subtotal}`;
}
