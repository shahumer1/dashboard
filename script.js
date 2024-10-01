const categories = {
    "Drinks": [
        { name: "Espresso", price: 3.80 },
        { name: "Long Black", price: 3.80 },
        { name: "Black Tea", price: 3.80 }
    ],
    "Cookies": [
        { name: "Chocolate Chip", price: 2.50 },
        { name: "Oatmeal Raisin", price: 2.50 }
    ],
    "Pastries": [
        { name: "Croissant", price: 2.80 },
        { name: "Danish", price: 3.00 }
    ]
};

const billItems = [];

let currentCustomer = { id: "0", name: "Customer Zero" };

// Function to display products based on category
function displayProducts(category) {
    const productsGrid = document.querySelector(".grid");
    productsGrid.innerHTML = "";
    categories[category].forEach(product => {
        const productBtn = document.createElement("button");
        productBtn.className = "grid-item";
        productBtn.textContent = product.name;
        productBtn.onclick = () => addProductToBill(product);
        productsGrid.appendChild(productBtn);
    });
}

// Function to add products to the bill
function addProductToBill(product) {
    const existingItem = billItems.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        billItems.push({ ...product, quantity: 1 });
    }
    updateBill();
}

// Function to update the bill display
function updateBill() {
    const billList = document.getElementById("bill-items");
    const subTotalElement = document.getElementById("sub-total");
    const totalElement = document.getElementById("total");

    billList.innerHTML = "";
    let subTotal = 0;
    
    billItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subTotal += itemTotal;
        
        const listItem = document.createElement("div");
        listItem.className = "product-item";
        listItem.innerHTML = `
            <span>${item.name}</span>
            <input class="quantity" type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)">
            <span>$${itemTotal.toFixed(2)}</span>
            <button class="decrease-btn" onclick="removeProduct('${item.name}')">-</button>
        `;
        billList.appendChild(listItem);
    });
    
    const tax = subTotal * 0.15;
    const total = subTotal;

    subTotalElement.textContent = `$${subTotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Function to update product quantity
function updateQuantity(productName, newQuantity) {
    const item = billItems.find(item => item.name === productName);
    if (item) {
        item.quantity = parseInt(newQuantity);
        updateBill();
    }
}

// Function to remove product from bill
function removeProduct(productName) {
    const itemIndex = billItems.findIndex(item => item.name === productName);
    if (itemIndex > -1) {
        billItems.splice(itemIndex, 1);
        updateBill();
    }
}

// Function to set customer information
function setCustomerInfo(customerId) {
    const customerDatabase = {
        "1": "John Doe",
        "2": "Jane Smith"
    };

    if (customerDatabase[customerId]) {
        currentCustomer = { id: customerId, name: customerDatabase[customerId] };
    } else {
        currentCustomer = { id: "0", name: "Customer Zero" };
    }

    document.getElementById("customer-name").textContent = `Customer: ${currentCustomer.name}`;
}

// Handle Pay and Print Buttons
function payAndPrint() {
    alert(`Printing bill for ${currentCustomer.name}...\nTotal: ${document.getElementById("total").textContent}`);
}

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
    displayProducts("Drinks");

    // Set default customer info
    setCustomerInfo("0");

    document.getElementById("pay-btn").addEventListener("click", payAndPrint);
    document.getElementById("customer-id-input").addEventListener("change", (e) => {
        setCustomerInfo(e.target.value);
    });

    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            displayProducts(btn.textContent);
        });
    });
});

// Sample product array for demonstration
const products = [
    { id: 1, name: 'Espresso' },
    { id: 2, name: 'Long Black' },
    { id: 3, name: 'Black Tea' }
  ];
  
  function searchProduct() {
    const query = document.getElementById('productSearch').value.toLowerCase();
    const results = products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.id.toString() === query
    );
    
    displayProducts(results);
  }
  
  function displayProducts(filteredProducts) {
    const productContainer = document.querySelector('.products');
    productContainer.innerHTML = '';
    filteredProducts.forEach(product => {
      const productButton = document.createElement('button');
      productButton.className = 'btn btn-secondary';
      productButton.textContent = product.name;
      productContainer.appendChild(productButton);
    });
  }
  