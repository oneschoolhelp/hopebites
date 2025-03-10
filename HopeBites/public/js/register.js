document.addEventListener("DOMContentLoaded", function () {
  // Ensure Step 1 is visible at the start
  document.getElementById("step1").classList.remove("hidden");
  document.getElementById("step2").classList.add("hidden");

  toggleDonationType("once"); // Set default donation type
  updateCurrency(); // Ensure currency updates correctly at the start
  
    // Listen for changes in country selection
    document.querySelectorAll('input[name="country"]').forEach((radio) => {
      radio.addEventListener("change", updateCurrency);
    });
});

function updateCurrency() {
  let isForeign = document.getElementById("foreign").checked;
  let labelText = document.querySelector(".label strong");
  let customAmountInput = document.getElementById("customAmount");

  if (isForeign) {
    labelText.innerHTML = "<strong>Please select your donation amount</strong> (*1 meal | $0.34)";
    customAmountInput.placeholder = "Enter amount in $";
  } else {
    labelText.innerHTML = "<strong>Please select your donation amount</strong> (*1 meal | Rs 30/-)";
    customAmountInput.placeholder = "Enter amount in Rs";
  }

  toggleDonationType(document.querySelector(".donate-btn.active").getAttribute("onclick").split("'")[1]);
}

function toggleDonationType(type) {
  document.querySelectorAll(".donate-btn").forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`.donate-btn[onclick="toggleDonationType('${type}')"]`).classList.add("active");

  let donationOptions = document.getElementById("donation-options");
  donationOptions.innerHTML = "";
  let isForeign = document.getElementById("foreign").checked;

  let amounts = isForeign
    ? type === "once"
      ? [600, 300, 200, 100, 50, 25] // Foreign One-time
      : [100, 75, 50, 25, 15, 10] // Foreign Monthly
    : type === "once"
    ? [50000, 25000, 10000, 5000, 2500, 1000] // Indian One-time
    : [5000, 3000, 2000, 1000, 500, 250]; // Indian Monthly

  amounts.forEach((amount) => {
    let button = document.createElement("button");
    button.className = "amount-btn";
    button.innerText = isForeign ? `$${amount}` : `₹${amount}`;
    button.addEventListener("click", function () {
      selectAmount(this, amount, isForeign);
    });
    donationOptions.appendChild(button);
  });
}

function selectAmount(selectedButton, amount, isForeign) {
  document.querySelectorAll(".amount-btn").forEach((btn) => btn.classList.remove("active"));
  selectedButton.classList.add("active");

  let currencySymbol = isForeign ? "$" : "₹";
  document.getElementById("customAmount").value = amount;
  validateAmount();
}

function validateAmount() {
  let amount = document.getElementById("customAmount").value;
  let errorMsg = document.getElementById("error-msg");
  let totalServed = document.getElementById("totalServed");
  let isForeign = document.getElementById("foreign").checked;
  let minAmount = isForeign ? 10 : 200; // Minimum amount check

  if (amount < minAmount) {
    errorMsg.innerText = `Minimum donation amount ${isForeign ? "$10" : "INR 200"}`;
  } else {
    errorMsg.innerText = "";
  }

  let mealCost = isForeign ? 0.34 : 30;
  totalServed.innerText = Math.ceil(amount / mealCost);
}


function nextStep() {
  let amount = document.getElementById("customAmount").value;
  let errorMsg = document.getElementById("error-msg");

  if (!amount || amount < 200) {
    errorMsg.innerText = "Please enter a valid amount (Minimum INR 200)";
    return;
  }

  errorMsg.innerText = ""; // Clear error if valid
  document.getElementById("step1").classList.add("hidden"); // Hide Step 1
  document.getElementById("step2").classList.remove("hidden"); // Show Step 2
}

function prevStep() {
  document.getElementById("step2").classList.add("hidden"); // Hide Step 2
  document.getElementById("step1").classList.remove("hidden"); // Show Step 1
}

document.querySelector(".donateNow-btn").addEventListener("click", function () {
  let fullName = document.getElementById("fullName").value.trim();
  let email = document.getElementById("email").value.trim();
  let mobile = document.getElementById("mobile").value.trim();
  let country = document.getElementById("country").value.trim().toLowerCase();
  let zip = document.getElementById("zip").value.trim();

  // Validation
  if (!fullName || !email || !mobile || !country || !zip) {
    alert("All fields are required.");
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("Enter a valid email address.");
    return;
  }

  if (!/^\d{10,15}$/.test(mobile)) {
    alert("Enter a valid contact number (10-15 digits).");
    return;
  }

  if (!/^\d{4,10}$/.test(zip)) {
    alert("Enter a valid zip code.");
    return;
  }

  // Show the pop-up based on country selection
  if (country === "india" || country === "India") {
    showPopup("barcode");
  } else {
    showPopup("bank");
  }
});

function showPopup(type) {
  let popup = document.createElement("div");
  popup.className = "popup-overlay";
  popup.innerHTML = `
      <div class="popup-content">
          <span class="close-btn" onclick=" closePopup()">&times;</span>
          ${
            type === "barcode"
              ? `<img src="img/payment/TauseefPaymentBarcode.jpg" alt="Scan to Donate" class="barcode-img">`
              : `<p>Bank Details: Account No: 123456789, IFSC: ABCD1234, Bank: XYZ Bank</p>`
          }
      </div>
  `;
  document.body.appendChild(popup);

  if (type === "barcode") {
    setTimeout(() => {
      document.querySelector(
        ".popup-content"
      ).innerHTML = `<p>Thank you for your donation!</p> <span class="close-btn" onclick="closePopup()">&times;</span>`;
    }, 15000);
  }
}

function closePopup() {
  document.querySelector(".popup-overlay").remove();
}
