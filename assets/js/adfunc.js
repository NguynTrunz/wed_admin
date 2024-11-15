$(document).ready(function () {
  // Đảm bảo chuyển đổi tab mượt mà
  $("#adminTab a").on("click", function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

// Quản lý người dùng

let userIdCounter = 3; // Bắt đầu từ 3 để không trùng với người dùng mẫu

function addUser() {
  // Lấy giá trị từ các ô nhập liệu
  const name = document.getElementById("newUserName").value;
  const email = document.getElementById("newUserEmail").value;
  const phone = document.getElementById("newUserPhone").value; // Lấy số điện thoại
  const status = document.getElementById("newUserStatus").value;

  if (name && email && phone) {
    // Tạo một hàng mới trong bảng
    const tableBody = document.getElementById("userTableBody");
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${userIdCounter++}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td> <!-- Hiển thị số điện thoại -->
            <td>${status}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editUser(this)">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(this)">Xóa</button>
                <button class="btn ${
                  status === "Hoạt động" ? "btn-warning" : "btn-success"
                } btn-sm" onclick="toggleBlockUser(this)">
                    ${status === "Hoạt động" ? "Khóa" : "Bỏ khóa"}
                </button>
            </td>
        `;
    tableBody.appendChild(row);

    // Xóa dữ liệu trong các ô nhập liệu sau khi thêm người dùng
    document.getElementById("newUserName").value = "";
    document.getElementById("newUserEmail").value = "";
    document.getElementById("newUserPhone").value = ""; // Xóa trường Số điện thoại
    document.getElementById("newUserStatus").value = "Hoạt động";
  } else {
    alert("Vui lòng điền đầy đủ thông tin!");
  }
}

function editUser(button) {
  const row = button.closest("tr");
  const nameCell = row.cells[1];
  const emailCell = row.cells[2];
  const phoneCell = row.cells[3]; // Ô Số điện thoại
  const statusCell = row.cells[4];

  if (button.innerText === "Sửa") {
    // Đổi tên, email và số điện thoại thành ô nhập liệu
    const name = nameCell.innerText;
    const email = emailCell.innerText;
    const phone = phoneCell.innerText;
    const status = statusCell.innerText;

    nameCell.innerHTML = `<input type="text" class="form-control" value="${name}">`;
    emailCell.innerHTML = `<input type="email" class="form-control" value="${email}">`;
    phoneCell.innerHTML = `<input type="text" class="form-control" value="${phone}">`;

    // Chuyển đổi trạng thái thành dropdown để chọn
    statusCell.innerHTML = `
            <select class="form-control">
                <option value="Hoạt động" ${
                  status === "Hoạt động" ? "selected" : ""
                }>Hoạt động</option>
                <option value="Đã khóa" ${
                  status === "Đã khóa" ? "selected" : ""
                }>Đã khóa</option>
            </select>
        `;

    // Đổi nút "Sửa" thành "Lưu"
    button.innerText = "Lưu";
    button.classList.remove("btn-primary");
    button.classList.add("btn-success");
  } else {
    // Lấy lại giá trị từ các ô nhập liệu
    const newName = nameCell.querySelector("input").value;
    const newEmail = emailCell.querySelector("input").value;
    const newPhone = phoneCell.querySelector("input").value;
    const newStatus = statusCell.querySelector("select").value;

    // Cập nhật các giá trị mới vào bảng
    nameCell.innerText = newName;
    emailCell.innerText = newEmail;
    phoneCell.innerText = newPhone;
    statusCell.innerText = newStatus;

    // Thêm hoặc xóa lớp `blocked` dựa trên trạng thái
    if (newStatus === "Đã khóa") {
      nameCell.classList.add("blocked");
      emailCell.classList.add("blocked");
      phoneCell.classList.add("blocked");
    } else {
      nameCell.classList.remove("blocked");
      emailCell.classList.remove("blocked");
      phoneCell.classList.remove("blocked");
    }

    // Đổi nút "Lưu" trở lại thành "Sửa"
    button.innerText = "Sửa";
    button.classList.remove("btn-success");
    button.classList.add("btn-primary");
  }
}

function toggleBlockUser(button) {
  const row = button.closest("tr");
  const statusCell = row.cells[4]; // Cột "Trạng thái"
  const nameCell = row.cells[1]; // Cột "Tên"
  const emailCell = row.cells[2]; // Cột "Email"
  const phoneCell = row.cells[3]; // Cột "Số điện thoại"

  if (statusCell.innerText === "Hoạt động") {
    // Chuyển trạng thái thành "Đã khóa"
    statusCell.innerText = "Đã khóa";
    button.innerText = "Bỏ khóa";
    button.classList.remove("btn-warning");
    button.classList.add("btn-success");

    // Thêm lớp gạch đỏ cho tên, email, và số điện thoại
    nameCell.classList.add("blocked");
    emailCell.classList.add("blocked");
    phoneCell.classList.add("blocked");
  } else {
    // Chuyển trạng thái thành "Hoạt động"
    statusCell.innerText = "Hoạt động";
    button.innerText = "Khóa";
    button.classList.remove("btn-success");
    button.classList.add("btn-warning");

    // Xóa lớp gạch đỏ cho tên, email, và số điện thoại
    nameCell.classList.remove("blocked");
    emailCell.classList.remove("blocked");
    phoneCell.classList.remove("blocked");
  }
}

function deleteUser(button) {
  if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
    const row = button.closest("tr");
    row.parentNode.removeChild(row);
  }
}

function searchTable(inputId, tableId) {
  const input = document.getElementById(inputId).value.toLowerCase();
  const table = document.getElementById(tableId);
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    // Bỏ qua hàng tiêu đề
    let cells = rows[i].getElementsByTagName("td");
    let match = false;
    for (let cell of cells) {
      if (cell.innerHTML.toLowerCase().indexOf(input) > -1) {
        match = true;
        break;
      }
    }
    rows[i].style.display = match ? "" : "none";
  }
}

// Xuất các chức năng nếu cần thiết cho các hành động inline trong HTML
window.addUser = addUser;
window.deleteUser = deleteUser;
window.toggleBlockUser = toggleBlockUser;
window.searchTable = searchTable;

// Quản lý sản phẩm

// Initialize product ID counter
let productIdCounter = 2;

// Function to add a new product
function addProduct() {
  const name = document.getElementById("newProductName").value;
  const type = document.getElementById("newProductType").value;
  const price = document.getElementById("newProductPrice").value;
  const stock = document.getElementById("newProductStock").value;
  const imageInput = document.getElementById("newProductImage");

  if (name && type && price && stock) {
    // Create a new row in the product table
    const tableBody = document.getElementById("productTableBody");
    const row = document.createElement("tr");

    // Handle image upload
    let imagePath = "No Image";
    if (imageInput.files.length > 0) {
      const imageFile = imageInput.files[0];
      imagePath = URL.createObjectURL(imageFile);
    }

    row.innerHTML = `
            <td>${productIdCounter++}</td>
            <td>${name}</td>
            <td>${type}</td>
            <td>${price}</td>
            <td>${stock}</td>
            <td><img src="${imagePath}" alt="Product Image" class="product-image" style="width: 50px; height: 50px;"></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editProduct(this)">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(this)">Xóa</button>
            </td>
        `;
    tableBody.appendChild(row);

    // Clear input fields
    document.getElementById("newProductName").value = "";
    document.getElementById("newProductType").value = "";
    document.getElementById("newProductPrice").value = "";
    document.getElementById("newProductStock").value = "";
    imageInput.value = "";
  } else {
    alert("Vui lòng điền đầy đủ thông tin!");
  }
}

function editProduct(button) {
  const row = button.closest("tr");
  const cells = row.getElementsByTagName("td");

  if (button.innerText === "Sửa") {
    // Existing values
    const name = cells[1].innerText;
    const type = cells[2].innerText;
    const price = cells[3].innerText;
    const stock = cells[4].innerText;
    const currentImageSrc = cells[5].querySelector("img").src;

    // Editable fields
    cells[1].innerHTML = `<input type="text" class="form-control" value="${name}">`;
    cells[2].innerHTML = `
            <select class="form-control">
                <option value="Hoa quả" ${
                  type === "Hoa quả" ? "selected" : ""
                }>Hoa quả</option>
                <option value="Rau củ" ${
                  type === "Rau củ" ? "selected" : ""
                }>Rau củ</option>
                <option value="Hạt sấy" ${
                  type === "Hạt sấy" ? "selected" : ""
                }>Hạt sấy</option>
                <option value="Hữu cơ" ${
                  type === "Hữu cơ" ? "selected" : ""
                }>Hữu cơ</option>
            </select>
        `;
    cells[3].innerHTML = `<input type="number" class="form-control" value="${price}">`;
    cells[4].innerHTML = `<input type="number" class="form-control" value="${stock}">`;

    // Image preview and controls for changing/removing the image
    cells[5].innerHTML = `
            <img src="${currentImageSrc}" alt="Product Image" class="product-image-preview" style="width: 50px; height: 50px; margin-bottom: 5px;">
            <div>
                <input type="file" class="form-control mt-2" accept="image/*" onchange="previewEditImage(event, this)" style="display: none;">
                <button type="button" class="btn btn-primary btn-sm mt-2" onclick="changeEditImage(this)">Thay đổi</button>
                <button type="button" class="btn btn-danger btn-sm mt-2" onclick="removeEditImage(this)">Bỏ hình</button>
            </div>
        `;

    button.innerText = "Lưu";
  } else {
    // Get updated values
    const newName = cells[1].querySelector("input").value;
    const newType = cells[2].querySelector("select").value;
    const newPrice = cells[3].querySelector("input").value;
    const newStock = cells[4].querySelector("input").value;

    const imagePreview = cells[5].querySelector(".product-image-preview");
    const newImageInput = cells[5].querySelector("input[type='file']");
    let newImagePath = imagePreview ? imagePreview.src : "No Image";

    // Update image if a new file is selected
    if (newImageInput && newImageInput.files.length > 0) {
      const newImageFile = newImageInput.files[0];
      newImagePath = URL.createObjectURL(newImageFile);
    }

    // Save updated values
    cells[1].innerText = newName;
    cells[2].innerText = newType;
    cells[3].innerText = newPrice;
    cells[4].innerText = newStock;
    cells[5].innerHTML = `<img src="${newImagePath}" alt="Product Image" class="product-image" style="width: 50px; height: 50px;">`;

    button.innerText = "Sửa";
  }
}

// Function to preview image when editing
function previewEditImage(event, input) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const imagePreview = input
      .closest("td")
      .querySelector(".product-image-preview");
    imagePreview.src = e.target.result; // Update preview image
  };
  reader.readAsDataURL(event.target.files[0]);
}

// Function to handle image change
function changeEditImage(button) {
  const fileInput = button.closest("td").querySelector("input[type='file']");
  fileInput.click(); // Trigger file selection dialog
}

// Function to remove the current image when editing
function removeEditImage(button) {
  const cell = button.closest("td");
  const imagePreview = cell.querySelector(".product-image-preview");
  imagePreview.src = ""; // Clear the image preview
  cell.querySelector("input[type='file']").value = ""; // Reset file input
}

// Function to delete a product with confirmation
function deleteProduct(button) {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    const row = button.closest("tr");
    row.parentNode.removeChild(row);
  }
}

function previewImage(event) {
  const imageInput = event.target;
  const imagePreview = document.getElementById("imagePreview");

  // Check if a file is selected
  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();

    // Load the image file as a data URL
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block"; // Show the image preview
    };

    reader.readAsDataURL(imageInput.files[0]); // Convert file to data URL
  } else {
    imagePreview.style.display = "none"; // Hide the image preview if no file is selected
  }
}

// Expose functions to global scope for use in HTML
window.addProduct = addProduct;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;

// Quản lý đơn hàng

// Dummy data for orders
// Sample data for orders
let orders = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    address: "Quận 1",
    status: "Chưa xử lý",
    date: "2024-11-01",
  },
  {
    id: 2,
    customer: "Trần Thị B",
    address: "Quận 3",
    status: "Đã xác nhận",
    date: "2024-11-03",
  },
  {
    id: 3,
    customer: "Lê Văn C",
    address: "Quận 5",
    status: "Đã giao thành công",
    date: "2024-11-05",
  },
  {
    id: 4,
    customer: "Nguyễn Văn A",
    address: "Quận 1",
    status: "Chưa xử lý",
    date: "2024-11-01",
  },
  {
    id: 5,
    customer: "Trần Thị B",
    address: "Quận 3",
    status: "Đã xác nhận",
    date: "2024-11-03",
  },
  {
    id: 6,
    customer: "Lê Văn C",
    address: "Quận 5",
    status: "Đã giao thành công",
    date: "2024-11-05",
  },
  // Add more orders as needed
];

// Function to render orders in the table
function renderOrders(orderList) {
  const orderTableBody = document.getElementById("orderTableBody");
  orderTableBody.innerHTML = ""; // Clear current rows

  orderList.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.address}</td>
            <td>${order.status}</td>
            <td>${order.date}</td>
            <td>
                <a href="#" onclick="toggleOrderDetails(${order.id}, this)">Chi tiết</a>
            </td>
        `;
    orderTableBody.appendChild(row);

    // Add a hidden row for details
    const detailsRow = document.createElement("tr");
    detailsRow.classList.add("order-details-row");
    detailsRow.style.display = "none"; // Initially hidden
    detailsRow.innerHTML = `
            <td colspan="6">
                <div class="order-details-content">
                    <strong>Chi tiết đơn hàng:</strong><br>
                    ID: ${order.id}<br>
                    Khách hàng: ${order.customer}<br>
                    Địa chỉ: ${order.address}<br>
                    Trạng thái: ${order.status}<br>
                    Ngày đặt: ${order.date}
                </div>
            </td>
        `;
    orderTableBody.appendChild(detailsRow);
  });
}

// Combined filter function
function filterOrders() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const status = document.getElementById("orderStatusFilter").value;
  const district = document.getElementById("districtFilter").value;

  const filteredOrders = orders.filter((order) => {
    const isWithinDateRange =
      (!startDate || order.date >= startDate) &&
      (!endDate || order.date <= endDate);
    const matchesStatus = !status || order.status === status;
    const matchesDistrict = !district || order.address.includes(district);

    return isWithinDateRange && matchesStatus && matchesDistrict;
  });

  renderOrders(filteredOrders);
}

