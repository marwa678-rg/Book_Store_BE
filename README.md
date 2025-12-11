# 📚 Book Store API – Backend  
A complete backend system for managing books, purchases, and user authentication.  
Built with **Node.js, Express.js, MongoDB, JWT, Multer**, and follows REST API architecture.

---

## 🚀 Features

### 👤 User Module
- Register & Login using JWT  
- Email verification using OTP  
- Resend OTP with request limit  
- User roles: **Admin**, **User**  
- Protected Routes  
- View purchase history  

---

### 📘 Books Module
- Add new books (Admin only)  
- Upload book cover image using **Multer**  
- Update book info (price, stock)  
- Delete book  
- Get all books with:
  - Pagination  
  - Search by title or category  
- Get single book with seller details  

---

### 🛒 Purchase Module
- Purchase a book  
- Stock decreases automatically  
- View logged-in user's purchases  
- Populate book details in response  

---

## 🛠️ Tech Stack
- **Node.js**  
- **Express.js**  
- **MongoDB + Mongoose**  
- **JWT Authentication**  
- **Multer (Image Upload)**  
- **Joi (Validation)**  
- **bcrypt.js**  
- **dotenv**  

---

## 📁 Project Structure

backend/
├── controllers/
│ ├── authController.js
│ ├── bookController.js
│ └── purchaseController.js
├── middleware/
│ ├── auth.middleware.js
│ └── role.middleware.js
├── models/
│ ├── User.js
│ ├── Book.js
│ └── Purchase.js
├── routes/
│ ├── auth.js
│ ├── books.js
│ └── purchases.js
├── utils/
│ ├── db.js
│ ├── generateOtp.js
│ └── sendMail.js
├── public/
│ └── uploads/ (uploaded images)
├── validation/
│ ├── userValidation.js
│ └── bookValidation.js
├── server.js
├── .env

---

## 🔐 Authentication

Use `Bearer Token` in request header:


---

## 📌 Environment Variables

Create a `.env` file:
#System Variable
PRODUCTION_ENV=false
CLIENT_ORIGIN=
PORT=5000
#Database Variable
CONNECTION_STRING=

#Mail Variables
EMAIL_USER=
EMAIL_HOST_PROVIDER=
EMAIL_PASS=
SMTP_PORT=

#JWT Variables
JWT_SECRET=
JWT_EXPIRES_IN=

---

## 📬 API Endpoints

### 🔐 Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register user |
| POST | /api/v1/auth/verify-otp | Verify email |
| POST | /api/v1/auth/login | Login |
| POST | /api/v1/auth/resend-otp | Resend OTP |

---

### 📘 Book Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/books | Get all books (pagination + search) |
| GET | /api/v1/books/:id | Get single book |
| POST | /api/v1/books/add | Add book (Admin) |
| PUT | /api/v1/books/update/:id | Update book |
| DELETE | /api/v1/books/delete/:id | Delete book |

📌 **Add Book (with image):**  
Use Postman → form-data → key: `coverImage` (type: file)

---

### 🛒 Purchase Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/purchases/:bookId | Buy a book |
| GET | /api/v1/purchases/my | Get logged-in purchases |

---

## 🧪 Testing

All APIs tested using **Postman**  
Use "form-data" when uploading images.

---

## 🌐 Deployment

Project deployed on Vercel:  
👉 https://book-store-be-three.vercel.app

---

## 🤝 Contribution

Feel free to fork, open issues, and submit PRs.

---

## 📜 License
This project is open-source under the MIT license.

---


