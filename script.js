let allItems = []; // Array to hold products from all categories
let displayedItemsCount = 'all'; // Default to display all items

// Function to update item count
function updateItemCount(count) {
    displayedItemsCount = count; // Update the displayed item count
    filterItems(document.querySelector('.category-link.active').dataset.category, document.querySelector('.category-link.active'));
}

// Fetch data from Tablets
fetch('https://dummyjson.com/products/category/tablets')
    .then(res => res.json())
    .then(data => {
        data.products.forEach(product => product.category = 'tablets');
        allItems = allItems.concat(data.products); // Add tablets to allItems
        displayItems(allItems); // Display items after each fetch
    })
    .catch(err => console.error('Error fetching data:', err));

// Fetch data from Laptops
fetch('https://dummyjson.com/products/category/laptops')
    .then(res => res.json())
    .then(data => {
        data.products.forEach(product => product.category = 'laptops');
        allItems = allItems.concat(data.products); // Add laptops to allItems
        displayItems(allItems); // Display items after each fetch
    })
    .catch(err => console.error('Error fetching data:', err));

// Fetch data from Smartphones
fetch('https://dummyjson.com/products/category/smartphones')
    .then(res => res.json())
    .then(data => {
        data.products.forEach(product => product.category = 'smartphones');
        allItems = allItems.concat(data.products); // Add smartphones to allItems
        displayItems(allItems); // Display items after each fetch
    })
    .catch(err => console.error('Error fetching data:', err));

// Function to display items dynamically
function displayItems(items) {
    const menuContainer = document.querySelector('.menu-items');
    menuContainer.innerHTML = ''; // Clear the container

    // Determine how many items to display
    let itemsToDisplay = displayedItemsCount === 'all' ? items : items.slice(0, parseInt(displayedItemsCount));

    itemsToDisplay.forEach(item => {
        const itemElement = `
            <div class="menu-card">
                <img src="${item.thumbnail}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.price} USD</p>
                <button onclick="orderItem('${item.title}')">Order</button>
            </div>
        `;
        menuContainer.innerHTML += itemElement;
    });
}

// Function to filter items by category
function filterItems(category, element) {
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => link.classList.remove('active'));
    element.classList.add('active');

    // Store the category in the element for easier access
    element.dataset.category = category;

    if (category === 'all') {
        displayItems(allItems); // Show all items if "All" is selected
    } else {
        const filteredItems = allItems.filter(item => item.category === category);
        displayItems(filteredItems); // Show filtered items
    }
}

// Dummy function for ordering
function orderItem(itemName) {
    alert(`You have ordered: ${itemName}`);
}

// Example category filters in HTML
// <a href="#" class="category-link" onclick="filterItems('smartphones', this)" data-category="smartphones">Smartphones</a>
// <a href="#" class="category-link" onclick="filterItems('laptops', this)" data-category="laptops">Laptops</a>
// <a href="#" class="category-link" onclick="filterItems('tablets', this)" data-category="tablets">Tablets</a>
// <a href="#" class="category-link" onclick="filterItems('all', this)" data-category="all">All</a>