// Function to toggle order details visibility
function toggleOrderDetails(orderId, linkElement) {
  const detailsRow = linkElement.closest("tr").nextElementSibling;
  if (detailsRow.style.display === "none") {
    detailsRow.style.display = "table-row";
    linkElement.innerText = "Ẩn chi tiết"; // Change link text to "Hide details"
  } else {
    detailsRow.style.display = "none";
    linkElement.innerText = "Chi tiết"; // Change link text back to "Show details"
  }
}

// Initial render of all orders
renderOrders(orders);

// Sample data for orders (including products sold and customer data)
let orderss = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    products: [{ name: "Sản phẩm A", quantity: 3, price: 100000 }],
    date: "2024-11-01",
  },
  {
    id: 2,
    customer: "Trần Thị B",
    products: [{ name: "Sản phẩm B", quantity: 1, price: 200000 }],
    date: "2024-11-03",
  },
  {
    id: 3,
    customer: "Lê Văn C",
    products: [{ name: "Sản phẩm A", quantity: 2, price: 100000 }],
    date: "2024-11-05",
  },
  {
    id: 4,
    customer: "Nguyễn Thị D",
    products: [{ name: "Sản phẩm C", quantity: 4, price: 50000 }],
    date: "2024-11-07",
  },
  {
    id: 5,
    customer: "Trần Thị B",
    products: [{ name: "Sản phẩm A", quantity: 1, price: 100000 }],
    date: "2024-11-10",
  },
  {
    id: 6,
    customer: "Nguyễn Văn E",
    products: [{ name: "Sản phẩm D", quantity: 5, price: 120000 }],
    date: "2024-11-11",
  },
  {
    id: 7,
    customer: "Lê Thị F",
    products: [
      { name: "Sản phẩm A", quantity: 2, price: 100000 },
      { name: "Sản phẩm B", quantity: 1, price: 200000 },
    ],
    date: "2024-11-12",
  },
  {
    id: 8,
    customer: "Trần Văn G",
    products: [{ name: "Sản phẩm C", quantity: 6, price: 50000 }],
    date: "2024-11-13",
  },
  {
    id: 9,
    customer: "Hoàng Thị H",
    products: [{ name: "Sản phẩm B", quantity: 2, price: 200000 }],
    date: "2024-11-14",
  },
  {
    id: 10,
    customer: "Nguyễn Văn I",
    products: [{ name: "Sản phẩm D", quantity: 3, price: 120000 }],
    date: "2024-11-15",
  },
  {
    id: 11,
    customer: "Phạm Thị J",
    products: [
      { name: "Sản phẩm A", quantity: 1, price: 100000 },
      { name: "Sản phẩm C", quantity: 2, price: 50000 },
    ],
    date: "2024-11-16",
  },
  {
    id: 12,
    customer: "Lê Văn K",
    products: [
      { name: "Sản phẩm B", quantity: 1, price: 200000 },
      { name: "Sản phẩm D", quantity: 4, price: 120000 },
    ],
    date: "2024-11-17",
  },
  {
    id: 13,
    customer: "Hoàng Thị L",
    products: [{ name: "Sản phẩm C", quantity: 2, price: 50000 }],
    date: "2024-11-18",
  },
  {
    id: 14,
    customer: "Nguyễn Văn M",
    products: [{ name: "Sản phẩm A", quantity: 5, price: 100000 }],
    date: "2024-11-19",
  },
  {
    id: 15,
    customer: "Trần Thị N",
    products: [
      { name: "Sản phẩm B", quantity: 1, price: 200000 },
      { name: "Sản phẩm D", quantity: 3, price: 120000 },
    ],
    date: "2024-11-20",
  },
  {
    id: 16,
    customer: "Lê Văn O",
    products: [{ name: "Sản phẩm C", quantity: 3, price: 50000 }],
    date: "2024-11-21",
  },
  {
    id: 17,
    customer: "Phạm Thị P",
    products: [{ name: "Sản phẩm D", quantity: 2, price: 120000 }],
    date: "2024-11-22",
  },
  {
    id: 18,
    customer: "Nguyễn Thị Q",
    products: [{ name: "Sản phẩm A", quantity: 3, price: 100000 }],
    date: "2024-11-23",
  },
  {
    id: 19,
    customer: "Trần Văn R",
    products: [
      { name: "Sản phẩm B", quantity: 2, price: 200000 },
      { name: "Sản phẩm C", quantity: 1, price: 50000 },
    ],
    date: "2024-11-24",
  },
  {
    id: 20,
    customer: "Lê Thị S",
    products: [
      { name: "Sản phẩm A", quantity: 1, price: 100000 },
      { name: "Sản phẩm D", quantity: 2, price: 120000 },
    ],
    date: "2024-11-25",
  },
];

