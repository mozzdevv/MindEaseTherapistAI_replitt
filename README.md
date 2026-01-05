# MindEase - Serene AI Therapist

MindEase is a privacy-focused, AI-powered mental health chat application. It provides a safe, anonymous space for users to explore their thoughts and feelings with a virtual companion.

![MindEase Screenshot](https://raw.githubusercontent.com/mozzdevv/MindEaseTherapistAI_replitt/main/client/public/screenshot-placeholder.png)

## 🌟 Features

- **DeepSeek AI Integration**: Powered by the `deepseek-chat` model for empathetic and intelligent therapeutic responses.
- **Serene Focus Design**: A glassmorphism-inspired UI with calming pastel gradients (Sage Green, Lavender Mist) and smooth micro-interactions.
- **Privacy First**: No account required. Zero database storage of conversations. Chats disappear when the session ends.
- **Real-time Streaming**: Instant, typewriter-style responses for a natural conversational feel.
- **Responsive**: Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express (functioning as an API proxy)
- **AI**: DeepSeek API
- **Deployment**: Configured for Port 3002

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A DeepSeek API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/mozzdevv/MindEaseTherapistAI_replitt.git
    cd MindEaseTherapistAI_replitt
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the application**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3002`.

## ⚙️ Configuration

The application uses a server-side proxy at `/api/chat` to handle AI requests securely.
The DeepSeek API key is configured in `server/routes.ts`.

## 🔒 Privacy

MindEase is designed with privacy as the core principle:
- No cookies or tracking pixels.
- Chat history exists only in your browser's memory.
- Messages are processed by the AI and immediately discarded.

## 📄 License

MIT License
