// Your API key from Cohere
const API_KEY = 'p1p0fpBMPtke1gCRNYl9GUO5aEleq9ua3ok5b27a';

// Reference to HTML elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Define pre-prompt: Chatbot rules
const prePrompt = `You are a helpful, polite, and concise AI assistant for the University of Arizona Software Engineering Depratment. 
Your goal is to provide information to student prospects who are looking to attend the University of Arizona as a software engineering major and
current software engineering sudents persuing their bachelors, masters, or PhD degree. Answer questions as if you are an acedemic
advisor working in the software engineering department at the University of Arizona.
Keep your answers brief, but ensure they are informative and respectful.
Adhere to the provided information as closely as possible.
Any reference to SFWE is the Software Engineering major at the University of Arizona.
If a user asks for something you cannot help with, politely suggest alternative solutions or indicate your limitations.
If you cannot find the answer in the used dataset, do not answer under any circumstance.\n\n
\n\n`;

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

// Function to get category from Cohere API
async function getCategory(userMessage) {
    console.log('getCategory called');
    const response = await fetch('https://api.cohere.ai/generate', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'command-xlarge-nightly',
            prompt: `Classify this following question into one of the following categories: "Transfer_Credit", "Admission_Information", "BS_Program", 
                "Course_Description", "MS_Program", "PHD_Program", "Undergrad_Technical_Electives", "SFWE4YP", "Career_Opportunities", or "Research_Information":\n
            Your response should be only the full name of the category.\n
            For example, if the question is regarding admission information to the University or college of engineering respond with "Admission_Information".\n
            If the question is about declaring as an engineering major from someone who attends the university or is already in the college of engineering, respond with "BS_Program".\n
            If the question is regarding classes or coursework in the software engineering major respond with "SFWE4YP".\n
            If the question is about transfer credit information respond with "Transfer_Credit".\n
            If the question is about the MS program respond with "MS_Program".\n
            If the question is about the PHD program respond with "PHD_Program".\n
            If the question is about career opportunities for graduates of the software engineering BS, respond with "Career_Opportunities".\n
            If the question is about research opportunities, respond with "Research_Information".\n
            Here is the question and context: "${userMessage}"\nCategory:`,
            max_tokens: 8, // Expecting only one word response
            temperature: 0,
            api_version: '2022-12-06',
        }),
    });

    const data = await response.json();
    //console.log(data.message);  // Log the full data object to see the structure
    //console.log(data.generations[0].text.trim().toLowerCase());
    return data.text.trim().toLowerCase();
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

// Function to get final response from Cohere API
async function getChatbotResponse(fullPrompt) {
    const response = await fetch('https://api.cohere.ai/generate', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'command-xlarge-nightly',
            prompt: fullPrompt,
            max_tokens: 800, // Adjust as needed
            temperature: 0.7,
            api_version: '2022-12-06',
        }),
    });
    const data = await response.json();
    console.log(data);
    return data.text.trim();
}

// Main function to send message and handle chatbot response
async function sendMessage() {
    let memory = [];
    let memoryCounter = 0;
    const userMessage = userInput.value;
    appendMessage(userMessage, true);
    userInput.value = '';

    memory[memoryCounter] = `User: ${userMessage}\n`;

    try {
        showLoadingDots(); // Show loading spinner

        // Step 1: Get category
        const category = await getCategory(memory);

        console.log('category: ' + category);
        // Step 2: Select appropriate document based on category
        let documentText = '';
        fetch(`data/${category}.txt`)
            .then((response) => response.text())
            .then((data) => {
                documentText = data;
            })
            .catch((error) => console.error('Error loading file:', error));

        // Step 3: Formulate full prompt with selected document
        const fullPrompt = `${prePrompt}\n\n${memory}\n\n${documentText}\n\nUser: ${userMessage}\nAssistant:`;

        // Step 4: Get final response
        const chatbotResponse = await getChatbotResponse(fullPrompt);

        // Step 5: Append the response to the chat
        appendMessage(chatbotResponse, false);

        // Update memory and increment memoryCounter
        memory[memoryCounter] += `Assistant: ${chatbotResponse}\n`;
        memoryCounter++;
    } catch (error) {
        console.error('Error fetching from Cohere API:', error);
        appendMessage(
            'Sorry, I am having trouble answering that question at the moment. Please try again later.',
            false
        );
    } finally {
        hideLoadingDots(); // Hide loading dots
    }
}

// Event listener for send button
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (userInput.value.trim() !== '') {
            sendMessage();
        }
    }
});
