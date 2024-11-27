// Your API key from Cohere
const API_KEY = 'p1p0fpBMPtke1gCRNYl9GUO5aEleq9ua3ok5b27a';

// Reference to HTML elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
let memory = [];
let memoryCounter = 0; // Counter to keep track of memory index

// Define pre-prompt: Chatbot rules
const prePrompt = `You are a helpful, polite, and concise AI assistant for the University of Arizona Software Engineering Depratment. 
Your goal is to provide information to student prospects who are looking to attend the University of Arizona as a software engineering major and 
current software engineering sudents persuing their bachelors, masters, or PhD degree. Answer questions as if you are an acedemic 
advisor working in the software engineering department at the University of Arizona. 
Adhere to the provided information as closely as possible. 
Summarize information if a great portion of the data is irrelevant to the prompt.
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
            prompt: `Classify this following prompt into one of the following categories: "Transfer_Credit", "Admission_Information", "BS_Program", 
                "Course_Description", "MS_Program", "PHD_Program", "Undergrad_Technical_Electives", "FinancialAid", "Career_Opportunities", or "Research_Information":\n
            Your response should be only the full name of the category.\n
            For example, if the question is regarding admission information or is about declaring as an engineering major from someone who attends the university or is already in the college of engineering or about the people to talk to such as advisors respond with "Admission_Information".\n
            If the prompt is regarding classes or courses in the software engineering major program or for a specific year or semester respond with "BS_Program".\n
            If the propmt is about the descriptions of certain courses respond with "course_description"\n
            If the prompt is about technical electives for the undergraduate/bachelors degree program respond with "Undergrad_Technical_Electives"
            If the prompt is about financial aid or scholarship information respond with "FinancialAid"\n
            If the prompt is about transfer credit information, respond with "Transfer_Credit".\n
            If the prompt is about the MS or Master's Degree program respond with "MS_Program".\n
            If the prompt is about the PHD or Doctorate program respond with "PHD_Program".\n
            If the prompt is about career or job opportunities after graduation, respond with "Career_Opportunities".\n
            If the prompt is about research opportunities, respond with "Research_Information".\n
            If this is the second time you are asked to answer a question according to the context, use a different category than the one you used before.\n
            Here is the prompt and context: "${userMessage}"\n`,
            max_tokens: 10, // Expecting only one word response
            temperature: 0.3,
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
            max_tokens: 1000, // Adjust as needed
            temperature: 0.3,
            api_version: '2022-12-06',
        }),
    });
    const data = await response.json();
    console.log(data);
    return data.text.trim();
}

// Main function to send message and handle chatbot response
async function sendMessage() {
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
        try {
            console.log(`Attempting to fetch: data/${category}.txt`);
            const response = await fetch(`data/${category}.txt`);
            documentText = await response.text();
            console.log(`Fetched Document:`, documentText);
        } catch (error) {
            console.error('Error loading file:', error);
        }
        
        memory[memoryCounter] = `User: ${userMessage}\nCategory: ${category}\n`;
        // Step 3: Formulate full prompt with selected document
        const fullPrompt = `${prePrompt}\n\n${memory}\n\n${documentText}\n\nAssistant:`;
        //console.log(fullPrompt);

        // Step 4: Get final response
        const chatbotResponse = await getChatbotResponse(fullPrompt);

        // Step 5: Append the response to the chat
        appendMessage(chatbotResponse, false);

        // Update memory and increment memoryCounter
        memory[memoryCounter] = `User: ${userMessage}\nCategory: ${category}\nAssistant: ${chatbotResponse}\n`;
        memoryCounter++;
        if (memoryCounter > 4){
            memoryCounter = 0;
        }
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
sendButton.addEventListener('click', function () {
    if (userInput.value.trim() !== '') {
        sendMessage();
    }
});
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (userInput.value.trim() !== '') {
            sendMessage();
        }
    }
});
