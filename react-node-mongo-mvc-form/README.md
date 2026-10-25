# React + Node.js + Express + MongoDB (MVC) Form

A minimal Name + Age form. React sends the data to an Express API, and the backend saves it to MongoDB using an MVC-style structure.

## Requirements
- Node.js and npm
- A running local MongoDB server, OR a MongoDB Atlas connection URI

## Project structure
```text
react-node-mongo-mvc-form/
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── style.css
└── backend/
    ├── .env.example
    ├── package.json
    ├── server.js
    ├── controllers/
    │   └── userController.js
    ├── models/
    │   └── User.js
    └── routes/
        └── userRoutes.js
```

## 1. Configure MongoDB
Copy `backend/.env.example` to `backend/.env`.

For local MongoDB, the default URI is:
```env
MONGO_URI=mongodb://127.0.0.1:27017/mydatabase
```

For MongoDB Atlas, replace it with your Atlas connection URI. Do not share or commit your `.env` file.

## 2. Start the backend
Open a terminal:
```bash
cd backend
npm install
npm run dev
```
The backend runs at `http://localhost:5000`.

## 3. Start the frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the local URL shown by Vite (usually `http://localhost:5173`).

## API
- `POST http://localhost:5000/api/users` — saves `{ "name": "Athul", "age": 23 }`

## MVC flow
React form -> route -> controller -> Mongoose model -> MongoDB.

The backend returns JSON; React is the frontend view in this project.
