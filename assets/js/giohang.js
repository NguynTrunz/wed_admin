// Lấy tất cả các nút xóa
const removeButtons = document.querySelectorAll(".remove-btn");

removeButtons.forEach(button => {
    button.addEventListener("click", function() {
        // Lấy dòng cha của nút xóa (tr là dòng sản phẩm)
        const row = this.closest("tr");
        
        // Xóa dòng sản phẩm khỏi bảng
        row.remove();

        // Cập nhật tổng giỏ hàng sau khi xóa sản phẩm
        updateCartTotal();
    });
});

// Hàm cập nhật tổng giỏ hàng
function updateCartTotal(discountPercentage = 0) {
    let subtotal = 0;

    // Lấy tất cả các dòng sản phẩm
    const rows = document.querySelectorAll(".cart-table tbody tr");

    rows.forEach(row => {
        // Lấy giá trị tổng phụ từ mỗi dòng sản phẩm
        const priceElement = row.querySelector("td:last-child");
        const price = parseFloat(priceElement.textContent.replace("đ", "").replace(/\./g, ""));
        
        subtotal += price;
    });

    // Áp dụng giảm giá (nếu có)
    const discountAmount = subtotal * (discountPercentage / 100);
    const total = subtotal - discountAmount;

    // Cập nhật hiển thị cho tổng phụ và tổng cộng
    document.querySelector(".subtotal .price").textContent = `${formatCurrency(subtotal)}đ`;
    document.querySelector(".total .price").textContent = `${formatCurrency(total)}đ`;
}

// Hàm định dạng tiền tệ cho VND (ví dụ: 330000 thành 330.000)
function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Hàm áp dụng mã giảm giá
function applyDiscount() {
    const couponCode = document.getElementById("couponCode").value.trim().toLowerCase();
    const discountMessage = document.getElementById("discountMessage");
    let discountPercentage = 0;

    // Xóa lớp thông báo lỗi
    discountMessage.classList.remove("error");

    // Kiểm tra mã giảm giá
    if (couponCode === "nhat-anh-gay") {
        discountPercentage = 100;
        discountMessage.textContent = `Mã giảm giá "${couponCode}" đã được áp dụng! Giảm ${discountPercentage}%.`;
    } else if (couponCode === "fiberico") {
        discountPercentage = 20;
        discountMessage.textContent = `Mã giảm giá "${couponCode}" đã được áp dụng! Giảm ${discountPercentage}%.`;
    } else {
        discountMessage.textContent = "Mã giảm giá không hợp lệ.";
        discountMessage.classList.add("error"); // Thêm lớp lỗi
        discountPercentage = 0; // Đặt giảm giá thành 0 nếu mã không hợp lệ
    }

    // Áp dụng mã giảm giá và cập nhật tổng giỏ hàng
    updateCartTotal(discountPercentage);
}

// Khởi tạo tổng giỏ hàng khi tải trang
updateCartTotal();
