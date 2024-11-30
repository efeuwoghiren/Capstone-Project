async function registerUser() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const responseParagraph = document.getElementById("response");

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
        });

        const data = await response.json();
        console.log(data); // Log the data returned by the server for debugging

        if (response.ok) {
            responseParagraph.innerText = `${data.message}`;
            console.log("Success:", data);
            // Directly redirect after success without setTimeout for testing
            window.location.href = "/login"; // Try using window.location.href
        } else {
            responseParagraph.innerText = `${data.message}`;
            console.log("Error response:", data);
        }
    } catch (error) {
        console.error("Error during fetch:", error); // Log any errors that occur during fetch
    }
}

document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
});
