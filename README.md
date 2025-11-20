# Perpus BWA - Library Management System

**Perpus BWA** is a modern, full-stack library management system designed to streamline library operations. Built with the powerful **Laravel** framework on the backend and a dynamic **React** frontend via **Inertia.js**, this application offers a seamless Single Page Application (SPA) experience without the complexity of a separate API.

The platform features comprehensive tools for managing books, tracking loans and returns, calculating fines, and handling user roles and permissions.

## 🛠 Tech Stack

* **Backend Framework:** [Laravel](https://laravel.com/)
* **Frontend Framework:** [React](https://react.dev/)
* **Adapter:** [Inertia.js](https://inertiajs.com/) (Connects Laravel & React)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (implied by components structure)
* **Database:** MySQL / PostgreSQL
* **Build Tool:** Vite

## ✨ Key Features

### 📚 Book & Inventory Management
* **Books:** CRUD operations for books with details like stock, language, and status.
* **Categories & Publishers:** Manage book classifications and publication sources.
* **Stock Management:** Track available book quantities.

### 🔄 Circulation (Loans & Returns)
* **Loan System:** Record and manage book borrowing transactions.
* **Return Processing:** Handle book returns and check for damages or late returns.
* **Fine Calculation:** Automated fine settings and reporting for overdue or damaged items.

### 👥 User & Role Management
* **RBAC (Role-Based Access Control):** Dynamic role and permission assignment (Admin, Staff, Member).
* **User Management:** Create and manage library members.
* **Authentication:** Secure login, registration, and password reset functionality.

### 📊 Dashboard & Analytics
* **Statistics:** View loan statistics and popular books.
* **Announcements:** Manage system-wide announcements.

## 📂 Project Structure

```text
.
├── app/                    # Laravel Application Logic (Models, Controllers)
│   ├── Http/Controllers/   # Backend Controllers
│   └── Models/             # Eloquent Models
├── database/               # Migrations & Seeders
├── public/                 # Public assets
├── resources/
│   ├── js/                 # React Frontend
│   │   ├── Components/     # Reusable UI Components (Shadcn, etc.)
│   │   ├── Layouts/        # App Layouts
│   │   └── Pages/          # Inertia.js Pages (Views)
│   └── css/                # Tailwind CSS entry
├── routes/                 # Web & Auth Routes
├── tests/                  # Feature & Unit Tests
└── ...
