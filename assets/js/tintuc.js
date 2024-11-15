document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 8; // Số bài báo mỗi trang
    const articles = Array.from(document.querySelectorAll(".tin-tuc .box")); // Lấy tất cả các box bài báo
    const totalPages = Math.ceil(articles.length / itemsPerPage); // Tổng số trang

    let currentPage = 1;

    // Hàm hiển thị các bài báo theo trang
    function displayPage(page) {
        // Ẩn tất cả các bài báo trước
        articles.forEach(article => article.style.display = "none");

        // Tính toán các bài cần hiển thị
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = articles.slice(start, end);

        // Hiển thị các bài báo trong khoảng của trang hiện tại
        pageItems.forEach(article => article.style.display = "block");
    }

    // Hàm tạo nút phân trang
    function setupPagination() {
        const paginationContainer = document.createElement("div");
        paginationContainer.classList.add("pagination");
        document.querySelector(".tin-tuc").appendChild(paginationContainer);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.innerText = i;
            pageButton.classList.add("page-button");
            if (i === currentPage) pageButton.classList.add("active");

            pageButton.addEventListener("click", function () {
                currentPage = i;
                displayPage(currentPage);
                document.querySelectorAll(".page-button").forEach(btn => btn.classList.remove("active"));
                pageButton.classList.add("active");
            });

            paginationContainer.appendChild(pageButton);
        }
    }

    // Gọi hàm để hiển thị trang đầu tiên và tạo phân trang
    displayPage(currentPage);
    setupPagination();
});