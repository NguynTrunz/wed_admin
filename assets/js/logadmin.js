// Kiểm tra trạng thái đăng nhập khi tải trang đăng nhập
if (sessionStorage.getItem("loggedIn") === "true") {
    window.location.href = "adfunc.html"; // Chuyển hướng tới trang admin nếu đã đăng nhập
}

// Xử lý sự kiện khi submit form đăng nhập
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Tài khoản đúng
    const validUsername = "admin";
    const validPassword = "admin123";

    // Lấy giá trị nhập vào từ form
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Kiểm tra thông tin đăng nhập
    if (username === validUsername && password === validPassword) {
        // Lưu trạng thái đăng nhập
        sessionStorage.setItem("loggedIn", "true");
        // Chuyển hướng tới trang admin
        window.location.href = "adfunc.html"; // Thay đổi link tới trang bạn mong muốn
    } else {
        // Xóa mật khẩu để người dùng nhập lại
        document.getElementById("loginPassword").value = "";
        alert("Tên đăng nhập hoặc mật khẩu không chính xác!"); // Hiển thị thông báo lỗi
    }
});

// Thêm sự kiện đăng xuất trên trang admin
function handleLogout() {
    sessionStorage.removeItem("loggedIn"); // Xóa trạng thái đăng nhập
    window.location.href = "index.html"; // Quay lại trang đăng nhập
}

// Kiểm tra trạng thái khi vào trang admin
function checkAdminAccess() {
    if (sessionStorage.getItem("loggedIn") !== "true") {
        alert("Bạn cần đăng nhập để truy cập!");
        window.location.href = "index.html"; // Quay lại trang đăng nhập nếu chưa đăng nhập
    }
}
