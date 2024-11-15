function toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
}

// Đóng menu khi nhấp ra ngoài
window.onclick = function(event) {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (!event.target.matches('.dropdown-btn')) {
        dropdownMenu.style.display = "none";
    }
}