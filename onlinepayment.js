let isRegistered = false; // Variable to track registration status

// Function to switch to a specific form by ID
function switchToForm(formId) {
    const forms = document.querySelectorAll("section");
    forms.forEach((form) => {
        form.style.display = "none";
    });
    document.getElementById(formId).style.display = "block";
}

// Login functionality
function login() {
    if (!isRegistered) {
        alert("You need to register first before logging in.");
        switchToForm("register-form");
        return;
    }

    const studentNumber = document.getElementById("login-student-number").value;
    const password = document.getElementById("login-password").value;

    if (studentNumber && password) {
        alert("Login successful!");
        switchToForm("order-form");
    } else {
        alert("Please enter your student number and password.");
    }
}

// Register functionality
function register() {
    const fullname = document.getElementById("fullname").value;
    const studentNumber = document.getElementById("student-number").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const section = document.getElementById("section").value;
    const phone = document.getElementById("phone").value;

    const namePattern = /^[A-Za-z\s]+$/; // Only letters and spaces allowed for fullname
    const numberPattern = /^[0-9]+$/; // Only numbers for student number and phone
    const passwordPattern = /^[A-Za-z0-9]+$/; // Letters and numbers for password
    const sectionPattern = /^[A-Za-z0-9\s]+$/; // Letters and numbers for section
    const phonePattern = /^[0-9]{10}$/; // Assuming 10-digit phone number

    if (!namePattern.test(fullname)) {
        alert("Full Name should only contain letters and spaces.");
        return;
    }

    if (!numberPattern.test(studentNumber)) {
        alert("Student Number should only contain numbers.");
        return;
    }

    if (!passwordPattern.test(password) || password !== confirmPassword) {
        alert("Passwords must match and should only contain letters and numbers.");
        return;
    }

    if (!sectionPattern.test(section)) {
        alert("Section should only contain letters and numbers.");
        return;
    }

    if (!phonePattern.test(phone)) {
        alert("Phone Number must be 10 digits.");
        return;
    }

    if (fullname && studentNumber && password && section && phone) {
        alert("Registration successful! Please log in.");
        isRegistered = true; // Mark as registered
        switchToForm("login-form"); // Redirect to login form
    } else {
        alert("Please fill out all the fields.");
    }
}
// Helper function to get selected size (dummy function)        
function getSelectedSize(sizeId) {
    return document.getElementById(sizeId).value || "N/A";
}

// Function to update quantity of items
function updateItemQuantity(itemName, price, change) {
    const input = document.getElementById(`${itemName}-${price}`);
    let currentCount = parseInt(input.value, 10); // Get the current value (as an integer)

    currentCount += change; // Add or subtract from the current count

    if (currentCount >= 0) { // Ensure that the quantity doesn't go below 0
        input.value = currentCount; // Update the value
    }

    // Disable the "-" button if quantity is 0
    const decreaseButton = document.querySelector(`#${itemName}-${price} .decrease`);
    decreaseButton.disabled = currentCount <= 0;
}

// Enable or disable size dropdown based on checkbox selection for uniform and PE items
function toggleSizeDropdown(checkboxClass, dropdownId) {
    document.querySelectorAll(checkboxClass).forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            const sizeDropdown = document.getElementById(`${this.id}-size`);
            sizeDropdown.disabled = !this.checked; // Enable/disable size dropdown based on checkbox
        });
    });
}

// Call to enable/disable size dropdown for uniform items
toggleSizeDropdown('.uniform-checkbox', 'uniform-size');
toggleSizeDropdown('.pe-checkbox', 'pe-size');

// Function to handle form transition after order submission
function submitOrder() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("order-phone").value;
    const section = document.getElementById("order-section").value;
    const orderDate = document.getElementById("order-date").value;

    // Check if the order form is filled correctly
    if (name && phone && section && orderDate) {
        // Hide the order form and show the payment form
        document.getElementById("order-form").style.display = "none";  // Hide order form
        document.getElementById("payment-form").style.display = "block";  // Show payment form
    } else {
        alert("Please fill out all the required fields in the order form.");
    }
}
let totalOrderAmount = 0; // Global variable to store the total order amount

