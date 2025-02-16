# Workspace-Reservation-Approval-System
Design and develop a back-end system where employees can book a meeting room for a specific day.  Each booking request goes through a **multi-level approval process** before being finalized.  

# Booking API

This API allows users to register, log in, view their profile, and manage bookings with manager and admin approvals.

## Base URL
```
http://localhost:PORT/api/user
```

## Authentication
- JWT-based authentication is required for some endpoints.
- Token must be sent in the `Authorization` header as `Bearer <token>`.

---

## **User Authentication**

### **1. Register User**
**Endpoint:**
```
POST /register
```
**Description:** Registers a new user.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role":"employee"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "12345",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

---

### **2. Login User**
**Endpoint:**
```
POST /login
```
**Description:** Logs in an existing user and returns a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "your_jwt_token_here"
}
```

---

### **3. Get Current User** (Requires Authentication)
**Endpoint:**
```
GET /current
```
**Description:** Returns details of the currently authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "12345",
  "username": "john_doe",
  "email": "john@example.com"
}
```

---

## **Booking Management**

### **4. Create a Booking**
**Endpoint:**
```
POST /booking
```
**Description:** Creates a new booking request.

**Request Body:**
```json
{
  "userId": "12345",
  "bookingDetails": "Conference Room A - 2 Hours"
}
```

**Response:**
```json
{
  "message": "Booking created successfully",
  "bookingId": "67890"
}
```

---

### **5. Manager Approval**
**Endpoint:**
```
PUT /booking/:id/manager
```
**Description:** Approves a booking at the manager level.

**Request Params:**
```
id - Booking ID
```

**Request Body:**
```json
{
  "status": "approved"
}
```

**Response:**
```json
{
  "message": "Booking approved by manager"
}
```

---

### **6. Admin Approval**
**Endpoint:**
```
PUT /booking/:id/admin
```
**Description:** Approves a booking at the admin level.

**Request Params:**
```
id - Booking ID
```

**Request Body:**
```json
{
  "status": "approved"
}
```

**Response:**
```json
{
  "message": "Booking approved by admin"
}
```

---

### **7. Get All Bookings**
**Endpoint:**
```
GET /bookings
```
**Description:** Retrieves all bookings in the system.

**Response:**
```json
[
  {
    "id": "67890",
    "userId": "12345",
    "bookingDetails": "Conference Room A - 2 Hours",
    "status": "approved by admin"
  }
]
```


