document.querySelector("#loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    
    let response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    let data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
    } else {
        alert("Invalid username or password");
    }
});
