# API Test Requests

## Authentication

### 1. Create Admin User
```bash
curl -X POST http://localhost:3000/api/auth/admin/create \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123",
    "adminSecret": "be717aed2ff2ff66b7c391e8fc006aaa4fe7ed3cb25c040751f8e94bbf70a2e8"
  }'
```

### 2. User Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "user123"
  }'
```

### 3. User Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "user123"
  }'
```

## Admin Routes

### 1. Add New Grocery Item
```bash
curl -X POST http://localhost:3000/api/admin/grocery \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Orange",
    "price": 0.75,
    "inventory": 50,
    "description": "Fresh oranges"
  }'
```

### 2. Get All Grocery Items
```bash
curl -X GET http://localhost:3000/api/admin/grocery \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 3. Update Grocery Item
```bash
curl -X PUT http://localhost:3000/api/admin/grocery/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Red Apple",
    "price": 0.60,
    "description": "Fresh red apples from local farm"
  }'
```

### 4. Update Inventory
```bash
curl -X PATCH http://localhost:3000/api/admin/grocery/1/inventory \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "inventory": 75
  }'
```

### 5. Delete Grocery Item
```bash
curl -X DELETE http://localhost:3000/api/admin/grocery/1 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## User Routes

### 1. View Available Grocery Items
```bash
curl -X GET http://localhost:3000/api/user/grocery
```

### 2. Create Order
```bash
curl -X POST http://localhost:3000/api/user/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -d '{
    "items": [
      {
        "grocery_id": 1,
        "quantity": 2
      },
      {
        "grocery_id": 2,
        "quantity": 3
      },
      {
        "grocery_id": 3,
        "quantity": 1
      }
    ]
  }'
``` 