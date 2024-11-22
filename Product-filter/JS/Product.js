const pagination = document.getElementById("pagination");
const pages = pagination.querySelectorAll(".page");
const prevBtn = pagination.querySelector(".prev");
const nextBtn = pagination.querySelector(".next");
const content = document.getElementById("content");

let currentPage = 4; // Trang hiện tại (bắt đầu từ 4 như trong ví dụ HTML)

// Hàm cập nhật giao diện và nội dung
function updatePagination() {
  // Cập nhật giao diện active
  pages.forEach((page, index) => {
    if (parseInt(page.textContent) === currentPage) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  });

  // Cập nhật nội dung hiển thị
  content.textContent = `Content for page ${currentPage}`;

  // Vô hiệu hóa nút "prev" nếu ở trang đầu tiên và "next" nếu ở trang cuối
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === pages.length;
}

// Lắng nghe sự kiện nhấp vào các trang
pages.forEach((page) => {
  page.addEventListener("click", () => {
    currentPage = parseInt(page.textContent); // Cập nhật trang hiện tại
    updatePagination(); // Cập nhật giao diện và nội dung
  });
});

// Lắng nghe sự kiện nhấp vào nút "Prev"
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--; // Lùi về trang trước
    updatePagination();
  }
});

// Lắng nghe sự kiện nhấp vào nút "Next"
nextBtn.addEventListener("click", () => {
  if (currentPage < pages.length) {
    currentPage++; // Chuyển sang trang kế tiếp
    updatePagination();
  }
});

// Gọi hàm để thiết lập ban đầu
updatePagination();
