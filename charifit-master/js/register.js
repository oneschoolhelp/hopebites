document.addEventListener("DOMContentLoaded", function () {
  // Ensure Step 1 is visible at the start
  document.getElementById("step1").classList.remove("hidden");
  document.getElementById("step2").classList.add("hidden");
  toggleDonationType("once"); // Set default donation type
});

function toggleDonationType(type) {
  document
    .querySelectorAll(".donate-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector(`.donate-btn[onclick="toggleDonationType('${type}')"]`)
    .classList.add("active");

  let donationOptions = document.getElementById("donation-options");
  donationOptions.innerHTML = "";

  let amounts =
    type === "once"
      ? [50000, 25000, 10000, 5000, 2500, 1000]
      : [5000, 3000, 2000, 1000, 500, 250];

  amounts.forEach((amount) => {
    let button = document.createElement("button");
    button.className = "amount-btn";
    button.innerText = amount.toLocaleString();
    button.addEventListener("click", function () {
      selectAmount(this, amount); // Pass `this` (the button itself) and `amount`
    });
    donationOptions.appendChild(button);
  });
}

function selectAmount(selectedButton, amount) {
  // Remove 'active' class from all amount buttons
  document.querySelectorAll(".amount-btn").forEach((btn) => btn.classList.remove("active"));

  // Add 'active' class to the selected button
  selectedButton.classList.add("active");

    // Set selected amount
  document.getElementById("customAmount").value = amount;
  validateAmount();
  
}

function validateAmount() {
  let amount = document.getElementById("customAmount").value;
  let errorMsg = document.getElementById("error-msg");
  let totalServed = document.getElementById("totalServed");

  if (amount < 200) {
    errorMsg.innerText = "Minimum donation amount INR 200";
  } else {
    errorMsg.innerText = "";
  }

  totalServed.innerText = Math.ceil(amount / 30);
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
  if (country === "india" || country === "India" || country === "IN") {
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
          <span class="close-btn" onclick="closePopup()">&times;</span>
          ${type === "barcode" ? `<img src="img/payment/TauseefPaymentBarcode.jpg" alt="Scan to Donate" class="barcode-img">` : `<p>Bank Details: Account No: 123456789, IFSC: ABCD1234, Bank: XYZ Bank</p>`}
      </div>
  `;
  document.body.appendChild(popup);

  if (type === "barcode") {
      setTimeout(() => {
          document.querySelector(".popup-content").innerHTML = `<p>Thank you for your donation!</p> <span class="close-btn" onclick="closePopup()">&times;</span>`;
      }, 15000);
  }
}

function closePopup() {
  document.querySelector(".popup-overlay").remove();
}