// Function to generate business statistics
function generateStatistics() {
  const startDate = document.getElementById("startStatDate").value;
  const endDate = document.getElementById("endStatDate").value;

  // Filter orders by date range
  const filteredOrders = orders.filter((order) => {
    return (
      (!startDate || order.date >= startDate) &&
      (!endDate || order.date <= endDate)
    );
  });

  // Generate product sales statistics
  const productSales = {};
  let totalRevenue = 0;

  filteredOrders.forEach((order) => {
    order.products.forEach((product) => {
      if (!productSales[product.name]) {
        productSales[product.name] = { quantity: 0, revenue: 0 };
      }
      productSales[product.name].quantity += product.quantity;
      productSales[product.name].revenue += product.quantity * product.price;
      totalRevenue += product.quantity * product.price;
    });
  });

  // Update product statistics in HTML
  const productStatisticsBody = document.getElementById(
    "productStatisticsBody"
  );
  productStatisticsBody.innerHTML = ""; // Clear existing rows

  let bestSellingProduct = { name: "", quantity: 0 };
  let leastSellingProduct = { name: "", quantity: Infinity };

  for (const [name, data] of Object.entries(productSales)) {
    // Identify best-selling and least-selling products
    if (data.quantity > bestSellingProduct.quantity) {
      bestSellingProduct = { name, quantity: data.quantity };
    }
    if (data.quantity < leastSellingProduct.quantity) {
      leastSellingProduct = { name, quantity: data.quantity };
    }

    // Add product statistics row
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${name}</td>
            <td>${data.quantity}</td>
            <td>${data.revenue.toLocaleString()}₫</td>
            <td><a href="#" onclick="viewProductInvoices('${name}')">Xem hoá đơn</a></td>
        `;
    productStatisticsBody.appendChild(row);
  }

  document.getElementById(
    "totalRevenue"
  ).innerText = `${totalRevenue.toLocaleString()}₫`;
  document.getElementById("bestSellingProduct").innerText =
    bestSellingProduct.name || "N/A";
  document.getElementById("leastSellingProduct").innerText =
    leastSellingProduct.name || "N/A";

  // Generate customer revenue statistics
  const customerRevenue = {};

  filteredOrders.forEach((order) => {
    if (!customerRevenue[order.customer]) {
      customerRevenue[order.customer] = 0;
    }
    order.products.forEach((product) => {
      customerRevenue[order.customer] += product.quantity * product.price;
    });
  });

  // Sort customers by revenue and take the top 5
  const topCustomers = Object.entries(customerRevenue)
    .sort(([, revenueA], [, revenueB]) => revenueB - revenueA)
    .slice(0, 5);

  // Update customer statistics in HTML
  const customerStatisticsBody = document.getElementById(
    "customerStatisticsBody"
  );
  customerStatisticsBody.innerHTML = ""; // Clear existing rows

  topCustomers.forEach(([customer, revenue]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${customer}</td>
            <td>${revenue.toLocaleString()}₫</td>
            <td><a href="#" onclick="viewCustomerInvoices('${customer}')">Xem hoá đơn</a></td>
        `;
    customerStatisticsBody.appendChild(row);
  });
}

