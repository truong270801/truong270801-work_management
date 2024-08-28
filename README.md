# Todo List Management Application

This project is a Todo List Management application built using ReactJS for the frontend, FastAPI for the backend, and PostgreSQL as the database. The application provides users with the ability to manage tasks efficiently, including functionalities such as user authentication, task categorization, search, filtering, and deadline management.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage) 

## Features

- **User Authentication**: Secure user registration and login using JWT.
- **CRUD Operations**: Create, read, update, and delete tasks.
- **Search and Filter**: Search tasks by title and filter by category.
- **Deadline Management**: Set deadlines for tasks.
- **Responsive Design**: Mobile-friendly design using Tailwind CSS and Material-UI.
## Interface

 ![../work_management/asset/login.png](https://github.com/truong270801/truong270801-work_management/blob/main/asset/login.png)
![../work_management/asset/Register.png](https://github.com/truong270801/truong270801-work_management/blob/main/asset/Register.png)
 ![../work_management/asset/Dashboard.png](https://github.com/truong270801/truong270801-work_management/blob/main/asset/Dashboard.png)

## Technologies

- **Frontend**:
  - ReactJS
  - React Router
  - Axios
  - Tailwind CSS
  - Material-UI
  
- **Backend**:
  - FastAPI
  - PostgreSQL
  - SQLAlchemy
  - JWT Authentication

- **Others**:
  - Docker (for containerization)
  - Git (for version control)

## Setup 

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- PostgreSQL
- Docker (optional, for containerized deployment)

### Setup

1. Clone the repository:
- Point to the application:
```
git clone https://github.com/yourusername/todo-list-management.git
cd todo-list-management
```
- Backend:
```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
- Frontend:
```
cd frontend
npm install
npm start
```
- Run with Docker:
```
docker-compose up --build
```
## Usage
1. Register a new account or log in with an existing account.
2. Add new tasks.
3. Edit or delete tasks using the corresponding buttons on each task card.
4. Use the search bar to find specific tasks and the dropdown menu to filter by category.
