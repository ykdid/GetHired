# GetHired

**GetHired** is a comprehensive web application designed to streamline the process of job advertisements and applications. The platform facilitates Employers in creating and managing job postings, while Users can search for jobs, apply, and track their applications. This project includes two distinct client applications (for back-office and user interactions) and a server-side API.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Front-End](#front-end)
  - [Back-End](#back-end)
- [Deployment](#deployment)
- [Contact](#contact)

## Technologies Used

### Front-End

- **React.js**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for making API requests.
- **React Toastify**: For displaying toast notifications.
- **SCSS**: Sassy CSS for advanced styling.
- **React Router**: For routing within the application.
- **React Quill**: WYSIWYG editor for handling HTML content in job advertisements.
- **React Hooks**: For managing state and side effects in functional components.

### Back-End

- **ASP.NET Web API**: Framework for building HTTP services.
- **JWT Authentication**: For secure user authentication.
- **PostgreSQL**: Relational database management system.
- **Entity Framework**: ORM for data access.
- **Docker**: Containerization platform.
  - **Dockerfile**: Defines the application's environment and dependencies.
  - **Docker Compose**: Tool for defining and running multi-container Docker applications.
- **LINQ**: Language Integrated Query for data manipulation.

## Features

### For Employers

- Create and manage job advertisements.
- View and track job applications.

### For Users

- Browse job advertisements.
- Apply for jobs.
- Track the status of applications.

## Getting Started

### Front-End-(backoffice)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ykdid/GetHired.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd client
   cd backoffice-client
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm start
   ```
   ### Front-End-(user)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ykdid/GetHired.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd client
   cd user-client
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm start
   ```

### Back-End

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ykdid/GetHired.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd server
   ```

3. **Build and run the Docker containers:**
   ```bash
   docker-compose up --build
   ```

4. **Access the API documentation:**
   Open `http://localhost:7053/swagger` in your browser.

## Deployment

The client applications are deployed using Vercel:

- [User Client](https://gethired-user.vercel.app/)
- [Employer Client](https://gethired-employer.vercel.app/)


## Contact

For any inquiries or support, please contact:

- **Email:** yusufkaya.yjk@gmail.com
- **GitHub:** [ykdid](https://github.com/ykdid)

---
