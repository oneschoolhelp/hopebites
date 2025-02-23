document.addEventListener("DOMContentLoaded", function () {
    // Ensure Step 1 is visible at the start
    document.getElementById("step1").classList.remove("hidden");
    document.getElementById("step2").classList.add("hidden");

    });

    document.addEventListener("DOMContentLoaded", function () {
        toggleDonationType('once'); // Set default donation type
    });
    
    function toggleDonationType(type) {
        document.querySelectorAll('.donate-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.donate-btn[onclick="toggleDonationType('${type}')"]`).classList.add('active');
    
        let donationOptions = document.getElementById('donation-options');
        donationOptions.innerHTML = '';
    
        let amounts = (type === 'once')
            ? [50000, 25000, 100000, 5000, 2500, 1000]
            : [5000, 3000, 2000, 1000, 500, 250];
    
        amounts.forEach(amount => {
            let button = document.createElement('button');
            button.className = 'amount-btn';
            button.innerText = amount.toLocaleString();
            button.onclick = () => selectAmount(amount);
            donationOptions.appendChild(button);
        });
    }
    
    function selectAmount(amount) {
        
        document.getElementById('customAmount').value = amount;
        validateAmount();
    }
    
    function validateAmount() {
        let amount = document.getElementById('customAmount').value;
        let errorMsg = document.getElementById('error-msg');
        let totalServed = document.getElementById('totalServed');
    
        if (amount < 200) {
            errorMsg.innerText = "Minimum donation amount INR 200";
        } else {
            errorMsg.innerText = "";
        }
    
        totalServed.innerText = Math.ceil(amount / 30);
    }
    
    function nextStep() {
        document.getElementById('step1').classList.add('hidden'); // Hide Step 1
        document.getElementById('step2').classList.remove('hidden'); // Show Step 2
    }
    
    function prevStep() {
        document.getElementById('step2').classList.add('hidden'); // Hide Step 2
        document.getElementById('step1').classList.remove('hidden'); // Show Step 1
    }
    