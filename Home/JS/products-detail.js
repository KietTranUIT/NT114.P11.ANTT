const minusBtn = document.querySelector('.quantity-btn.minus');
const plusBtn = document.querySelector('.quantity-btn.plus');
const quantityInput = document.querySelector('#quantity-input');

minusBtn.addEventListener('click', () => {
  let currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
});

plusBtn.addEventListener('click', () => {
  let currentValue = parseInt(quantityInput.value);
  quantityInput.value = currentValue + 1;
});



// Change images

function changeImage(newImageSrc) {
  const mainImage = document.getElementById("mainImage");

  // Nếu ảnh hiện tại đã là ảnh được chọn, không làm gì
  if (mainImage.src.includes(newImageSrc)) {
      return;
  }

  // Thêm lớp animation trượt ra cho ảnh hiện tại
  mainImage.style.animation = "slide-out-left 0.2s ease-in-out";

  // Lắng nghe sự kiện khi animation kết thúc
  mainImage.addEventListener(
      "animationend",
      () => {
          // Thay đổi ảnh khi animation trượt ra hoàn tất
          mainImage.src = newImageSrc;

          // Thêm animation trượt vào cho ảnh mới
          mainImage.style.animation = "slide-left 0.2s ease-in-out";
      },
      { once: true } // Đảm bảo sự kiện chỉ được lắng nghe một lần
  );

  // Xóa class "active" khỏi tất cả các hình nhỏ
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumbnail) => thumbnail.classList.remove("active"));

  // Thêm class "active" vào hình nhỏ được chọn
  const selectedThumbnail = Array.from(thumbnails).find((thumbnail) =>
      thumbnail.src.includes(newImageSrc.split("-large")[0])
  );
  if (selectedThumbnail) {
      selectedThumbnail.classList.add("active");
  }
}











// description
document.addEventListener("DOMContentLoaded", () => {
  const menuTabs = document.querySelectorAll('.menu-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      menuTabs.forEach(t => t.classList.remove('active'));

      // Hide all content
      tabContents.forEach(content => content.classList.add('hidden'));

      // Activate clicked tab and show corresponding content
      const target = tab.getAttribute('data-target');
      document.getElementById(target).classList.remove('hidden');
      tab.classList.add('active');
    });
  });
});


