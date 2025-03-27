# Task Manager  

A full-stack to-do list application built with Django & Django REST Framework (DRF) for the backend and React (Next.js) for the frontend. Users can create, update, delete, and view tasks with authentication and authorization.  

## What I Have Done  

### Backend (Django + DRF)  
✅ Set up Django project (`task_manager`) and `tasks` app.  
✅ Created `Task` model with fields:  
   - `title`, `description`, `status`, `created_at`, `updated_at`, and `user`.  
✅ Implemented JWT authentication with `djangorestframework-simplejwt`.  
✅ Developed API endpoints for tasks with router:  
   - List all tasks (`GET /api/tasks/`).  
   - Retrieve a task (`GET /api/tasks/{id}/`).  
   - Create a task (`POST /api/tasks/`).  
   - Update a task (`PUT /api/tasks/{id}/`).  
   - Delete a task (`DELETE /api/tasks/{id}/`).  
✅ Restricted task access so users can only manage their own tasks.  
✅ Registered the `Task` model in the Django admin panel.  

### Frontend (React + TypeScript)  
✅ Set up a Next.js project with TypeScript.  
✅ Created pages and components:  
   - **Login Page** → Implemented JWT authentication.  
   - **Task List Page** → Fetches and displays tasks from the API.  
   - **Dynamic Task Form Page** → Allows creating and updating tasks.  
✅ Used Zustand for state management.  
✅ Integrated API using Axios with authentication handling.  
✅ Implemented protected routes (only logged-in users can access task pages).  
✅ Styled the UI using ShadCN (TailwindCSS).  

## How to Run  

1. **Backend:**  
   - Install dependencies (`pip install -r requirements.txt`).  
   - Run migrations (`python manage.py migrate`).  
   - Start the server (`python manage.py runserver`).  

2. **Frontend:**  
   - Install dependencies (`npm install` or `yarn`).  
   - Start the React app (`npm run dev` or `yarn dev`).
     
 🚀🚀  
 🚀🚀    
