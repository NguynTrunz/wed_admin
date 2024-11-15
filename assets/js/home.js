// chuyển trang section 5
document.querySelectorAll(".button-navi").forEach((button) => {
  button.addEventListener("click", () => {
    // Ẩn tất cả các danh sách
    document.querySelectorAll("[data-list]").forEach((list) => {
      list.classList.add("d-none"); // Ẩn phần tử
      list.classList.remove("fade-in"); // Loại bỏ hiệu ứng mờ dần
    });

    // Hiển thị danh sách mục tiêu
    const targetList = document.getElementById(
      button.getAttribute("data-target")
    );
    targetList.classList.remove("d-none"); // Hiển thị phần tử

    // Thêm lớp fade-in với một chút delay để tạo hiệu ứng mờ dần
    setTimeout(() => {
      targetList.classList.add("fade-in");
    }, 50); // Delay nhỏ để hiệu ứng mờ dần diễn ra
  });
});
// hiển thị nút khi đang ở trang section 5
document.querySelectorAll(".button-navi").forEach((button) => {
  button.addEventListener("click", () => {
    // Xóa lớp active khỏi tất cả các nút
    document.querySelectorAll(".button-navi").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Thêm lớp active cho nút hiện tại
    button.classList.add("active");

    // Ẩn tất cả các danh sách
    document.querySelectorAll("[data-list]").forEach((list) => {
      list.classList.add("d-none"); // Ẩn phần tử
      list.classList.remove("fade-in"); // Loại bỏ hiệu ứng mờ dần
    });

    // Hiển thị danh sách mục tiêu
    const targetList = document.getElementById(
      button.getAttribute("data-target")
    );
    targetList.classList.remove("d-none"); // Hiển thị phần tử

    // Kiểm tra nếu không phải là trang đầu tiên thì thêm hiệu ứng mờ dần
    if (targetList.id !== "page1") {
      setTimeout(() => {
        targetList.classList.add("fade-in");
      }, 50); // Delay nhỏ để hiệu ứng mờ dần diễn ra
    } else {
      targetList.classList.add("fade-in"); // Hiển thị sẵn trang đầu
    }
  });
});