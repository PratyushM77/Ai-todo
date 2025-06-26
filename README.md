# 📝 Todo App - MERN Stack

This is a full-stack **Todo application** built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It features user registration/login functionality with JWT authentication and CRUD operations for todo items specific to each authenticated user.

---

## 📁 Project Structure

```
project-root/
├── Backend/
│   ├── Routes/
│   │   ├── User.js
│   │   └── Todoitems.js
│   ├── model/
│   │   ├── userModel.js
│   │   └── TodoModel.js
│   ├── Auth/
│   │   └── Userauth.js
│   ├── db.js
│   ├── server.js (server entry)
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Todo.jsx
│   │   │   ├── Indetail.jsx
│   │   │   └── Ask.jsx
│   │   ├── App.jsx
│   │   └── utils.js
│   ├── vite.config.js
```

---

## ⚙️ Features

* ✅ User registration and login with hashed passwords (bcrypt)
* ✅ JWT token-based authentication with secure HttpOnly cookies
* ✅ Add, edit, delete todos for logged-in user only
* ✅ Middleware protection using `AuthenticateUser`
* ✅ Todos are user-specific and private
* ✅ Scrollable and responsive UI for task lists (Todo list container scrolls independently)
* ✅ CORS and cookies configured for frontend-backend integration

---

## 🔐 Authentication Flow

* On login, backend issues a JWT stored in a secure `HttpOnly` cookie
* All protected routes check token via middleware before allowing access
* On logout, cookie is cleared to terminate session

---

## 🖥️ Technologies Used

### Frontend

* React.js
* Tailwind CSS
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB (via Mongoose)
* bcrypt for password hashing
* JWT for authentication
* cookie-parser
* cors

---

## 🚧 Improvements To Do

* ⏳ Deploy backend on Render or Railway
* ⏳ Setup custom `BASE_URL` for deployment
* ⏳ Form validations and error boundaries
* ⏳ Add loader or skeleton UI while fetching data
* ⏳ Paginate todos if they grow large

---

## 🔄 Sample API Endpoints

| Method | Route      | Protected | Description             |
| ------ | ---------- | --------- | ----------------------- |
| POST   | /register  | ❌         | User signup             |
| POST   | /login     | ❌         | Login and receive token |
| GET    | /gettodo   | ✅         | Get user's todos        |
| POST   | /posttodo  | ✅         | Add a new todo          |
| PATCH  | /todo/\:id | ✅         | Update user's todo      |
| DELETE | /todo/\:id | ✅         | Delete user's todo      |
| GET    | /logout    | ✅         | Logout and clear cookie |

---

## 🧪 Local Development Setup

### 1. Clone Repo and Install Dependencies

```bash
# Backend
cd Backend
npm install

or
Open a new terminal

# Frontend
cd Frontend
npm install
```

### 2. Configure Environment Variables

**Backend/.env**
```
*I have just hard coded the secret key you can create a .env file and import the following data*
```
MONGO_URI=your_mongodb_uri
SECRETKEY=your_jwt_secret
```

**Frontend/.env**

```
VITE_BACKEND_URL=http://localhost:3000
```

### 3. Run Dev Servers

```bash
# Backend
cd Backend
node index.js

# Frontend
cd Frontend
npm run dev
```

---

## 🙋 Author

Made with 💻 by \[Pratyush Mishra]

---

