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
  document.getElementById("step1").classList.add("hidden"); // Hide Step 1
  document.getElementById("step2").classList.remove("hidden"); // Show Step 2
}

function prevStep() {
  document.getElementById("step2").classList.add("hidden"); // Hide Step 2
  document.getElementById("step1").classList.remove("hidden"); // Show Step 1
}
