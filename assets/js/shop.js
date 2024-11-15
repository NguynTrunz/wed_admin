const headerMain = document.getElementById("headerMain");
const headerTop = document.getElementById("headerTop");
const headerMainOffset = headerMain.offsetTop;

function debounce(func, wait = 10) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
}

function onScroll() {
  if (window.scrollY > headerMainOffset) {
    headerMain.classList.add("fixed", "no-bg");
    headerTop.classList.add("hidden");
  } else {
    headerMain.classList.remove("fixed", "no-bg");
    headerTop.classList.remove("hidden");
  }
}

window.addEventListener("scroll", debounce(onScroll, 10));

const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredProducts = []; // Sẽ được gán lại trong quá trình tìm kiếm

// Hàm hiển thị sản phẩm dựa trên phân trang
function renderProducts() {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const productsToDisplay = filteredProducts.slice(start, end);

  if (productsToDisplay.length === 0) {
    productContainer.innerHTML = "<p>Không tìm thấy sản phẩm nào phù hợp.</p>";
    return;
  }

  productsToDisplay.forEach((product) => {
    productContainer.appendChild(product);
  });

  updatePagination();
}

// Cập nhật các nút phân trang
function updatePagination() {
  const paginationNumbers = document.getElementById("paginationNumbers");
  paginationNumbers.innerHTML = "";

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    createPageButton(i);
  }

  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// Tạo nút phân trang
function createPageButton(pageNumber) {
  const pageButton = document.createElement("button");
  pageButton.className = "btn btn-outline-secondary mx-1";
  pageButton.innerText = pageNumber;

  if (pageNumber === currentPage) {
    pageButton.classList.add("active");
  }

  pageButton.addEventListener("click", () => {
    currentPage = pageNumber;
    renderProducts();
  });

  document.getElementById("paginationNumbers").appendChild(pageButton);
}

// Điều hướng qua lại giữa các trang
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage++;
    renderProducts();
  }
});

// Tìm kiếm và lọc sản phẩm
document.addEventListener("DOMContentLoaded", () => {
  const allProducts = Array.from(document.querySelectorAll(".product-item"));
  filteredProducts = [...allProducts]; // Gán tất cả sản phẩm ban đầu vào filteredProducts

  document.getElementById("detailedSearchForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("searchName").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;
    const priceRange = document.getElementById("priceRange").value;

    let [minPrice, maxPrice] = priceRange
      ? priceRange.split("-").map(Number)
      : [0, Infinity];

    filteredProducts = allProducts.filter((product) => {
      const productName = product.getAttribute("data-name").toLowerCase();
      const productCategory = product.getAttribute("data-category");
      const productPrice = parseFloat(product.getAttribute("data-price"));

      return (
        productName.includes(name) &&
        (!category || productCategory === category) &&
        productPrice >= minPrice &&
        productPrice <= maxPrice
      );
    });

    currentPage = 1; // Đặt lại về trang đầu tiên sau khi tìm kiếm
    renderProducts();
  });

  renderProducts(); // Hiển thị sản phẩm khi tải trang lần đầu
});
