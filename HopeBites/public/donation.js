document.addEventListener("DOMContentLoaded", function () {
  async function submitDonation(event) {
    event.preventDefault();

    // Get values from form fields
    const donationCountry =
      document.querySelector('input[name="country"]:checked')?.value || "";
    const donationType =
      document.querySelector(".donate-btn.active")?.textContent.trim() ||
      "Once";
    const amount =
      document.getElementById("customAmount").value || getSelectedAmount();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const contactNo = document.getElementById("mobile").value.trim();
    const userCountry = document.getElementById("country").value.trim();
    const zipCode = document.getElementById("zip").value.trim();

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !contactNo ||
      !userCountry ||
      !zipCode ||
      !amount
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all required fields before proceeding.",
      });
      return;
    }

    // Prepare data for API request
    const donationData = {
      full_name: fullName,
      email: email,
      contact_no: contactNo,
      country: userCountry,
      zip_code: zipCode,
      donation_type: donationType,
      donation_country: donationCountry,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch("http://localhost:5000/api/donate/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Donation Successful!",
          text: "Thank you for your generous donation!",
        }).then(() => {
          document.getElementById("donationForm").reset();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Donate",
          text: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong on our end. Please try again later.",
      });
    }
  }

  // Ensure the "Donate Now" button exists before attaching the event listener
  const donateBtn = document.querySelector(".donateNow-btn");
  if (donateBtn) {
    donateBtn.addEventListener("click", submitDonation);
  }

  // Function to get selected donation amount (fallback if custom amount is not used)
  function getSelectedAmount() {
    const selectedButton = document.querySelector(
      ".donation-options .selected"
    );
    return selectedButton ? selectedButton.getAttribute("data-amount") : "0";
  }
});
