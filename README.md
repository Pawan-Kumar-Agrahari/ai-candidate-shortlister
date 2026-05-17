# AI-Powered Candidate Profile Shortlisting System

## SECTION 1 — PROJECT OVERVIEW
This project is a complete Candidate Profile Shortlisting System powered by AI & Skill Matching.
It allows recruiters to:
- Add and manage candidate profiles
- Define job requirements
- Automatically shortlist candidates using skill matching, experience matching, and preferred skills scoring
- Use OpenRouter AI (`openai/gpt-5.2`) to intelligently rank candidates, explain suitability, and generate interview questions.

### Technologies Used
- **Frontend**: React.js, Vite, Tailwind CSS, Axios, React Router DOM, React Hot Toast, Recharts
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, dotenv, cors
- **AI Integration**: OpenRouter API (`openai/gpt-5.2`)

### System Architecture
The application follows a standard MERN stack architecture. The React frontend communicates with the Express backend via RESTful APIs. The backend stores candidate and shortlist data in MongoDB and calls the OpenRouter API for intelligent analysis.

## SECTION 2 — COMPLETE FOLDER STRUCTURE
\`\`\`
candidate-shortlisting-system/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
\`\`\`

## SECTION 24 — FINAL RUNNING COMMANDS
To run this project:

**Backend:**
\`\`\`bash
cd backend
npm run dev
\`\`\`
*(Runs on http://localhost:5000)*

**Frontend:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`
*(Runs on http://localhost:5173)*

Make sure MongoDB is running locally or provide a valid MongoDB URI in the `.env` file. Add your `OPENROUTER_API_KEY` to `backend/.env`.
