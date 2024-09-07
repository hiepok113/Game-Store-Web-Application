# Game Store Website

This is a full-stack web application for a game store where users can browse games, add them to a cart, search by title or category, and make purchases. The application includes both the **frontend** (client) and **backend** (server).

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contact](#contact)

## Technologies Used
### Frontend:
- React.js
- Axios for API requests
- Redux for state management
- CSS for styling

### Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication

## Features
- User authentication (Register, Login, Logout)
- Game search functionality (by title and category)
- Add games to cart
- Payment system integration (simulation)
- Detailed game view page
- Responsive design

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/game-store.git
cd game-store
```
### 2. Install dependencies:
For client:
```bash
cd client
npm install
```
For server:
```bash
cd server
npm install
```
### 3. Setup MongoDB:
Make sure you have MongoDB installed and running (or use MongoDB Atlas).
Create a .env file in the server folder with the following contents:
```bash
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```
### 4. Run the application:
For client:
```bash
cd client
npm start
```
For Server
```bash
cd server
npm run dev
```
### Usage
Open your browser and go to http://localhost:3000 for the client.
The backend runs on http://localhost:5000.
You can register a new account, login, browse available games, add them to the cart, and proceed to checkout.