// Function to calculate and display the total amount in both Order Form and Payment Form
function updateTotalAmount() {
    const poloshirtQty = parseInt(document.getElementById("uniform-poloshirt-qty").value) || 0;
    const polopantsQty = parseInt(document.getElementById("uniform-polopants-qty").value) || 0;
    const pePoloshirtQty = parseInt(document.getElementById("pe-poloshirt-qty").value) || 0;
    const pePepantsQty = parseInt(document.getElementById("pe-pepants-qty").value) || 0;
    const scantronQty = parseInt(document.getElementById("scantron-5").value) || 0;
    const idlaceQty = parseInt(document.getElementById("idlace-80").value) || 0;
    const cogQty = parseInt(document.getElementById("cog-150").value) || 0;
    const comQty = parseInt(document.getElementById("com-200").value) || 0;

    // Prices for each item
    const prices = {
        poloshirt: 100,
        polopants: 150,
        pePoloshirt: 100,
        pePepants: 150,
        scantron: 5,
        idlace: 80,
        cog: 150,
        com: 200,
    };

    // Calculate the total
    totalOrderAmount =
        poloshirtQty * prices.poloshirt +
        polopantsQty * prices.polopants +
        pePoloshirtQty * prices.pePoloshirt +
        pePepantsQty * prices.pePepants +
        scantronQty * prices.scantron +
        idlaceQty * prices.idlace +
        cogQty * prices.cog +
        comQty * prices.com;

    // Update the total in the Order Form
    document.getElementById("order-total").innerText = `₱${totalOrderAmount.toFixed(2)}`;

    // Update the total in the Payment Form
    document.getElementById("payment-total").innerText = `₱${totalOrderAmount.toFixed(2)}`;
    document.getElementById("payment-amount").value = totalOrderAmount.toFixed(2);
}

// Function to process payment
function processPayment() {
    const paymentMethod = document.getElementById("payment-method").value;
    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }
    alert(`Payment of ₱${totalOrderAmount.toFixed(2)} using ${paymentMethod} was successful.`);
    // Reset forms or perform additional logic as needed
}

// Example function to switch from Order Form to Payment Form
function goToPaymentForm() {
    document.getElementById("order-form").style.display = "none";
    document.getElementById("payment-form").style.display = "block";

    // Ensure the total is up-to-date when the Payment Form is shown
    updateTotalAmount();
}


// Function to update the item quantity (for scantron, ID lace, etc.)
function updateItemQuantity(itemName, price, change) {
    const qtyInput = document.getElementById(`${itemName}-qty`);
    if (!qtyInput) {
        console.error(`Element with ID ${itemName}-qty not found.`);
        return;
    }

    let currentCount = parseInt(qtyInput.value) || 0;
    currentCount += change;

    if (currentCount < 0) {
        currentCount = 0;
    }

    qtyInput.value = currentCount;
    updateTotalAmount();
}


// Function to calculate and update the total amount
function updateTotalAmount() {
    // Quantities for each item
    const uniformPoloshirtQty = parseInt(document.getElementById("uniform-poloshirt-qty").value) || 0;
    const uniformPolopantsQty = parseInt(document.getElementById("uniform-polopants-qty").value) || 0;
    const pePoloshirtQty = parseInt(document.getElementById("pe-poloshirt-qty").value) || 0;
    const pePantsQty = parseInt(document.getElementById("pe-pepants-qty").value) || 0;
    const scantronQty = parseInt(document.getElementById("scantron-qty").value) || 0;
    const idlaceQty = parseInt(document.getElementById("idlace-qty").value) || 0;
    const comItemQty = parseInt(document.getElementById("com-item-qty").value) || 0;
    const cogItemQty = parseInt(document.getElementById("cog-item-qty").value) || 0;

    // Prices for each item
    const prices = {
        uniformPoloshirt: 150,
        uniformPolopants: 200,
        pePoloshirt: 100,
        pePants: 120,
        scantron: 5,
        idlace: 80,
        comItem: 250,
        cogItem: 300
    };

    // Calculate the total amount
    let totalAmount = 
        (uniformPoloshirtQty * prices.uniformPoloshirt) + 
        (uniformPolopantsQty * prices.uniformPolopants) + 
        (pePoloshirtQty * prices.pePoloshirt) + 
        (pePantsQty * prices.pePants) + 
        (scantronQty * prices.scantron) + 
        (idlaceQty * prices.idlace) + 
        (comItemQty * prices.comItem) + 
        (cogItemQty * prices.cogItem);

    // Display the total amount on the order form
    document.getElementById("order-total").innerText = totalAmount.toFixed(2);

    // Pass the total amount to the payment form
    document.getElementById("payment-total").innerText = `₱${totalAmount.toFixed(2)}`;
    document.getElementById("payment-amount").value = totalAmount.toFixed(2);
}

