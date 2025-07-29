# DeepRead AI 💬

DeepRead AI is an intelligent message analysis tool that helps users gain deeper insights into their conversations. With a sleek interface and smart backend, users can analyze texts and uncover hidden emotional cues, intentions, or patterns using AI model.
<br/>
<br/>
<img width="1920" height="3067" alt="DeepReadAI" src="https://github.com/user-attachments/assets/3d0d5d56-2ece-4dd4-8796-4c7ba17ed6b8" />

<br/>

## ✨ Features

- 🔐 Firebase Authentication (Login/Signup)
- 📊 AI-powered message analysis
- 🧠 LLaMA 3 integration via OpenRouter
- 📁 History page for past analyses
- 🖼️ Individual detailed view for each message
- 🎨 Fully responsive and clean UI (Tailwind CSS)
- ⚙️ Protected routes using `PrivateLayout`
- 🔄 Full-stack architecture (MERN)

<br/>

## 🛠️ Tech Stack

**Frontend:**
- React
- Tailwind CSS
- React Router
- Firebase Auth
- Vite

**Backend:**
- Node.js
- Express
- Firebase Admin SDK (for protected data)
- MongoDB Cloud

**Backend:**
- Dotenv for environment config

**AI Integration:**
- LLaMA 3 via OpenRouter API

<br/>

## 🔐 Environment Variables

### 1. Backend `.env`:
```env
DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority&appName=<appname>
OPEN_AI_API_KEY=your_openai_api_key_here
FIREBASE_SERVICE_ACCOUNT_BASE64=your_base64_encoded_firebase_service_account
```
<br/>

- DB_URI: MongoDB Atlas connection string
- OPEN_AI_API_KEY: Your OpenAI API key (from OpenAI Dashboard)
- FIREBASE_SERVICE_ACCOUNT_BASE64: Base64 encoded Firebase service account JSON
<br/>

✅ To get the base64 string for Firebase admin:
```
base64 firebaseServiceAccount.json
```
<br/>

Then paste the result into .env like:
```
FIREBASE_SERVICE_ACCOUNT_BASE64=eyK0...
```

### 2. Frontend `.env`:
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123DEF4
VITE_API_URL=your-backend-url
VITE_OPEN_AI_API_KEY=your_openai_api_key_here
VITE_BACKEND_URL=your-backend-url
```

✅ All Firebase values can be found in your Firebase Console under Project Settings.

<br/>

## 🚀 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/deepreadai.git
cd deepreadai
```

### 2. Backend Setup
```bash
cd backend
npm install
nodemon server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

<br/>

## 🧪 AI Model
LLaMA-3 8B Instruct via OpenRouter for contextual, emotional, and tone analysis of messages. Response is parsed into insights shown in the UI.

<br/>

## 🌍 Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

<br/>

## 🔗 Live Site
[deepreadai.vercel.app](https://deepreadai.vercel.app/)

<br/>

## 🧠 Future Plans
- Add GPT-4 and Claude support
- Show sentiment scores and intent labels

<br/>

## 🙋‍♀️ Creator
Built with ❤️ by Neha Ghariyal

