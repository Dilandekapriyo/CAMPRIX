# CAMPRIX Backend

A Node.js backend API connected to MySQL database.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup MySQL Database**
   - Make sure MySQL is installed and running on your system
   - Run the setup.sql script to create the database and tables:
     ```bash
     mysql -u root -p < setup.sql
     ```
   - Update the database connection details in `index.js` if needed:
     - host: 'localhost'
     - user: 'root' (your MySQL username)
     - password: '' (your MySQL password)
     - database: 'camprix_db'

3. **Start the Server**
   ```bash
   npm start
   ```

The server will run on http://127.0.0.1:3000

## API Endpoints

### GET /api/users
Get all users from the database.

**Response:**
```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-09T10:00:00.000Z"
    }
  ]
}
```

### GET /api/users/:id
Get a specific user by ID.

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-09T10:00:00.000Z"
  }
}
```

### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "name": "New User",
  "email": "newuser@example.com"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "userId": 4
}
```

### GET /api/products
Get all products from the database.

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 29.99,
      "description": "Product description",
      "created_at": "2024-01-09T10:00:00.000Z"
    }
  ]
}
```

### GET /api/products/:id
Get a specific product by ID.

**Response:**
```json
{
  "product": {
    "id": 1,
    "name": "Product Name",
    "price": 29.99,
    "description": "Product description",
    "created_at": "2024-01-09T10:00:00.000Z"
  }
}
```

### POST /api/products
Create a new product.

**Request Body:**
```json
{
  "name": "New Product",
  "price": 19.99,
  "description": "New product description"
}
```

**Response:**
```json
{
  "message": "Product created successfully",
  "productId": 5
}
```

## Frontend Integration

The API includes CORS headers to allow communication with your frontend. You can make requests from your frontend application to these endpoints to retrieve and send data to/from the database.