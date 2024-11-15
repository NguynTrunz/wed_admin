document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Tài khoản đúng
    const validUsername = "admin";
    const validPassword = "admin123";

    // Lấy giá trị nhập vào
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Kiểm tra thông tin đăng nhập
    if (username === validUsername && password === validPassword) {
        // Chuyển hướng tới trang khác
        window.location.href = "/adfunc.html"; // Thay đổi link tới trang bạn mong muốn
    } else {
        // Xóa mật khẩu để người dùng nhập lại
        document.getElementById("loginPassword").value = "";
    }
});
