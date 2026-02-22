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

---

## Angular Frontend (Full Stack Setup)

### 1) Project directory commands
```bash
# from repository root
cd /workspace/employee-management

# frontend app lives here
cd frontend
```

### 2) Install and run frontend
```bash
cd /workspace/employee-management/frontend
npm install
npm start
```

### 3) Frontend directory structure
```text
frontend/
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.css
    ├── environments/
    │   └── environment.ts
    └── app/
        ├── app.component.ts
        ├── app.config.ts
        ├── app.routes.ts
        ├── auth/
        │   └── login.component.ts
        ├── core/
        │   ├── auth.guard.ts
        │   ├── auth.interceptor.ts
        │   ├── auth.service.ts
        │   ├── employee.service.ts
        │   └── models.ts
        └── employees/
            ├── employee-form.component.ts
            └── employee-page.component.ts
```

### 4) Project flow (one by one)
1. User opens app and lands on login page (`/login`).
2. Login form calls `POST /api/token/`.
3. `access` + `refresh` tokens are stored in `localStorage`.
4. User is redirected to `/employees`.
5. Employee page calls `GET /api/employees/` for list + pagination.
6. Create form calls `POST /api/employees/`.
7. Edit action calls `PUT /api/employees/{id}/`.
8. Delete action calls `DELETE /api/employees/{id}/`.
9. Filter inputs call `GET /api/employees/?department=...&role=...&page=...`.
10. Auth interceptor adds `Authorization: Bearer <access_token>` to API requests.
11. On `401`, interceptor calls `POST /api/token/refresh/` and retries the original request.
12. Logout clears tokens and routes back to `/login`.

### 5) Backend + frontend run together
```bash
# terminal 1: run django backend
cd /workspace/employee-management/employee_management
python manage.py runserver

# terminal 2: run angular frontend
cd /workspace/employee-management/frontend
npm install
npm start
```