function adjustAdminHeight() {
  const admin = document.querySelector('.admin');
  const container = document.querySelector('.container');
  admin.style.height = `${container.scrollHeight}px`; // Adjust `.admin` height based on `.container`
}

// Call `adjustAdminHeight` whenever content changes
document.addEventListener("DOMContentLoaded", adjustAdminHeight);

// Function to view invoices for a specific product
function viewProductInvoices(productName) {
  const invoices = orders.filter((order) =>
    order.products.some((product) => product.name === productName)
  );
  alert(
    `Hoá đơn cho mặt hàng: ${productName}\n\n` +
      invoices
        .map(
          (order) =>
            `ID: ${order.id}, Khách hàng: ${order.customer}, Ngày đặt: ${order.date}`
        )
        .join("\n")
  );
}

// Function to view invoices for a specific customer
function viewCustomerInvoices(customerName) {
  const invoices = orders.filter((order) => order.customer === customerName);
  alert(
    `Hoá đơn cho khách hàng: ${customerName}\n\n` +
      invoices
        .map((order) => `ID: ${order.id}, Ngày đặt: ${order.date}`)
        .join("\n")
  );
}

// Function to generate business statistics
function generateStatistics() {
  const startDate = document.getElementById("startStatDate").value;
  const endDate = document.getElementById("endStatDate").value;

  // Filter orders by date range
  const filteredOrders = orderss.filter((order) => {
    return (
      (!startDate || order.date >= startDate) &&
      (!endDate || order.date <= endDate)
    );
  });

  // Generate product sales statistics
  const productSales = {};
  let totalRevenue = 0;

  filteredOrders.forEach((order) => {
    order.products.forEach((product) => {
      if (!productSales[product.name]) {
        productSales[product.name] = { quantity: 0, revenue: 0 };
      }
      productSales[product.name].quantity += product.quantity;
      productSales[product.name].revenue += product.quantity * product.price;
      totalRevenue += product.quantity * product.price;
    });
  });

  // Update product statistics in HTML
  const productStatisticsBody = document.getElementById(
    "productStatisticsBody"
  );
  productStatisticsBody.innerHTML = ""; // Clear existing rows

  let bestSellingProduct = { name: "", quantity: 0 };
  let leastSellingProduct = { name: "", quantity: Infinity };

  for (const [name, data] of Object.entries(productSales)) {
    // Identify best-selling and least-selling products
    if (data.quantity > bestSellingProduct.quantity) {
      bestSellingProduct = { name, quantity: data.quantity };
    }
    if (data.quantity < leastSellingProduct.quantity) {
      leastSellingProduct = { name, quantity: data.quantity };
    }

    // Add product statistics row
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${name}</td>
          <td>${data.quantity}</td>
          <td>${data.revenue.toLocaleString()}₫</td>
          <td><a href="#" onclick="viewProductInvoices('${name}')">Xem hoá đơn</a></td>
      `;
    productStatisticsBody.appendChild(row);
  }

  document.getElementById(
    "totalRevenue"
  ).innerText = `${totalRevenue.toLocaleString()}₫`;
  document.getElementById("bestSellingProduct").innerText =
    bestSellingProduct.name || "N/A";
  document.getElementById("leastSellingProduct").innerText =
    leastSellingProduct.name || "N/A";

  // Generate customer revenue statistics
  const customerRevenue = {};

  filteredOrders.forEach((order) => {
    if (!customerRevenue[order.customer]) {
      customerRevenue[order.customer] = 0;
    }
    order.products.forEach((product) => {
      customerRevenue[order.customer] += product.quantity * product.price;
    });
  });

  // Sort customers by revenue and take the top 5
  const topCustomers = Object.entries(customerRevenue)
    .sort(([, revenueA], [, revenueB]) => revenueB - revenueA)
    .slice(0, 5);

  // Update customer statistics in HTML
  const customerStatisticsBody = document.getElementById(
    "customerStatisticsBody"
  );
  customerStatisticsBody.innerHTML = ""; // Clear existing rows

  topCustomers.forEach(([customer, revenue]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${customer}</td>
    <td>${revenue.toLocaleString()}₫</td>
    <td><button type="button" class="view-invoice-button" onclick="viewCustomerInvoices('${customer}', event)">Xem hóa đơn</button></td>
`;

    customerStatisticsBody.appendChild(row);
  });
}

