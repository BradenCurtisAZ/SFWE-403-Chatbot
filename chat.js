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
If a user asks for something you cannot help with, politely suggest alternative solutions or indicate your limitations.\n\n
\n\n`;

let admission = `
Here is information regarding admissions

Link to apply to University of Arizona: https://www.arizona.edu/admissions

Here is the evaluation criteria for applications for the University of Arizona College of Engineering:
The University of Arizona and the College of Engineering perform a comprehensive review of students applying for admission. In particular, the following will be considered:
-Core GPA as defined by the Arizona Board of Regents (minimum 3.0 required for College of Engineering, Admissions GPA for Software Engineering: 2.25)
-Math and science completion/grades
-Senior year coursework
-Rigor of high school classes (AP, IB, honors, etc.)
-Optional standardized test score (ACT or SAT)
-Optional personal statement

Here is the application process for the University of Arizona College of Engineering:
-Complete the University of Arizona online application, and indicate Engineering (All Majors) as your intended degree. You must also select a second-choice major.
-Self-report your grades, referencing an unofficial transcript or a copy of your report cards. Prior to the start of your freshman year, the University will verify your coursework pending submission of an official transcript.

You will receive your admission decision via email and a paper admissions packet.

Once you have been admitted to the College of Engineering, log in to the NextSteps Center to do the following:
-Take the ALEKS math placement exam when available and, if needed, the writing and second language placement exams. Learn about the importance of math placement for engineering.
-Complete the required registration for New Student Orientation.
-Fill out the Residence Life application to guarantee your space in on-campus housing.
-Submit your immunization records.
-Send final official high school transcripts, when prompted by UA Admissions.

More information regarding the evaluation criteria and application process can be found here: https://engineering.arizona.edu/undergrad-admissions/freshmen
`;

let declaration = `

Here is the declaring an engineering major website, this website only applies to engineering majors attending the UA, non-declared engineering majors attending the UA and UA students outside the college of engineering: https://advising.engr.arizona.edu

Here are the contents of the declaring engineering major website:

Engineering majors, No Major Selected Engineering students, and UA students outside the College of Engineering may submit an application for admission into an Engineering major after completion of the following:

-Calculus I with a grade of C or better
-12 or more UA credits of coursework within the Engineering curricula, with a GPA that meets the requirements for advanced standing in the requested major. (See chart below.) If Calculus I was completed with a C, grades in required supporting coursework must be higher.
-The courses below represent the more common courses taken by UA Engineering students. For a list of courses specific to each major, please review the four year plans or contact the advisor for the major .

Acceptable Supporting Coursework:
MATH 122 A/B or 125: Calculus I: 5 or 3 units
MATH 129: Calculus II: 3 units
CHEM 151: General Chemistry I: 4 units
CHEM 152: General Chemistry II: 4 units
MSE 110: Solid State Chemistry: 4 units
MCB 181: Introductory Biology: 4 units
PHYS 141: Introductory Mechanics: 4 units
ENGR 102: Introduction to Engineering: 3 units
ECE 175: Programming: 3 units
ENGL 102, 108 , or 109H: English Composition: 3 units

Admissions GPA:
Software Engineering: 2.25

Starting the Application Process:
Once you have met the admissions requirements listed above, click on the major link below to begin the change of major application process.

The Academic Affairs Office will notify you of the results via your official UA email address within seven to 10 work days.

If you have any questions about the application process please email engr-advising@email.arizona.edu. Include your name, student ID number and intended major.

The advisors for Software Engineering Undergraduate program are Juliana Lincoln for last names A-J and Christina Hornett for last names K-Z.

The advisor for Software Engineering Graduate program is Liza Soto.

If you would like to delete an existing Engineering major from your current academic program, please email engr-advising@email.arizona.edu using your UA Catmail account. Include your name and student ID number, and specifically state the Engineering degree you wish to delete. If you wish to delete a major outside of Engineering, please contact the major advisor for assistance.

