# 🚀 Employee Management System (EMS)

A complete **Full Stack Employee Management System (EMS)** built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**.

This project helps organizations manage employees, attendance, leave requests, and payroll through a secure role-based system.

---

## 📌 Project Overview

This Full Stack Employee Management System includes real-world features like:

- Employee Management
- Attendance Management
- Leave Management
- Payslip Generation
- Role-Based Authentication
- Email Notifications
- Background Jobs using Inngest

Whether you are learning Full Stack Development or looking for a strong portfolio project, this application demonstrates how real-world business systems are built.

---

## ✨ Features

### 🔐 Authentication & Authorization

- JWT Authentication
- Role-Based Access Control (Admin & Employee)
- Protected Routes
- Secure Password Hashing with Bcrypt

---

### 👨‍💼 Admin Features

- Admin Dashboard
- Add Employees
- Update Employee Information
- Delete Employees
- Manage Departments
- View Attendance Records
- Approve/Reject Leave Requests
- Generate Payslips
- View Payroll Records

---

### 👩‍💻 Employee Features

- Employee Dashboard
- Check-In / Check-Out Attendance
- View Attendance History
- Apply for Leave
- Track Leave Status
- View Payslips
- Update Profile Information

---

### 📅 Attendance Management

- Daily Check-In
- Daily Check-Out
- Working Hours Calculation
- Automatic Check-Out
- Attendance Reports

---

### 📝 Leave Management

- Apply for Leave
- Leave Approval Workflow
- Leave Status Tracking
- Admin Notifications

---

### 💰 Payslip Management

- Generate Monthly Payslips
- Salary Breakdown
- Allowances & Deductions
- Printable Payslips

---

### ⚡ Background Jobs with Inngest

- Automatic Employee Check-Out
- Attendance Reminder Emails
- Leave Approval Reminder Emails
- Scheduled Cron Jobs

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React

### Backend

- Node.js
- Express.js
- JWT
- Bcrypt
- Multer

### Database

- MongoDB Atlas
- Mongoose

### Background Jobs

- Inngest

### Email Service

- Nodemailer

---

## 📂 Folder Structure

```bash
EMS
│
├── client
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── routes
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── inngest
│   ├── utils
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/poojagithub2407/Full-Stack-Employee-Management-System-in-MERN.git
cd employee-management-system
```

### Install Frontend Dependencies

```bash
cd client

npm install
```

### Install Backend Dependencies

```bash
cd server

npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key

ADMIN_EMAIL=admin@example.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## ▶️ Run Project

### Start Backend

```bash
cd server

npm run server
```

### Start Frontend

```bash
cd client

npm run dev
```

---

## 📸 Application Modules

### Dashboard

- Admin Dashboard
- Employee Dashboard
- Analytics Overview

### Employees

- Create Employee
- Update Employee
- Delete Employee
- Employee Listing

### Attendance

- Check In
- Check Out
- Attendance History

### Leave

- Apply Leave
- Approve Leave
- Reject Leave

### Payroll

- Generate Payslip
- View Payslip
- Print Payslip

---

## 🎯 Learning Outcomes

By building this project, you will learn:

- Full Stack MERN Development
- REST API Development
- JWT Authentication
- Role-Based Authorization
- MongoDB Database Design
- React Context API
- State Management
- Email Automation
- Background Jobs with Inngest
- Production-Level Project Structure

---

## 🔮 Future Improvements

- PDF Payslip Download
- Real-Time Notifications
- Employee Performance Tracking
- Advanced Analytics Dashboard
- Mobile Application
- Multi-Branch Support

---

## 👩‍💻 Author

**Pooja Dayal**

Frontend Developer | MERN Stack Developer

### Connect With Me

- LinkedIn: https://www.linkedin.com/in/pooja-dayal-4a7044227/
- GitHub: https://github.com/poojagithub2407

---

## ⭐ Support

If you found this project useful, please give it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the MIT License.
