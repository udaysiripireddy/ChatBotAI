document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("chat-input");
    const messageContainer = document.getElementById("chat-messages");
    const sendBtn = document.getElementById("send-btn");

    sendBtn.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") sendMessage();
    });

    async function sendMessage() {
        const userInput = inputField.value.trim();
        if (!userInput) return;

        appendMessage("user", userInput);
        inputField.value = "";

        try {
            const response = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: userInput })
            });

            const data = await response.json();
            appendMessage("bot", data.response || "No response received.");
        } catch (error) {
            appendMessage("bot", "Error fetching response.");
        }
    }

    function appendMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message", sender);
        messageDiv.innerText = text;
        messageContainer.appendChild(messageDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
});
function toggleVisibility() {
    let docs = document.getElementById("docs");
    if (docs.style.display === "none") {
        docs.style.display = "block";
    } else {
        docs.style.display = "none";
    }
}
