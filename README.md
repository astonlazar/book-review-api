# 📚 Book Review API

A RESTful API for managing and reviewing books. Built with Node.js, Express, and MongoDB.

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- dotenv for configuration

## 📊 ER Diagram
![image](https://github.com/user-attachments/assets/07ac63ac-20da-4d53-95ee-c4934847178c)

## API Documentation (Postman)
Link - https://documenter.getpostman.com/view/34168578/2sB2qahLzD

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. 📥 Clone the Repository
```
git clone https://github.com/astonlazar/book-review-api.git
cd book-review-api
```

### 2. 📦 Install Dependencies
```
npm install
```

### 3. ⚙️ Set Up Environment Variables
Create a .env file in the root directory and add the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
```
Replace your_mongodb_connection_string and your_jwt_secret_key with your actual credentials.

### 🏃 Run the Application
```
npm run dev
```
Your API will now be running on http://localhost:5000 (or the port you defined in .env).
