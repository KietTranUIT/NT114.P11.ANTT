
document.getElementById('categoryButton').addEventListener('click', function() {
    const submenu = document.getElementById('submenuWrapper');
    
    // Kiểm tra trạng thái hiện tại và chuyển đổi
    if (submenu.style.display === 'grid') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'grid';
    }
});


// Đóng submenu khi click bên ngoài
document.addEventListener('click', function(event) {
    const submenu = document.getElementById('submenuWrapper');
    const button = document.getElementById('categoryButton');
    
    if (!button.contains(event.target) && !submenu.contains(event.target)) {
        submenu.style.display = 'none';
    }
});
