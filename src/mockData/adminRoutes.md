# Admin Routes Mock Data

## 1. Add New Grocery Item
```bash
# Request
curl -X POST http://localhost:3000/api/admin/grocery \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Orange",
    "price": 0.75,
    "inventory": 50,
    "description": "Fresh oranges from local farm"
  }'

# Expected Response (201 Created)
{
  "id": 11,
  "name": "Orange",
  "price": 0.75,
  "inventory": 50,
  "description": "Fresh oranges from local farm",
  "created_at": "2024-01-20T10:00:00Z",
  "updated_at": "2024-01-20T10:00:00Z"
}
```

## 2. Get All Grocery Items
```bash
# Request
curl -X GET http://localhost:3000/api/admin/grocery \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Expected Response (200 OK)
{
  "items": [
    {
      "id": 1,
      "name": "Apple",
      "price": 0.50,
      "inventory": 100,
      "description": "Fresh red apples",
      "created_at": "2024-01-20T10:00:00Z",
      "updated_at": "2024-01-20T10:00:00Z"
    },
    {
      "id": 2,
      "name": "Banana",
      "price": 0.30,
      "inventory": 150,
      "description": "Yellow bananas",
      "created_at": "2024-01-20T10:00:00Z",
      "updated_at": "2024-01-20T10:00:00Z"
    }
    // ... more items
  ]
}
```

## 3. Update Grocery Item
```bash
# Request
curl -X PUT http://localhost:3000/api/admin/grocery/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Red Apple",
    "price": 0.60,
    "description": "Fresh red apples from local farm"
  }'

# Expected Response (200 OK)
{
  "id": 1,
  "name": "Red Apple",
  "price": 0.60,
  "inventory": 100,
  "description": "Fresh red apples from local farm",
  "created_at": "2024-01-20T10:00:00Z",
  "updated_at": "2024-01-20T10:30:00Z"
}
```

## 4. Update Inventory
```bash
# Request
curl -X PATCH http://localhost:3000/api/admin/grocery/1/inventory \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "inventory": 75
  }'

# Expected Response (200 OK)
{
  "id": 1,
  "name": "Red Apple",
  "price": 0.60,
  "inventory": 75,
  "description": "Fresh red apples from local farm",
  "created_at": "2024-01-20T10:00:00Z",
  "updated_at": "2024-01-20T10:45:00Z"
}
```

## 5. Delete Grocery Item
```bash
# Request
curl -X DELETE http://localhost:3000/api/admin/grocery/1 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Expected Response (204 No Content)
```

## Error Cases

### 1. Unauthorized Access (No Token)
```bash
# Request
curl -X GET http://localhost:3000/api/admin/grocery

# Expected Response (401 Unauthorized)
{
  "message": "Authentication required"
}
```

### 2. Invalid Token
```bash
# Request
curl -X GET http://localhost:3000/api/admin/grocery \
  -H "Authorization: Bearer invalid_token"

# Expected Response (403 Forbidden)
{
  "message": "Invalid token"
}
```

### 3. Non-Admin Access
```bash
# Request with user token
curl -X GET http://localhost:3000/api/admin/grocery \
  -H "Authorization: Bearer USER_TOKEN"

# Expected Response (403 Forbidden)
{
  "message": "Admin access required"
}
```

### 4. Invalid Grocery Item Data
```bash
# Request
curl -X POST http://localhost:3000/api/admin/grocery \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "",
    "price": -1,
    "inventory": -10
  }'

# Expected Response (400 Bad Request)
{
  "message": "Invalid grocery item data"
}
```

### 5. Item Not Found
```bash
# Request
curl -X PUT http://localhost:3000/api/admin/grocery/999 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Test Item"
  }'

# Expected Response (404 Not Found)
{
  "message": "Grocery item not found"
}
``` 