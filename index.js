
    // PRODUCTS DATA
    const products = [
        { name: "Rice (Local)", price: "850 XAF", unit: "per kg", cat: "Food" },
        { name: "Gasoline (Premium)", price: "650 XAF", unit: "per liter", cat: "Fuel" },
        { name: "Cement (50kg bag)", price: "4,500 XAF", unit: "per bag", cat: "Construction" },
        { name: "Cooking Oil", price: "1,200 XAF", unit: "per liter", cat: "Food" },
        { name: "Diesel", price: "620 XAF", unit: "per liter", cat: "Fuel" },
        { name: "Iron Rods (12mm)", price: "8,500 XAF", unit: "per bundle", cat: "Construction" },
        { name: "Bread (Standard)", price: "200 XAF", unit: "per loaf", cat: "Food" },
        { name: "Kerosene", price: "580 XAF", unit: "per liter", cat: "Fuel" },
        { name: "Paint (Interior)", price: "3,200 XAF", unit: "per 4L", cat: "Construction" },
        { name: "Sugar", price: "750 XAF", unit: "per kg", cat: "Food" }
    ];

    const listContainer = document.getElementById("product-list");

    function renderProducts(filter = "All", search = "") {
        listContainer.innerHTML = "";

        products
            .filter(p => (filter === "All" || p.cat === filter))
            .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
            .forEach(p => {
                listContainer.innerHTML += `
                    <div class="product-card">
                        <div class="product-top">
                            <b>${p.name}</b>
                            <span class="tag">${p.cat}</span>
                        </div>
                        <div class="price">${p.price}</div>
                        <div style="color:#6b7280;">${p.unit}</div>
                    </div>
                `;
            });
    }

    // Initial render
    renderProducts();

    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".filter-btn.active").classList.remove("active");
            btn.classList.add("active");
            renderProducts(btn.textContent);
        });
    });

    // Search functionality
    document.getElementById("search").addEventListener("input", e => {
        const filter = document.querySelector(".filter-btn.active").textContent;
        renderProducts(filter, e.target.value);
    });

