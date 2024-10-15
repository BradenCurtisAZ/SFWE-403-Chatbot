// Your API key from Cohere
const API_KEY = '3Z8DYRK8udacxmpkcTCBK8F3h36NoxD3bxhXxzQw';

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
If a user asks for something you cannot help with, politely suggest alternative solutions or indicate your limitations.\n\n
Use the following documents as context when answering questions:
Here is the Software Engineering 4 Year Plan document that shows the course breakdown by semester for the first four years under the
software engineering major. Here are the document contents:
B.S. in Software Engineering 
Catalog Year 2024-25
Below is the advised sequence of courses for this degree program on Main Campus as of 10/16/2023.Official degree requirements and course prerequisites are in the University General Catalog; prerequisites are subject to change. Advanced Standing is required for 300- and 400-level engineering courses (see your academic advisor for details).

Here is the syntax for the courses within this document:
Course Number and Title  # Units # Prerequisites/Enrollment Requirements 

Here are the courses for each semester:
1st Semester:
MATH 122A/B or MATH 125 Calculus I with Applications # 5/3 # Appropriate Math Placement
*CHEM 151 Chemical Thinking I or CHEM 161/163 # 4 # Appropriate Math Placement 
ENGL 101 or 107 or 109H First-Year Composition # 3 # N/A
ENGR102A/B Introduction to Engineering or ENGR 102 # 3 # ENGR102A: MATH 112 ENGR102B: Pre- or 3 Co-requisite of MATH 112 or higher; First-Year Status; College of Engineering Major
UNIV 101 Intro to the General Education Experience # 1 # N/A
Semester Total: 14/16 units
2nd Semester:
MATH 129 Calculus II # 3 # MATH 122B or 125 with C or higher 
SFWE 101 Introduction to Software Engineering # 3 # MATH 112 or higher with C or better 
ECE 101 Programming I or ECE 175 Computer Programming for Engineering Applications # 3/4 # ECE 101: Math 112; ECE175: Concurrent Enrollment or completion of MATH 122B or 125 
ENGL 102 or 108 First-Year Composition # 3 # ENGL 101 or ENGL 107 
*CHEM 152 Chemical Thinking II or CHEM 162/164 or MSE 110 Solid State Chemistry or MCB 181R/L Intro Biology I # 4 # CHEM 152 and MSE 110: CHEM 151 or 141/143 or 161/163; MCB181R/L: Appropriate Math Placement level
Semester Total: 16/17 units
3rd Semester:
MATH 243 Discrete Mathematics in Computer Science # 3 # MATH 122B or 125 or 129 (transfer credit ok)
*PHYS 141 Introductory Mechanics or PHYS 161H # 4 # MATH 122B or 125 or Appropriate Math Placement Level
ECE 201 Programming II or ECE 275 Computer Programming for Engineering Applications II # 3 # ECE 201: Pre MATH 112; ECE 101 with C or
ECE 201 Programming II or ECE 275 Computer Programming for Engineering Applications II
3 higher; ECE 275: Major ECE or SFE. ECE 175 or CSE 101
General Education: Exploring Perspectives (Artist) # 3 # N/A
General Education: Exploring Perspectives (Humanist) # 3 # N/A
Semester Total: 16 units
4th Semester:
SIE 277 Object-Oriented Modeling and Design # 3 # ECE 175 or CSC 110
ECE 274A Digital Logic # 4 # ECE 175; Concurrent Enrollment or completion of MATH 129
SFWE 201 Software Engineering Sophomore Colloquium # 1 # SFWE 101 or ECE 175
PHYS 241 Introductory Electricity and Magnetism or PHYS 261H # 4 # HYS 241 or 261H: PHYS 141 or 140 or 161H; MATH 129 or Appropriate Math Placement Level
MATH/STAT Elective - Consult with faculty advisor # 3 # Appropriate Math Placement Level
Semester Total: 15 units
5th Semester:
SIE 305 Introduction to Engineering Probability and Statistics # 3 # N/A
SFWE 301 Software Requirements Analysis and Test (Fall Only) # 3 # N/A
CSC 355 Discrete Structures and Basic Algorithms or CSC 345 Analysis of Discrete Structure # 3 # N/A
CSC 252 Computer Organization or ECE 369A Fundamentals of Computer Organization (Fall Only) # 3 # N/A
General Education: Exploring Perspectives (Social Scientist) # 3 # N/A
Semester Total: 15/16 units
6th Semester:
SFWE 302 or 405 Software Architecture and Design (Spring Only) # 3 # N/A
SFWE 401 Software Assurance and Security (Spring Only) # 3 # N/A
ECE 311 Engineering Ethics and Contemporary Issues # 1 # N/A
Technical Elective # 3 # Consult with faculty advisor
Technical Elective # 3 # Consult with faculty advisor
General Education: Building Connections # 3 # N/A
Semester Total: 16
7th Semester:
SFWE 403 Software Project Management (Fall Only) # 3 # N/A
ENGR 498A Interdisciplinary Capstone # 3 # Senior Status
Technical Elective # 3 # Consult with faculty advisor
Technical Elective # 3 # Consult with faculty advisor
General Education: Building Connections # 3 # N/A
Semester Total: 15
8th Semester:
SFWE 402 DevOps (Spring Only) # 4 # N/A
Technical Elective # 1-3 # Consult with faculty advisor for course approval
SFWE 491 Software Preceptor # 1 # N/A
ENGR 498B Interdisciplinary Capstone # 3 # Senior Status
General Education: Building Connections # 3 # N/A
UNIV 301 General Education Portfolio # 1 # N/A
Semester Total: 13/15
\n\n`;

// Initialize conversation history with the pre-prompt
let conversationHistory = prePrompt;

// Function to append a message to the chat box
// Function to append a message to the chat box
function appendMessage(message, isUser = false) {
    const messageElement = document.createElement('div');

    // Replace double asterisks with <strong> tags for bold text
    const formattedMessage = message
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Replace bold markers
        .replace(/\n/g, '<br>'); // Replace newlines with <br> tags

    messageElement.innerHTML = formattedMessage; // Use innerHTML to allow HTML formatting
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Function to handle sending messages to Cohere API
async function sendMessage() {
    const userMessage = userInput.value;
    appendMessage(userMessage, true);
    userInput.value = '';

    // Append the new user message to the conversation history
    conversationHistory += `User: ${userMessage}\n`;

    try {
        const response = await fetch('https://api.cohere.ai/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'command-xlarge-nightly',
                prompt: conversationHistory + "Bot:",
                max_tokens: 500,
                temperature: 0.8,
                api_version: '2022-12-06', // Specify a valid API version
            }),
        });

        const data = await response.json();
        console.log('API Response:', data); // Log response for debugging
        console.log("API Text:" + data.text);
        
        const botMessage = data.text.trim();
        appendMessage(botMessage);

        // Append the bot's response to the conversation history
        conversationHistory += `Bot: ${botMessage}\n`;

    } catch (error) {
        console.error('Error in API call:', error);
        appendMessage('Error occurred. Please try again.');
    }
}

// Add event listener to the button
sendButton.addEventListener('click', sendMessage);

// Add event listener to allow 'Enter' key submission
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
