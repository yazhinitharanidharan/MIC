# MIC
Mood based playlist recommendation
Screenshots:
<img width="1594" height="892" alt="Image" src="https://github.com/user-attachments/assets/2bbe29b5-69fd-4301-bc7f-e20c431ef6c8" />

<img width="906" height="761" alt="Image" src="https://github.com/user-attachments/assets/d8dd831c-64ad-414a-bff3-13a9e36a1f65" />

<img width="1464" height="724" alt="Image" src="https://github.com/user-attachments/assets/e3a43d82-9ffc-454f-8dd2-fb2a2b742fa6" />

Setup Backend:

1.Open terminal, navigate to backend folder inside project

2.Run: npm install to install dependencies

3.Create a .env file with required API keys (Gemini AI, Spotify client ID/secret)

4.Run: node index.js or npm start to start the backend server

Setup Frontend:

1.Open another terminal, navigate to frontend folder

2.Run: npm install to install dependencies

3.Run: npm start to launch the React development server

Open browser:
Open http://localhost:3000/ to access the frontend webpage which talks to backend server



Technology Stack:

Backend:
Node.js with Express.js (web server)
Google Gemini AI API (for AI mood analysis)
Spotify Web API (for playlist data)

Frontend:
React.js (UI framework)
CSS-in-JS (styling)

Other tools:
Git (version control)
npm (package manager)

Features:
.AI-based mood analysis using Google Gemini, transforming user input mood into mood keywords.
.Spotify playlist search integration using Spotify Web API based on AI-generated mood keywords.
.Responsive, accessible React frontend user interface that allows users to enter mood and receive playlist recommendations.
.Display of relevant playlist information including name, description, and direct Spotify URLs.
.Robust backend built with Node.js and Express handling external API interactions securely with environment variables.
.Error handling with informative messages and loading indicators for better user experience.
.Easy to run locally with clear setup instructions and API key configuration.
.Use of modern web technologies and APIs offering a smart, personalized music recommendation experience.
