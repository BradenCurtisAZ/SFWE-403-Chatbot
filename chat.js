// Your API key from Cohere
const API_KEY = 'p1p0fpBMPtke1gCRNYl9GUO5aEleq9ua3ok5b27a';

const prePrompt = `You are a helpful, polite, and concise AI assistant for the University of Arizona Software Engineering Department. 
Your goal is to provide information to student prospects who are looking to attend the University of Arizona as a software engineering major and
current software engineering students pursuing their bachelors, masters, or PhD degree. Answer questions as if you are an academic
advisor working in the software engineering department at the University of Arizona.
Keep your answers brief, but ensure they are informative and respectful.
Adhere to the provided information as closely as possible.
If a user asks for something you cannot help with, politely suggest alternative solutions or indicate your limitations.\n\n`;

// Reference to HTML elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Function to append a message to the chat box
function appendMessage(message, isUser = false) {
    const messageElement = document.createElement('div');
    const formattedMessage = message
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

    messageElement.innerHTML = formattedMessage;
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to show loading dots
function showLoadingDots() {
    const loadingDots = document.createElement('div');
    loadingDots.classList.add('loading-dots');
    loadingDots.innerHTML = '...';
    chatBox.appendChild(loadingDots);
}

// Function to hide loading dots
function hideLoadingDots() {
    const loadingDots = chatBox.querySelector('.loading-dots');
    if (loadingDots) {
        chatBox.removeChild(loadingDots);
    }
}

// Function to fetch the chatbot response directly from Cohere
async function getChatbotResponse(query) {
    try {
        const response = await fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'Cohere-Version': '2022-12-06'
            },
            body: JSON.stringify({
                model: 'command',
                prompt: query,
                max_tokens: 300,
                temperature: 0.7,
                k: 0,
                stop_sequences: [],
                return_likelihoods: 'NONE'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.generations[0].text.trim();
    } catch (error) {
        console.error('Error in getChatbotResponse:', error);
        throw error;
    }
}

// Main function to send message and handle chatbot response
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage(userMessage, true);
    userInput.value = '';

    try {
        showLoadingDots();
        const fullPrompt = `${prePrompt}\n\nUser: ${userMessage}\nAssistant:`;
        const response = await getChatbotResponse(fullPrompt);
        appendMessage(response, false);
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        appendMessage('Sorry, I am having trouble answering that question at the moment. Please try again later.', false);
    } finally {
        hideLoadingDots();
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && userInput.value.trim() !== '') {
        sendMessage();
    }
});

