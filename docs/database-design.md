# StockFlow — Database Design

## 1. Users Collection

Stores system user information.

| Field         | Type      | Description            |
|---------------|-----------|------------------------|
| _id           | ObjectId  | User ID                |
| name          | String    | User name              |
| email         | String    | User email             |
| passwordHash  | String    | Hashed password        |
| role          | String    | admin or staff         |
| createdAt     | Date      | Account creation date  |

## 2. Products Collection

Stores product information.

| Field         | Type     | Description            |
|---------------|----------|------------------------|
| _id           | ObjectId | Product ID             |
| sku           | String   | Unique product code    |
| name          | String   | Product name           |
| category      | String   | Product category       |
| unit          | String   | Unit of measurement    |
| quantity      | Number   | Current stock quantity |
| reorderLevel  | Number   | Minimum stock level    |
| createdAt     | Date     | Creation date          |
| updatedAt     | Date     | Last update date       |

## 3. StockMovements Collection

Stores stock-in and stock-out transaction history.

| Field         | Type      | Description           |
|---------------|-----------|-----------------------|
| _id           | ObjectId  | Movement ID           |
| productId     | ObjectId  | Reference to Product  |
| type          | String    | stock-in or stock-out |
| quantity      | Number    | Movement quantity     |
| note          | String    | Transaction note      |
| performedBy   | ObjectId  | Reference to User     |
| createdAt     | Date      | Transaction date      |

## 4. Relationships

- One User can perform many StockMovements.
- One Product can have many StockMovements.
- Each StockMovement references one Product and one User.

## 5. Business Rules

1. SKU must be unique.
2. Product quantity cannot be negative.
3. Stock-in increases product quantity.
4. Stock-out decreases product quantity.
5. Every stock transaction must create a StockMovement record.
6. Only authorized users can perform stock operations.