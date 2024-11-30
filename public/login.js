async function validateAndLogin() {
    // Get the form values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Clear previous error message
    errorMessage.textContent = "";

    // Check if either field is empty
    if (email === "" || password === "") {
        errorMessage.textContent = "Both fields are required!";
        console.log("Validation failed: Fields are empty");
        return; // Stop further execution if validation fails
    }

    // If the form is valid, proceed to make an API call to validate the user (for example)
    try {
        const response = await fetch("/api/login", {  // Replace this with your actual API endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        console.log(data);  // Log the server's response for debugging

        if (response.ok) {
            console.log("Login successful:", data);
            // Redirect to the main page after successful login
            window.location.href = "/main";  // Change this to the desired redirect URL
        } else {
            errorMessage.textContent = data.message || "Login failed!";
            console.log("Login error:", data);
        } else {
            responseParagraph.innerText = `${data.message}`;
            console.log("Error response:", data);
        }
    } catch (error) {
        console.error("Error during fetch:", error); // Log any errors that occur during fetch
    }
}

// Bind the form submission event
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    validateAndLogin();  // Call the validation and login function
});