// Function to navigate to the payment form
function goToPaymentForm() {
    // Hide the order form
    document.getElementById("order-form").style.display = "none";
    
    // Show the payment form
    document.getElementById("payment-form").style.display = "block";
}
// Process Payment and Transition to Receipt
function processPayment() {
    // Get form details
    const studentNumber = document.getElementById('student-number').value;
    const fullName = document.getElementById('fullname').value;
    const section = document.getElementById('section').value;
    const phone = document.getElementById('phone').value;

   // Sample orderData structure
const orderData = {
    uniform: {
      poloshirt: { qty: 2, price: 150 },
      polopants: { qty: 3, price: 200 },
    },
    pe: {
      pePoloshirt: { qty: 1, price: 100 },
      pePants: { qty: 4, price: 180 },
    },
    otherItems: {
      scantron: { qty: 5, price: 20 },
      idLace: { qty: 1, price: 50 },
      com: { qty: 3, price: 30 },
      cog: { qty: 2, price: 40 }
    }
  };
  
  // Initialize totalAmount to 0
  let totalAmount = 0;
  
  // Uniform items
  if (orderData && orderData.uniform) {
    totalAmount += (Number(orderData.uniform.poloshirt?.qty) || 0) * (Number(orderData.uniform.poloshirt?.price) || 0);
    totalAmount += (Number(orderData.uniform.polopants?.qty) || 0) * (Number(orderData.uniform.polopants?.price) || 0);
  }
  
  // PE items
  if (orderData && orderData.pe) {
    totalAmount += (Number(orderData.pe.pePoloshirt?.qty) || 0) * (Number(orderData.pe.pePoloshirt?.price) || 0);
    totalAmount += (Number(orderData.pe.pePants?.qty) || 0) * (Number(orderData.pe.pePants?.price) || 0);
  }
  
  // Other items
  if (orderData && orderData.otherItems) {
    totalAmount += (Number(orderData.otherItems.scantron?.qty) || 0) * (Number(orderData.otherItems.scantron?.price) || 0);
    totalAmount += (Number(orderData.otherItems.idLace?.qty) || 0) * (Number(orderData.otherItems.idLace?.price) || 0);
    totalAmount += (Number(orderData.otherItems.com?.qty) || 0) * (Number(orderData.otherItems.com?.price) || 0);
    totalAmount += (Number(orderData.otherItems.cog?.qty) || 0) * (Number(orderData.otherItems.cog?.price) || 0);
  }
  
  
  

    // Populate the receipt form with order details
    document.getElementById('receipt-student-number').textContent = studentNumber;
    document.getElementById('receipt-full-name').textContent = fullName;
    document.getElementById('receipt-section').textContent = section;
    document.getElementById('receipt-phone').textContent = phone;
    document.getElementById('receipt-order-date').textContent = new Date().toLocaleDateString();

    // Uniform Items
    document.getElementById('receipt-poloshirt-size').textContent = orderData.uniform.poloshirt.size;
    document.getElementById('receipt-poloshirt-qty').textContent = orderData.uniform.poloshirt.qty;
    document.getElementById('receipt-poloshirt-total').textContent = orderData.uniform.poloshirt.qty * orderData.uniform.poloshirt.price;

    document.getElementById('receipt-polopants-size').textContent = orderData.uniform.polopants.size;
    document.getElementById('receipt-polopants-qty').textContent = orderData.uniform.polopants.qty;
    document.getElementById('receipt-polopants-total').textContent = orderData.uniform.polopants.qty * orderData.uniform.polopants.price;

    // PE Items
    document.getElementById('receipt-pe-poloshirt-size').textContent = orderData.pe.pePoloshirt.size;
    document.getElementById('receipt-pe-poloshirt-qty').textContent = orderData.pe.pePoloshirt.qty;
    document.getElementById('receipt-pe-poloshirt-total').textContent = orderData.pe.pePoloshirt.qty * orderData.pe.pePoloshirt.price;

    document.getElementById('receipt-pe-pepants-size').textContent = orderData.pe.pePants.size;
    document.getElementById('receipt-pe-pepants-qty').textContent = orderData.pe.pePants.qty;
    document.getElementById('receipt-pe-pepants-total').textContent = orderData.pe.pePants.qty * orderData.pe.pePants.price;

    // Other Items
    document.getElementById('receipt-scantron-qty').textContent = orderData.otherItems.scantron.qty;
    document.getElementById('receipt-scantron-total').textContent = orderData.otherItems.scantron.qty * orderData.otherItems.scantron.price;

    document.getElementById('receipt-id-lace-qty').textContent = orderData.otherItems.idLace.qty;
    document.getElementById('receipt-id-lace-total').textContent = orderData.otherItems.idLace.qty * orderData.otherItems.idLace.price;

    document.getElementById('receipt-com-qty').textContent = orderData.otherItems.com.qty;
    document.getElementById('receipt-com-total').textContent = orderData.otherItems.com.qty * orderData.otherItems.com.price;

    document.getElementById('receipt-cog-qty').textContent = orderData.otherItems.cog.qty;
    document.getElementById('receipt-cog-total').textContent = orderData.otherItems.cog.qty * orderData.otherItems.cog.price;

    // Display the total amount
    document.getElementById('receipt-total-amount').textContent = totalAmount;

    
        document.getElementById('payment-form').style.display = 'none';
        document.getElementById('receipt-form').style.display = 'block';
}


