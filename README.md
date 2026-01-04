# AI Interview Simulator 🤖

A production-ready AI Interview Simulator powered by Groq (Mixtral 8x7b), React, and Vercel Serverless Functions.

## 🚀 Features

- **Role-Based Interviews**: Specialized tracks for Frontend, Backend, MERN, ML, System Design, and HR.
- **Adaptive AI**: Adjusts questions based on your skill level. Uses prompt chaining for deep evaluation.
- **Real-Time Feedback**: Interactive chat interface with clear UI.
- **Comprehensive Reports**: Automated scoring, detailed feedback, and personalized improvement plans using JSON mode.
- **Secure Architecture**: Backend-for-Frontend (BFF) pattern using Vercel Functions to hide API keys.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, React Router.
- **Backend**: Vercel Serverless Functions (Node.js).
- **AI Engine**: Groq SDK (Mixtral-8x7b-32768).
- **Deployment**: Vercel.

## 📂 Project Structure

```
ai-interview-simulator/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (QuestionBox, ScoreCard, etc.)
│   │   ├── pages/          # Pages (Home, Interview, Report)
│   │   ├── services/       # API Services
│   │   └── App.jsx         # Routing
├── api/                    # Vercel Serverless Functions
│   └── interview.js        # Main Interview API
├── vercel.json             # Deployment Configuration
└── README.md               # Documentation
```

## 🏃 Local Development

1. **Clone the repository**

2. **Setup Root Dependencies (for Backend)**
   ```bash
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   ```

4. **Environment Variables**
   Create a `.env` file in the root (or set in your environment):
   ```env
   GROQ_API_KEY=gsk_...
   ```

5. **Run Locally**
   You can run the frontend and backend separately, or use `vercel dev` if installed.
   
   *Frontend Only (API will fail without backend running):*
   ```bash
   cd client
   npm run dev
   ```

   *Full Stack (Recommended with Vercel CLI):*
   ```bash
   vercel dev
   ```

## 🌍 Deployment Guide

### Option 1: GitHub Integration (Recommended)
1.  **Push to GitHub**:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    # Create repo on GitHub and follow instructions to push
    git remote add origin <your-repo-url>
    git push -u origin main
    ```
2.  **Vercel Dashboard**:
    -   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    -   Click **"Add New..."** -> **"Project"**.
    -   Import your GitHub Repository.
3.  **Configure**:
    -   **Framework Preset**: Vite
    -   **Root Directory**: `.` (Leave as default)
    -   **Environment Variables**: Add `GROQ_API_KEY`.
4.  **Deploy**: Click Deploy. Vercel will build the frontend and deploy the serverless functions.

### Option 2: Vercel CLI (Quickest)
Just run:
```bash
vercel --prod
```
-   Follow the prompts.
-   Ensure `GROQ_API_KEY` is set in Vercel Project Settings if not already.

## 📝 License

MIT
