MERN Stack News CRUD Application
This is a full-stack web application featuring a React frontend and a Node.js/Express backend. The application provides a platform for managing news articles with role-based access control for administrators and regular users.

Features
User Authentication: Secure user registration and login functionality using JWT (JSON Web Tokens).

Role-Based Access Control:

Admin: Full CRUD (Create, Read, Update, Delete) access to all news articles.

User: Read-only access to published news articles.

RESTful API: A well-structured backend API built with Express and Mongoose.

Modern Frontend: A responsive and visually appealing user interface built with React, Vite, and styled with Tailwind CSS.

Client-Side Routing: Smooth navigation handled by React Router.

Tech Stack
Backend:

Node.js: JavaScript runtime environment.

Express: Web framework for Node.js.

MongoDB: NoSQL database for storing user and news data.

Mongoose: Object Data Modeling (ODM) library for MongoDB.

JWT (jsonwebtoken): For handling user authentication tokens.

CORS: To handle cross-origin requests between frontend and backend.

bcryptjs: For hashing user passwords.

Frontend:

React: JavaScript library for building user interfaces.

Vite: Next-generation frontend tooling for fast development.

TypeScript: Statically typed superset of JavaScript.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

React Router: For declarative routing in the React application.

Axios: For making HTTP requests to the backend API.

Prerequisites
Before you begin, ensure you have the following installed on your local machine:

Node.js (v18.x or later recommended)

npm (usually comes with Node.js)

MongoDB (Make sure the MongoDB server is running)

Setup and Installation
Follow these steps to get the project up and running on your local machine.

1. Clone the Repository
git clone <your-repository-url>
cd <your-repository-name>

2. Backend Setup
Navigate to the backend directory and install the required dependencies.

cd backend
npm install

Create a .env file in the backend directory and add the following environment variables. Replace the placeholder values with your own.

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

Start the backend server:

npm run dev

The backend API should now be running on http://localhost:3000.

3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install its dependencies.

cd frontend
npm install

Start the frontend development server:

npm run dev

The frontend application should now be running on http://localhost:5173. Open this URL in your browser to use the application.
