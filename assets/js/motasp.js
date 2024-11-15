 // Hàm thay đổi ảnh chính khi nhấp vào ảnh thu nhỏ
 function changeImage(thumbnail) {
    const mainImage = document.getElementById("mainImage");
    mainImage.src = thumbnail.src; // Đổi nguồn ảnh chính thành nguồn ảnh thu nhỏ

    // Xóa class "active" khỏi tất cả các ảnh thu nhỏ
    document.querySelectorAll(".thumbnail-images img").forEach(img => {
        img.classList.remove("active");
    });

    // Thêm class "active" vào ảnh thu nhỏ được chọn
    thumbnail.classList.add("active");
}

// Hàm mở tab
function openTab(tabName) {
    // Ẩn tất cả các nội dung tab
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    // Ẩn tất cả các nút tab
    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    // Hiển thị nội dung tab được chọn
    document.getElementById(tabName).classList.add("active");
    document.querySelector(`button[onclick="openTab('${tabName}')"]`).classList.add("active");
}