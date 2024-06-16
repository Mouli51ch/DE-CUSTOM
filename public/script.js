document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    let chatMessages = [];

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        appendMessage('user', message);
        userInput.value = '';

        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: message
        })

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        // const data = await response.json(); // Parse JSON response
        // const botResponse = data.message;
        // Simulate bot response (replace with actual API call)
        setTimeout(function() {                     ////////////////////////////////////////////////////////////
            const botResponse = 'This is a bot response.';
            appendMessage('bot', botResponse);
        }, 500);
    }

    function appendMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.textContent = text;
        messageElement.classList.add(sender);
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
