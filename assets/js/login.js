// Hàm hiển thị thông báo tùy chỉnh
function showCustomToast(message, type) {
    const toast = document.createElement("div");
    toast.className = `custom-toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add("hide");
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Hàm cập nhật giao diện sau khi đăng nhập hoặc đăng ký thành công
function updateUIAfterLogin() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const savedUsername = localStorage.getItem("username");

    if (isLoggedIn && savedUsername) {
        // Ẩn các nút "Đăng nhập" và "Đăng ký"
        const loginButton = document.querySelector("[data-target='#login']");
        const signUpButton = document.querySelector("[data-target='#sign']");
        if (loginButton) loginButton.style.display = "none";
        if (signUpButton) signUpButton.style.display = "none";

        // Hiển thị tên người dùng và nút đăng xuất
        const userAccount = document.getElementById("userAccount");
        if (userAccount) {
            userAccount.style.display = "inline-block";
            document.getElementById("usernameDisplay").innerText = savedUsername;
        }
    }
}

// Hàm xử lý đăng nhập
function validateLoginForm(event) {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const usernameError = document.getElementById("loginUsernameError");

    // Kiểm tra tính hợp lệ của username và password
    if (username.length < 4) {
        usernameError.style.display = "block";
        return;
    } else {
        usernameError.style.display = "none";
    }

    if (password.length < 6) {
        showCustomToast("Mật khẩu phải có ít nhất 6 ký tự.", "error");
        return;
    }

    // Đóng modal đăng nhập
    $("#login").modal("hide");

    // Lưu trạng thái đăng nhập vào localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);

    // Cập nhật giao diện sau khi đăng nhập thành công
    updateUIAfterLogin();
    showCustomToast("Đăng nhập thành công!", "success");
}

// Hàm xử lý đăng ký
function validateRegisterForm(event) {
    event.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const username = email.split("@")[0]; // Giả sử tên tài khoản là phần trước dấu '@'
    const password1 = document.getElementById("registerPassword1").value;
    const password2 = document.getElementById("registerPassword2").value;
    const termsCheckbox = document.getElementById("termsCheckbox");
    const emailError = document.getElementById("registerEmailError");
    const passwordError = document.getElementById("passwordError");
    const termsError = document.getElementById("termsError");

    if (!email.includes("@")) {
        emailError.style.display = "block";
        return;
    } else {
        emailError.style.display = "none";
    }

    if (password1 !== password2) {
        passwordError.style.display = "block";
        return;
    } else {
        passwordError.style.display = "none";
    }

    if (!termsCheckbox.checked) {
        termsError.style.display = "block";
        return;
    } else {
        termsError.style.display = "none";
    }

    $("#sign").modal("hide"); // Đóng modal đăng ký

    // Lưu trạng thái đăng nhập vào localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);

    updateUIAfterLogin(); // Cập nhật giao diện sau khi đăng ký thành công
    showCustomToast("Đăng ký thành công!", "success");
}

// Hàm xử lý đăng xuất
function logout() {
    // Xóa trạng thái đăng nhập khỏi localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    // Hiển thị lại các nút "Đăng nhập" và "Đăng ký"
    const loginButton = document.querySelector("[data-target='#login']");
    const signUpButton = document.querySelector("[data-target='#sign']");
    if (loginButton) loginButton.style.display = "inline-block";
    if (signUpButton) signUpButton.style.display = "inline-block";

    // Ẩn tên người dùng và nút đăng xuất
    const userAccount = document.getElementById("userAccount");
    if (userAccount) userAccount.style.display = "none";

    showCustomToast("Đã đăng xuất thành công!", "success");
}

// Đăng ký sự kiện cho form đăng nhập, đăng ký và nút đăng xuất
document.addEventListener("DOMContentLoaded", function () {
    // Kiểm tra trạng thái đăng nhập khi trang tải
    updateUIAfterLogin();

    // Thêm sự kiện cho form đăng nhập
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", validateLoginForm);
    }

    // Thêm sự kiện cho form đăng ký
    const registerForm = document.querySelector("#sign form");
    if (registerForm) {
        registerForm.addEventListener("submit", validateRegisterForm);
    }

    // Thêm sự kiện cho nút đăng xuất
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});

// Toggle hiển thị mật khẩu
function togglePasswordVisibility(passwordId) {
    const passwordInput = document.getElementById(passwordId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}
