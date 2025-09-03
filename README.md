# MindEase - Private Mental Health Chat Application
A privacy-focused mental health chat application that provides users with a safe space to explore their thoughts and feelings through AI-powered conversations. Built with React, TypeScript, and DeepSeek AI integration.
## Features
- 🔒 Complete privacy - no data storage
- 🤖 Smart AI routing with DeepSeek integration
- 🌙 Dark theme optimized interface
- 📱 Responsive design
- ⚡ Real-time streaming responses
## Tech Stack
- React + TypeScript
- Express.js backend
- DeepSeek AI integration
- Tailwind CSS + Framer Motion
- Vite build system
## Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Add your DeepSeek API key to environment variables
4. Run development server: `npm run dev`
## Privacy First
MindEase processes all conversations client-side with zero storage, ensuring complete privacy and confidentiality.

Project Overview
MindEaseTherapistAI is a web-based conversational AI application designed to act as a virtual therapist. It provides a safe and anonymous space for users to express their thoughts and feelings. The application leverages the power of Large Language Models (LLMs) through the Gemini API to understand user input and provide supportive, empathetic, and thoughtful responses. The conversation history is maintained, allowing for a continuous and context-aware dialogue.

The frontend is built with simple HTML, CSS, and JavaScript, making it lightweight and easy to understand. The backend is a Python Flask server that handles communication with the Google Gemini API.

Key Features
Conversational AI Therapist: Engage in a text-based conversation with an AI designed to be supportive and understanding.
Anonymous & Safe: No user accounts or personal data storage, ensuring user privacy.
Context-Aware Conversations: The AI remembers the previous parts of the conversation to provide relevant and coherent responses.
Simple & Intuitive UI: A clean and straightforward chat interface for easy interaction.
Powered by Google Gemini: Utilizes Google's state-of-the-art language model for high-quality, human-like responses.
Tech Stack
Backend: Python, Flask
AI Model: Google Gemini Pro
Frontend: HTML, CSS, JavaScript
API Communication: google-generativeai Python library, fetch API (JavaScript)
Prerequisites
Before you begin, ensure you have the following installed:

Python 3.8+
pip (Python package installer)
A Google Gemini API Key. You can obtain one from Google AI Studio.
Installation and Setup
Follow these steps to get your local development environment set up and running.

Clone the Repository: Open your terminal and clone the repository to your local machine.

bash
git clone https://github.com/mozzdevv/MindEaseTherapistAI_replitt.git
cd MindEaseTherapistAI_replitt
Create a Virtual Environment (Recommended): It's good practice to create a virtual environment to manage project dependencies.

bash
 Show full code block 
# For macOS/Linux
python3 -m venv venv
source venv/bin/activate

# For Windows
python -m venv venv
.\venv\Scripts\activate
Install Dependencies: Install the required Python packages using the requirements.txt file.

bash
pip install -r requirements.txt
Set Up Environment Variables: The application requires your Google Gemini API key to be set as an environment variable. Create a file named .env in the root of the project directory.

I'll create the .env file for you.

New file: .env
+1
 GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"

Replace "YOUR_GOOGLE_GEMINI_API_KEY" with your actual API key.

Running the Application
Once the setup is complete, you can run the Flask application.

Start the Flask Server: Execute the main.py file from the root directory.

bash
python main.py
Access the Application: Open your web browser and navigate to the following address:

http://127.0.0.1:5000

You should now see the MindEaseTherapistAI chat interface and can start your conversation.

Project Structure
The project has a simple and organized structure.

plaintext
 Show full code block 
MindEaseTherapistAI_replitt/
├── .env                # Stores environment variables (needs to be created)
├── main.py             # The main Flask application file
├── requirements.txt    # Python dependencies
├── static/
│   └── style.css       # CSS for styling the web page
└── templates/
    └── index.html      # The main HTML file for the user interface
Code Explanation
main.py (Backend)
This is the core of the application.

Flask Setup: It initializes a Flask web server.
Environment Variable Loading: It uses python-dotenv to load the GEMINI_API_KEY from the .env file.
Gemini Model Initialization: It configures and initializes the gemini-pro model with a specific system instruction to guide its behavior as a therapist. The safety settings are adjusted to be less restrictive for a therapy context.
Routes:
@app.route('/'): This route serves the main index.html page.
@app.route('/chat', methods=['POST']): This is the API endpoint that the frontend calls. It receives the user's message and conversation history, sends it to the Gemini model, and returns the AI's response as JSON. Error handling is included for cases where the API call might fail.
templates/index.html (Frontend)
This file defines the structure of the web page.

HTML Structure: It contains a div for the chatbox, an input field for the user to type their message, and a button to send it.
JavaScript Logic: The <script> tag at the bottom contains all the client-side logic.
sendMessage() function: This function is triggered when the user clicks "Send" or presses "Enter".
It captures the user's message and displays it in the chatbox.
It constructs a history array from the current chat content.
It makes a fetch POST request to the /chat endpoint on the backend, sending the user's message and the conversation history.
It handles the response from the server, displaying the AI's message in the chatbox.
It includes loading indicators and error handling for a better user experience.
static/style.css (Styling)
This file contains all the CSS rules to style the chat interface, making it look clean and user-friendly. It styles the chat container, message bubbles, input area, and button.
