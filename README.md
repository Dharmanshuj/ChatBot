# ChatBot

🔗 **Live app:** [https://chat-bot-dharmanshu.vercel.app](https://chat-bot-dharmanshu.vercel.app/)

A web-based chatbot that talks to Google's Gemini API. The UI supports typed messages, voice input (speech-to-text), and spoken responses (text-to-speech).

## How it works

The app is split into two independently deployed projects:

- **`ChatBot-frontend/`** — a Create React App client. Renders the chat UI, captures voice input via the Web Speech API, and sends each message to the backend.
- **`ChatBot-backend/`** — an Express API (deployed as a Vercel serverless function via `serverless-http`) that forwards chat messages to the Gemini API and returns the model's reply.

```
Browser (React) → ChatBot-backend (Express, POST /index) → Gemini API → response
```

## Project structure

```
ChatBot-frontend/   React app (CRA) + api/chatbot.js serverless function
ChatBot-backend/    Express API, deployed as a serverless function
```

Each folder has its own `vercel.json` and is deployed as its own Vercel project.

## Running locally

**Backend**
```bash
cd ChatBot-backend
npm install
# create a .env with REACT_APP_API_URL=<your Gemini API endpoint + key>
npm start            # http://localhost:3001
```

**Frontend**
```bash
cd ChatBot-frontend
npm install
npm start             # http://localhost:3000
```

In development the frontend talks to `http://localhost:3001/index`; in production it calls the deployed backend URL.

## Deployment

Both apps deploy to Vercel, each with its own project rooted at `ChatBot-backend/` and `ChatBot-frontend/` respectively. Required environment variable on the backend project: `REACT_APP_API_URL` (the Gemini API endpoint, including your API key).