Selecting Desired Major:
NetID Login Required
*Important note: All students must have a UA cumulative grade point average of at least 2.0 to be eligible to change degree programs or move into the College of Engineering. Strong grades in required math, science and engineering classes are good indicators of success in all of our degree programs. You can be denied even if you meet the GPA requirements for the chosen degree program if your math, science and engineering classes are not sufficiently strong.
You must be a continuing UA student to use this form. If you are a new, prospective or incoming transfer or freshman student, please visit our new student admission webpage for academic requirements. You must have completed at least 12 UA engineering degree required units to be considered for admission to an Engineering major. Grades of D or E, or repeated use of GRO’s in math/science/engineering classes will diminish your chances for admission.
Include only grades for classes taken at the University of Arizona. Do not include transfer courses.
`;
let SFWE4YP = `
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
`;

let research_info = `
Research Opportunities and Information for Software Engineering Majors at the University of Arizona:

Ongoing research at the University of Arizona involving software engineering includes:
Autonomous systems and robotics
Communications, coding and information theory
Computer architecture and cloud/distributed computing
Data analytics, informatics and machine learning
Embedded systems
Wireless networking, security and systems

There are also opportunities with the Systems & Industrial Engineering (SIE) department.
Partnering with the Arizona Department of Transportation, renowned researchers in SIE are developing 
technology for connected vehicles and making emergency response quicker. Working closely with 
the Department of Homeland Security and the National Center for Border Security and Immigration, 
they are creating an autonomous surveillance system to help secure the U.S.-Mexico border. 
And, cooperating with Air Force Research Laboratory and an international alliance, they are 
developing a cyberinfrastructure to monitor satellites and manage traffic in space.

SIE's focus areas include:
Data Analytics, Informatics and Machine Learning
Energy, Water, Environment and Sustainability
Health Care Systems
Human Factors and Sociotechnical Systems
Optimization
Smart Transportation and Manufacturing Logistics
Software Engineering
Space, Defense and Security

Much of SIE’s transportation engineering research takes place at the UA’s interdisciplinary 
Transportation Research Institute, which addresses the mobility, safety and environmental 
challenges of a rapidly evolving transportation ecosystem.
Further facilitating SIE discovery are a number of multidisciplinary labs, including the 
Space Systems Engineering Lab, which is supporting to the OSIRIS-REx Asteroid Sample Return 
Mission in the Lunar & Planetary Laboratory.
`;

let career_info = `
Career Opportunities and Information for Software Engineering Majors at the University of Arizona:

Software engineers build the technological infrastructure for our increasingly connected 
world. They are in high demand to solve complex engineering problems across industries 
and government.

They work in areas such as:
aerospace and space exploration
automation and connectivity
biomedical modeling and devices
data, computing and networking
human and intelligent systems
natural and fabricated environments

With an interdisciplinary curriculum that covers large-scale product development and 
incorporates intensive real-world design, the University of Arizona BS in software 
engineering prepares students for some of the most coveted technology jobs in the world.

Software engineering graduates work in corporate and government settings as well as 
in research and as independent consultants. They become software and application 
architects and developers, project managers, network engineers, and business owners. 
Software engineers are in high demand across industries with employers such as Google, 
Amazon, Microsoft, Snap Inc., Medtronic, Johnson & Johnson, Raytheon, General Dynamics, 
Honeywell and Wells Fargo. The list, at home and abroad, is limitless.
`;

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
                "Course_Description", "MS_Program", "PHD_Program", "Undergrad_Technical_Electives", "SFWE4YP", "Career_Opportunities", or "Research_Opportunities":\n
            Your response should be only the full name of the category.\n
            For example, if the question is regarding admission information to the University or college of engineering respond with "Admission_Information".\n
            If the question is about declaring as an engineering major from someone who attends the university or is already in the college of engineering, respond with "BS_Program".\n
            If the question is regarding classes or coursework in the software engineering major respond with "SFWE4YP".\n
            If the question is about transfer credit information respond with "Transfer_Credit".\n
            If the question is about the MS program respond with "MS_Program".\n
            If the question is about the PHD program respond with "PHD_Program".\n
            If the question is about career opportunities for graduates of the software engineering BS, respond with "Career_Opportunities".\n
            If the question is about research opportunities, respond with "Research_Opportunities".\n
            Here is the question: "${userMessage}"\nCategory:`,
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
        const category = await getCategory(userMessage);

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
        const fullPrompt = `${prePrompt}\n\n${documentText}\n\nUser: ${userMessage}\nAssistant:`;

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
