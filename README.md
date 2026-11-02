# 🩸 LifeLink – Blood Donor Finder

**A little of you. A lifetime for someone.**

LifeLink is a web-based Blood Donor Finder application designed to help people find blood donors more easily during emergencies. It provides a platform where donors can register and users can explore donor information based on their requirements.

## ✨ Features

- **Find a Donor:** Browse available donor information.
- **Donor Registration:** Register as a blood donor.
- **Donor Listing:** View registered donors.
- **Backend Integration:** Spring Boot backend with REST API endpoints.
- **Database Management:** MySQL database for storing donor information.
- **Authentication:** Backend authentication functionality.

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Java
- Spring Boot
- Spring Data JPA
- Spring Security

**Database**
- MySQL

**Tools**
- Git
- GitHub
- Maven
- VS Code

## 📁 Project Structure

```text
LifeLink/
│
├── Backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── mvnw.cmd
│
├── Frontend/
│   ├── images/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── .gitignore
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/anusua-bhattacharjee/LifeLink-Blood-Donor-Finder.git
```

### 2. Configure MySQL

- Create a MySQL database named `blood_donor_db`.
- Configure your database username and password using environment variables.

For Windows PowerShell:

```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
```

### 3. Run the backend

Open the Backend folder in your terminal and run:

```powershell
.\mvnw.cmd spring-boot:run
```

The Spring Boot application runs on:

`http://localhost:8080`

### 4. Run the frontend

Open `Frontend/index.html` in your browser.

## 🎯 Project Objective

The goal of LifeLink is to make blood donor discovery more accessible through a simple web application, helping connect people who need blood with registered donors.

## 🔮 Future Improvements

- Location-based donor search.
- Improved donor privacy and consent management.
- Email/SMS notifications.
- Enhanced authentication and authorization.
- Responsive UI improvements.

## 👩‍💻 Developer

**Anusua Bhattacharjee**

B.Tech – Computer Science and Engineering

[GitHub Profile](https://github.com/Anusua-Bhattacharjee/)

---

*LifeLink – Connecting donors, saving lives.*