function generateStatistics() {
  const startDate = document.getElementById("startStatDate").value;
  const endDate = document.getElementById("endStatDate").value;

  // Filter orders by date range if dates are provided
  const filteredOrders = orderss.filter((order) => {
    return (
      (!startDate || order.date >= startDate) &&
      (!endDate || order.date <= endDate)
    );
  });

  // Generate Product Sales Statistics
  const productSales = {};
  let totalRevenue = 0;

  filteredOrders.forEach((order) => {
    order.products.forEach((product) => {
      if (!productSales[product.name]) {
        productSales[product.name] = { quantity: 0, revenue: 0 };
      }
      productSales[product.name].quantity += product.quantity;
      productSales[product.name].revenue += product.quantity * product.price;
      totalRevenue += product.quantity * product.price;
    });
  });

  // Populate product statistics table
  const productStatisticsBody = document.getElementById(
    "productStatisticsBody"
  );
  productStatisticsBody.innerHTML = "";

  for (const [name, data] of Object.entries(productSales)) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${name}</td>
    <td>${data.quantity}</td>
    <td>${data.revenue.toLocaleString()}₫</td>
    <td><button type="button" class="view-invoice-button" onclick="viewProductInvoices('${name}', event)">Xem hóa đơn</button></td>
`;

    productStatisticsBody.appendChild(row);
  }

  document.getElementById(
    "totalRevenue"
  ).innerText = `${totalRevenue.toLocaleString()}₫`;

  // Generate Customer Revenue Statistics
  const customerRevenue = {};

  filteredOrders.forEach((order) => {
    if (!customerRevenue[order.customer]) {
      customerRevenue[order.customer] = 0;
    }
    order.products.forEach((product) => {
      customerRevenue[order.customer] += product.quantity * product.price;
    });
  });

  // Populate customer statistics table
  const customerStatisticsBody = document.getElementById(
    "customerStatisticsBody"
  );
  customerStatisticsBody.innerHTML = "";

  Object.entries(customerRevenue)
    .sort(([, revenueA], [, revenueB]) => revenueB - revenueA)
    .slice(0, 5)
    .forEach(([customer, revenue]) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${customer}</td>
              <td>${revenue.toLocaleString()}₫</td>
              <td><button type="button" class="view-invoice-button" onclick="viewCustomerInvoices('${customer}', event)">Xem hóa đơn</button></td>
          `;
      customerStatisticsBody.appendChild(row);
    });
}

