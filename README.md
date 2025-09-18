# 📖 Blog Website – Fullstack (MERN)

This is a full-stack blog application built with the *MERN stack: a robust combination of **MongoDB, **Express.js, **React, and **Node.js. It features a complete user authentication system and provides full **CRUD* (Create, Read, Update, Delete) functionality for managing blog posts.

---

## 🚀 Features

* *User Authentication: Secure user registration and login using **JWT* (JSON Web Tokens) for token-based access control. Passwords are securely hashed with *bcrypt*.
* *CRUD Operations*: Users can create, read, update, and delete their own blog posts.
* *Responsive UI*: The application's interface is designed to be mobile-friendly, ensuring a seamless experience across various devices.
* *SEO Compliance*: Blog pages are optimized with meta tags, clean URLs, proper headings, and alt text for improved search engine visibility.
* *Secure API: The backend is protected with **CORS* and *dotenv* for managing environment variables.

---

## 🛠 Tech Stack

### Frontend
* *React (Vite)*: A fast and efficient framework for building the user interface.
* *Redux Toolkit*: For predictable state management.
* *React Router*: For handling client-side routing.
* *Axios*: For making HTTP requests to the backend.

### Backend
* *Node.js & Express.js*: The runtime environment and framework for building the RESTful API.
* *MongoDB Atlas*: A cloud-hosted NoSQL database for storing blog posts and user data.
* *JWT & bcrypt*: For authentication and secure password hashing.
* *CORS & dotenv*: Middleware and libraries for handling security and environment variables.

---


## ⚙ Installation & Setup

### 1. Backend

* Navigate to the backend directory and install the dependencies:**

* cd blog_backend**
* npm install**
* npm start**
---
### 2.  Frontend

* Navigate to the frontend directory and install the dependencies:**

* cd blog_frontend**
* npm install**
* npm run dev**

* The frontend application will run on http://localhost:5173.**
---
### Environment Variables

* To run the application, you'll need to create a .env file in the blog_backend directory with the following variables:**

* MONGO_URI=your_mongodb_connection_string**
* JWT_SECRET=your_secret_key**
* PORT=5000**

# 📌 API Endpoints

*  This section outlines the RESTful API endpoints for the blog application, detailing their function and required authentication status.**

---

## Auth

* POST /api/auth/signup → Register a new user.**
* POST /api/auth/login → Log in a user and receive a JWT token.**
* GET /api/auth/profile → Get the profile information of the currently logged-in user.**

---

## Blogs

* GET /api/blogs → Retrieve a list of all blogs.
* POST /api/blogs → Create a new blog post. *(Authentication required)*
* PUT /api/blogs/:id → Update a specific blog post by its ID. *(Authentication required)*
* DELETE /api/blogs/:id → Delete a specific blog post by its ID. *(Authentication required)*

## screenshot
<img width="1919" height="907" alt="Screenshot 2025-09-19 000120" src="https://github.com/user-attachments/assets/732b02fb-2cbe-4513-90e4-f1c8fabeba8f" />
<img width="1919" height="912" alt="Screenshot 2025-09-19 000209" src="https://github.com/user-attachments/assets/33bbf029-fe0e-483a-980c-be49e2d79d4f" />
<img width="1916" height="915" alt="Screenshot 2025-09-19 000234" src="https://github.com/user-attachments/assets/97cf7c31-cc4f-48eb-9196-68e5690e2ab6" />
<img width="1918" height="910" alt="Screenshot 2025-09-19 000253" src="https://github.com/user-attachments/assets/22df92a7-218b-44c8-9953-bcc348afb36d" />

https://github.com/user-attachments/assets/3cf681be-a26c-4788-8fab-b6dbbeabf051


### 1️⃣ Clone the repository
(https://github.com/Aditya-8788?tab=repositories)
