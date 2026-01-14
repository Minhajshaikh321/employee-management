# Employee Management API
A secure Employee Management Backend API built using Django REST Framework with JWT authentication, MySQL database, CRUD operations, pagination, and filtering.

## Tech Stack
- Python
- Django
- Django REST Framework
- JWT Authentication (SimpleJWT)
- MySQL (PyMySQL)
- Git & GitHub

## API Endpoints

### Authentication
- POST `/api/token/`
- POST `/api/token/refresh/`

### Employee APIs
- POST `/api/employees/`
- GET `/api/employees/`
- GET `/api/employees/{id}/`
- PUT `/api/employees/{id}/`
- DELETE `/api/employees/{id}/`

### Pagination & Filtering
- GET `/api/employees/?page=2`
- GET `/api/employees/?department=Engineering`
- GET `/api/employees/?role=Developer`