// Call generateStatistics on page load to display all orders initially
window.onload = generateStatistics;

function viewProductInvoices(productName, event) {
  event.preventDefault();

  const currentRow = event.target.closest("tr");
  let detailsRow = currentRow.nextElementSibling;

  if (detailsRow && detailsRow.classList.contains("invoice-details-row")) {
    detailsRow.style.display = detailsRow.style.display === "none" ? "table-row" : "none";
    event.target.innerText = detailsRow.style.display === "none" ? "Xem hóa đơn" : "Ẩn hóa đơn";
    adjustAdminHeight(); // Adjust background height
    return;
  }

  const invoices = orderss.filter(order => order.products.some(product => product.name === productName));
  const invoiceDetails = invoices.map(order => `
      <div>
          <strong>ID Đơn hàng:</strong> ${order.id}<br>
          <strong>Khách hàng:</strong> ${order.customer}<br>
          <strong>Ngày đặt:</strong> ${order.date}<br>
          <strong>Sản phẩm:</strong> ${order.products.map(p => `${p.name} (SL: ${p.quantity}, Giá: ${p.price.toLocaleString()}₫)`).join(", ")}
      </div><hr>
  `).join("");

  detailsRow = document.createElement("tr");
  detailsRow.classList.add("invoice-details-row");
  detailsRow.innerHTML = `
      <td colspan="4">
          <div class="invoice-details-content">
              ${invoiceDetails}
          </div>
      </td>
  `;
  currentRow.parentNode.insertBefore(detailsRow, currentRow.nextSibling);
  event.target.innerText = "Ẩn hóa đơn";
  adjustAdminHeight(); // Adjust background height
}

