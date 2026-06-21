🚀 Xeno CRM — AI-Powered Customer Relationship Management System

🔗 Live Demo

Frontend : https://charismatic-perfection-production-e18e.up.railway.app/?utm_source=chatgpt.com
Backend API:https://xeno-crm-production-1dfc.up.railway.app?utm_source=chatgpt.com

📌 About the Project

Xeno CRM is an AI-powered Customer Relationship Management platform developed for managing customers, leads, marketing workflows and analytics in one place.

The platform provides:

Customer Management
Lead Management
JWT Authentication
Role Based Access Control (ADMIN / USER)
Dashboard Analytics
Lead to Customer Conversion
Secure Password Encryption
CSV Export
Responsive UI

✨ Features
🔐 Authentication System
User Registration
User Login
JWT Token Authentication
BCrypt Password Encryption
Protected Routes

👥 Customer Management
Add Customer
Update Customer
Delete Customer
Active Customer Tracking
Customer Listing

🎯 Lead Management
Add Lead
Edit Lead
Delete Lead
Update Lead Status
Convert Lead → Customer
Lead Source Tracking

📊 Dashboard Analytics
Total Customers
Total Leads
Active Customers
Conversion Rate
New Leads Count


🛡 Role Based Access

ADMIN can:

Add Leads
Edit Leads
Delete Leads
Export CSV

USER can:

View Dashboard
View Customers
View Leads

🏗 System Architecture


                    FRONTEND
         React + Vite + Bootstrap

                        │
                        ▼

             REST API (Spring Boot)

                        │

        ┌───────────────┴──────────────┐

 Authentication                CRM Services

 JWT + BCrypt          Customer / Lead / Dashboard

        │                              │

        └───────────────┬──────────────┘

                        ▼

                 MySQL Database
                   (Railway)

🛠 Tech Stack
Frontend

React.js
Vite
React Router
Bootstrap
JavaScript
Backend
Spring Boot
Spring Security
JWT Authentication
Spring Data JPA
Hibernate
Database
MySQL (Railway)

Deployment
Railway Frontend
Railway Backend
Railway MySQL


🔒 Security Features
JWT Authentication
BCrypt Password Hashing
Role Based Authorization
Protected Routes
CORS Configuration


📂 Project Structure
src

├── pages
│   ├── Dashboard.jsx
│   ├── Customers.jsx
│   ├── Leads.jsx
│   ├── AddLead.jsx
│   ├── Login.jsx
│   ├── RegisterPage.jsx
│   └── Profile.jsx

├── components
│   └── ProtectedRoute.jsx

├── App.jsx
└── main.jsx


Backend

controller/
service/
repository/
entity/
config/
security/


🚀 API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Customer APIs
GET /api/customer/all

POST /api/customer/add

PUT /api/customer/update/{id}

DELETE /api/customer/delete/{id}
Lead APIs
GET /api/lead/all

POST /api/lead/add

PUT /api/lead/update/{id}

DELETE /api/lead/delete/{id}

POST /api/lead/convert/{id}

Dashboard APIs
GET /api/dashboard/total-customers

GET /api/dashboard/total-leads

GET /api/dashboard/new-leads

GET /api/dashboard/converted-leads

Login Page

Insert Screenshot Here

Dashboard

Insert Screenshot Here

Customers Page

Insert Screenshot Here

Leads Page

Insert Screenshot Here

Add Lead

Insert Screenshot Here

⚙ Environment Variables

Backend:

DB_URL=
DB_USERNAME=
DB_PASSWORD=

MAIL_USERNAME=
MAIL_PASSWORD=

PORT=

Frontend:

VITE_API_URL=https://xeno-crm-production-1dfc.up.railway.app
🎯 Highlights

✅ Full Stack CRM Application
✅ JWT Authentication
✅ Role Based Access Control
✅ Railway Deployment
✅ MySQL Integration
✅ Secure APIs
✅ Responsive UI
✅ Production Ready Architecture

👨‍💻 Developer

Akeesh Jaiswal

B.Tech Computer Science Engineering
