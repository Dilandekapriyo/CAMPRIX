// PRODUCTS DATA - Now fetched from API
let products = [];
let currentFilter = "All";
let currentSearch = "";

const listContainer = document.getElementById("product-list");

// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/products');
        const data = await response.json();
        products = data.products || [];
        renderProducts(currentFilter, currentSearch);
    } catch (error) {
        console.error('Error fetching products:', error);
        // No fallback data
    }
}

function renderProducts(filter = "All", search = "") {
    listContainer.innerHTML = "";

    products
        .filter(p => 
  filter === "All" || p.category.toLowerCase() === filter.toLowerCase())

        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .forEach(p => {
            listContainer.innerHTML += `
                <div class="product-card">
                    <div class="product-top">
                        <b>${p.name}</b>
                        <span class="tag">${p.category}</span>
                    </div>
                    <div class="price">${p.price}</div>
                    <div style="color:#6b7280;">${p.description}</div>
                </div>
            `;
        });
}

// Initial load - fetch products from API
fetchProducts();

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");
        currentFilter = btn.textContent;
        renderProducts(currentFilter, currentSearch);
    });
});

// Search functionality
document.getElementById("search").addEventListener("input", e => {
    currentSearch = e.target.value;
    renderProducts(currentFilter, currentSearch);
});