function viewCustomerInvoices(customerName, event) {
  event.preventDefault();

  const currentRow = event.target.closest("tr");
  let detailsRow = currentRow.nextElementSibling;

  if (detailsRow && detailsRow.classList.contains("invoice-details-row")) {
    detailsRow.style.display = detailsRow.style.display === "none" ? "table-row" : "none";
    event.target.innerText = detailsRow.style.display === "none" ? "Xem hóa đơn" : "Ẩn hóa đơn";
    adjustAdminHeight(); // Adjust background height
    return;
  }

  const invoices = orderss.filter(order => order.customer === customerName);
  const invoiceDetails = invoices.map(order => `
      <div>
          <strong>ID Đơn hàng:</strong> ${order.id}<br>
          <strong>Ngày đặt:</strong> ${order.date}<br>
          <strong>Sản phẩm:</strong> ${order.products.map(p => `${p.name} (SL: ${p.quantity}, Giá: ${p.price.toLocaleString()}₫)`).join(", ")}
      </div><hr>
  `).join("");

  detailsRow = document.createElement("tr");
  detailsRow.classList.add("invoice-details-row");
  detailsRow.innerHTML = `
      <td colspan="3">
          <div class="invoice-details-content">
              ${invoiceDetails}
          </div>
      </td>
  `;
  currentRow.parentNode.insertBefore(detailsRow, currentRow.nextSibling);
  event.target.innerText = "Ẩn hóa đơn";
  adjustAdminHeight(); // Adjust background height
}

// Expose functions globally for HTML access

window.viewProductInvoices = viewProductInvoices;
window.viewCustomerInvoices = viewCustomerInvoices;
