# MindEaseTherapistAI 🧠✨
MindEaseTherapistAI is a web-based conversational AI application designed to act as a virtual therapist. It provides a safe and anonymous space for users to express their thoughts and feelings, leveraging the powerful DeepSeek Coder model to deliver supportive, context-aware, and empathetic responses.

The application consists of a simple, intuitive frontend built with HTML, CSS, and JavaScript, and a robust Python backend using the Flask framework to handle the logic and communication with the DeepSeek API.

# 🌟 Key Features

🤖 Advanced Conversational AI: Powered by the DeepSeek Coder model for nuanced and human-like therapeutic conversations.
 
🔒 Anonymous & Private: No user accounts or personal data are stored. Conversations are session-based and private.
 
📚 Context-Aware Dialogue: The AI remembers the conversation history to provide coherent and relevant responses, creating a more natural flow.
 
💻 Simple & Clean UI: A minimalist chat interface allows users to focus on the conversation without distractions.
 
🐍 Python & Flask Backend: A robust and scalable backend that is easy to understand and extend.

# 🛠️ Tech Stack
Backend: Python, Flask

AI Model: DeepSeek Coder

Frontend: HTML, CSS, JavaScript

API Communication: Python requests library, fetch API (JavaScript)

Environment Management: python-dotenv

# ⚙️ Prerequisites & Setup
Follow these steps to get your local development environment set up and running.

Prerequisites

Python 3.8+

pip (Python package installer)

A DeepSeek API Key. You can obtain one from the DeepSeek Platform.

Step 1: Clone the Repository

Open your terminal and clone the repository to your local machine.

bash
git clone https://github.com/mozzdevv/MindEaseTherapistAI_replitt.git
cd MindEaseTherapistAI_replitt
Use code with care. Learn more
Step 2: Create a Virtual Environment (Recommended)
Using a virtual environment is a best practice to manage project dependencies and avoid conflicts.

bash
# For macOS/Linux
python3 -m venv venv
source venv/bin/activate

# For Windows
python -m venv venv
.\venv\Scripts\activate
Use code with care. Learn more
Step 3: Install Dependencies
Install the required Python packages listed in the requirements.txt file.

bash
pip install -r requirements.txt
Use code with care. Learn more
Step 4: Set Up Environment Variables
The application requires your DeepSeek API key to function. The repository expects a file named .env in the root of the project directory.

I'll create the .env file for you.

New file: .env
+1
DEEPSEEK_API_KEY="YOUR_DEEPSEEK_API_KEY"

Use code with care. Learn more
Important: Replace "YOUR_DEEPSEEK_API_KEY" with your actual API key obtained from the DeepSeek Platform. The .gitignore file should be configured to ignore .env to prevent accidentally committing your secret key.

# ▶️ Running the Application
Start the Flask Server: With your virtual environment activated, run the main.py file.

bash
python main.py
Use code with care. Learn more
You should see output indicating that the Flask server is running, typically on port 5000.

Access the Application: Open your web browser and navigate to:

http://127.0.0.1:5000

The MindEaseTherapistAI chat interface will load, and you can begin your conversation.

# 📂 Project Structure Explained

plaintext

MindEaseTherapistAI_replitt/
 
├── .env                # Stores environment variables like API keys (you create this)
 
├── main.py             # The main Flask application: handles routing and API logic
 
├── requirements.txt    # A list of Python dependencies for the project
 
├── static/
 
│   └── style.css       # All CSS rules for styling the frontend
 
└── templates/
  
    └── index.html      # The HTML structure and client-side JavaScript for the chat UI



main.py (Backend Logic)

Initialization: Sets up the Flask app and loads the DEEPSEEK_API_KEY from the .env file.

# DeepSeek Configuration:

It prepares the necessary headers and payload for the DeepSeek API endpoint (https://api.deepseek.com/chat/completions).
 
A crucial system instruction is provided within the messages payload, guiding the model to act as a "therapist" who is "supportive, empathetic, and avoids giving medical advice." This shapes the AI's personality.
 
Routing:
 
@app.route('/'): Serves the main index.html page to the user's browser.
 
@app.route('/chat', methods=['POST']): This is the core API endpoint. The frontend sends a POST request here with the user's message and the conversation history. The backend constructs the appropriate payload and sends a request to the DeepSeek API, then streams the response back to the client.
 
templates/index.html (Frontend Logic)
 
HTML Structure: Defines the chat window, message list, user input field, and send button.
 
Client-Side JavaScript:
 
sendMessage(): This function orchestrates the entire frontend interaction.
 
It captures the user's input and displays their message in the chat window.
 
It constructs a history array by reading the existing messages from the chat UI. This is how context is maintained.
 
It makes an asynchronous fetch request to the /chat backend endpoint, sending the new message and the history.
 
It handles the streaming response from the server, appending the AI's message to the chat window word-by-word for a dynamic, real-time effect.
 
Includes error handling to inform the user if the backend or AI service fails.

# 🤝 Contributing
Contributions are highly encouraged! If you have ideas for new features, find a bug, or want to improve the code, please feel free to open an issue or submit a pull request.

# Fork the Project
 
Create your Feature Branch (git checkout -b feature/NewFeature)
 
Commit your Changes (git commit -m 'Add some NewFeature')
 
Push to the Branch (git push origin feature/NewFeature)
 
Open a Pull Request

# 📄 License
This project is open-source. Feel free to use, modify, and distribute it. Please provide attribution if you build upon it.

