## Car_Store API ##



The **Car and Store** project is a car management system API which is developed  with **Node.js**, **Express.js**, and **MongoDB**. This project allows users to manage cars in a store with operations like creating a new car, retrieving a car's information, updating the data, and deleting a car from the database. In addition, it provides functionality to order cars, manage inventory, and calculate revenue from orders.


---
```
            car-and-store-api/
├── src/
│   ├── features/
│   │   ├── cars/                # Car feature directory
│   │   │   ├── carModel.ts      # Mongoose schema for Car
│   │   │   ├── carController.ts # Controller for handling car-related logic Business logic related to cars (e.g., create,Read, update, delete)
│   │   │   ├── carRoutes.ts     # Car-related API routes

│   │   ├── orders/              # Order feature directory
│   │   │   ├── orderModel.ts    # Mongoose schema for Order
│   │   │   ├── orderController.ts # Controller for handling order-related logic and Business logic related to orders (e.g., creating orders, calculating revenue)
│   │   │   ├── orderRoutes.ts   # Order-related API routes
│   │ 
│   ├── app.ts                   # Main app setup (express app configuration)
│   └── server.ts                # Entry point to start the server
├── .env                         # Environment variables (MONGO_URI, PORT, etc.)
├── package.json                 # Project metadata and dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation (README)

```
documentation

## Features

### 1. **Create a Car**
   - **Endpoint**: `/api/cars`
   - **Method**: `POST`
   - **Description**: Allows the creation of a new car entry in the store inventory.
   - **Request Body Example**:
     ```json
     {
       "brand": "Chevrolet",
       "model": "Corvette",
       "year": 2023,
       "price": 70000,
       "category": "Coupe",
       "description": "A high-performance sports car with stunning design.",
       "quantity": 5,
       "inStock": true
     }
     ```
 ### 2. **Get All Cars**
   - **Endpoint**: `/api/cars`
   - **Method**: `GET`
   - **Description**: Retrieves a list of all cars in the inventory.

 ### 3. **Get a Car by ID**
   - **Endpoint**: `/api/cars/:id`
   - **Method**: `GET`
   - **Description**: Retrieves a specific car by its ID.
   - **Response Example**:
     ```json
     {
       "_id": "674ab74cc715555dd2c59fca",
       "brand": "Chevrolet",
       "model": "Corvette",
       "year": 2023,
       "price": 70000,
       "category": "Coupe",
       "description": "A high-performance sports car with stunning design.",
       "quantity": 5,
       "inStock": true
     }
     ```

### 4. **Delete a Car by ID**
   - **Endpoint**: `/api/cars/:id`
   - **Method**: `DELETE`
   - **Description**: Deletes a car entry from the inventory by its ID.

### 5. **Update a Car by ID**
   - **Endpoint**: `/api/cars/:id`
   - **Method**: `PUT`
   - **Description**:Updates specific fields of a car by its unique ID, such as price, quantity, and category, validating them to ensure data integrity while leaving other fields untouched. 
  ```json
{
  "price": 27000,
  "quantity": 30
}
```


```jsx
{
  "message": "Car updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "brand": "Toyota",
    "model": "Camry",
    "year": 2024,
    "price": 27000,  // Price updated
    "category": "Sedan",
    "description": "A reliable family sedan with modern features.",
    "quantity": 30,  // Quantity updated
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z"  // Updated timestamp
  }
}
```

### 6. **Order a Car**
   - **Endpoint**: `/api/orders`
   - **Method**: `POST`
   - **Description**: Allows users to place an order for a car.
   - **Request Body Example**:
     ```json
     {
       "email": "customer@example.com",
       "car": "648a45e5f0123c45678d9012",
       "quantity": 1,
       "totalPrice": 27000
     }
     ```
   - **Response Example**:
     ```json
     {
       "message": "Order created successfully",
       "status": true,
       "data": {
         "_id": "648b45f5e1234b56789a6789",
         "email": "customer@example.com",
         "car": "648a45e5f0123c45678d9012",
         "quantity": 1,
         "totalPrice": 27000,
         "createdAt": "2024-11-19T12:00:00.000Z",
         "updatedAt": "2024-11-19T12:00:00.000Z"
       }
     }
     ```

   - **Inventory Management Logic**:
     - When an order is placed, the quantity of the ordered car will be reduced in the inventory.
     - If the inventory quantity goes to zero, the car's `inStock` status will be set to `false`.
     - If there is insufficient stock, an appropriate error message will be returned.

### 7. **Calculate Revenue from Orders**
   - **Endpoint**: `/api/orders/revenue`
   - **Method**: `GET`
   - **Description**: Calculates the total revenue from all orders placed.
   - **Response Example**:
     ```json
     {
       "message": "Revenue calculated successfully",
       "status": true,
       "data": {
         "totalRevenue": 810000
       }
     }
     ```
   - **Calculation**: The total revenue is calculated by multiplying the price of each car by the quantity ordered for all orders.
     ```