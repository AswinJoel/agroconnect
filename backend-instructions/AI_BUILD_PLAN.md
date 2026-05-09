# AgroConnect Backend Build Instructions

Hello! You are tasked with building the backend and AI microservice for **AgroConnect**, a direct farm-to-customer e-commerce marketplace. The frontend UI has already been designed. Your objective is to build a robust, production-ready backend.

## Architecture & Tech Stack
*   **Backend API**: Node.js + Express.js
*   **Database**: MongoDB (using Mongoose ODM)
*   **AI Microservice**: Python + FastAPI
*   **Authentication**: JWT + Mock OTP flow (ready to be swapped for Firebase Auth)
*   **Real-time Features**: Socket.io (for GPS tracking)
*   **Payment**: Razorpay (or mock integration)

## Directory Structure to Create
Please set up the code in the following structure within the workspace:
```
/backend         -> Node.js + Express API
/ai-service      -> Python FastAPI (image classifier)
```

## Database Schema (MongoDB / Mongoose)
Please implement the following models:
1.  **Users**: `{ _id, name, phone, role (enum: farmer/customer/admin), location{lat,lng}, createdAt }`
2.  **Farmers**: `{ userId (ref Users), farmName, farmAddress, gpsCoords, verified, bankDetails, rating }`
3.  **Products**: `{ _id, farmerId (ref Farmers), name, category, price, stock, images[], aiGrade, aiScore, origin{lat,lng}, createdAt }`
4.  **Orders**: `{ _id, customerId (ref Users), farmerId (ref Farmers), items[{productId, quantity}], totalAmount, status, deliveryAddress, trackingCoords, paymentId, createdAt }`
5.  **Reviews**: `{ _id, productId (ref Products), customerId (ref Users), rating, comment, createdAt }`
6.  **ChatSessions**: `{ _id, userId, messages[{role, content, timestamp}] }`

## REST API Endpoints to Implement

### Auth
*   `POST /api/auth/send-otp` (Mock SMS sending)
*   `POST /api/auth/verify-otp` (Returns JWT token)

### Products
*   `GET /api/products` (Support filtering by category, aiGrade, and location radius)
*   `GET /api/products/:id`
*   `POST /api/products` (Requires Farmer JWT)
*   `PATCH /api/products/:id`

### Orders & Tracking
*   `POST /api/orders` (Requires Customer JWT)
*   `GET /api/orders/:id`
*   `PATCH /api/orders/:id/status` (Requires Farmer/Admin JWT)
*   `GET /api/orders/:id/track`
*   `POST /api/orders/:id/location` (Agent real-time update via REST or Socket.io)

### Farmers
*   `GET /api/farmers/nearby?lat=&lng=&radius=`

## AI Microservice (Python / FastAPI)
*   Create a FastAPI server in `/ai-service`.
*   Implement `POST /api/ai/grade-image`. It should accept a multipart image upload.
*   **Logic**: Run inference using a mock TensorFlow/PyTorch MobileNetV3 model (or a dummy randomizer for now) that returns one of the following grades with a confidence score:
    *   "Very good to buy" (fresh, vibrant, no spots)
    *   "Good to buy" (fresh, minor imperfections)
    *   "Better" (acceptable, slight aging)
    *   "Quick to cook" (use soon, visible softening)
    *   "Not fair" (overripe, not recommended for sale)

## Chatbot Proxy
*   Implement `POST /api/chat/message` in the Node.js backend.
*   It should integrate with the Claude API (claude-3-haiku) or Gemini API.
*   System Prompt: "You are AgroConnect's friendly assistant. Help users with: tracking orders, finding fresh produce, understanding AI freshness grades, payment issues, and connecting with farmers."

## Execution Steps
1. Initialize the `/backend` Node.js project, install dependencies (express, mongoose, jsonwebtoken, etc.), and set up the Express server and MongoDB connection.
2. Create the Mongoose schemas.
3. Implement the Auth routes and JWT middleware.
4. Implement the Products, Orders, and Farmers REST APIs.
5. Initialize the `/ai-service` Python project, install FastAPI and Uvicorn, and create the image grading endpoint.
6. Write a `docker-compose.yml` in the root to run both the Node backend and Python FastAPI service together.

Please ensure all code is production-ready, well-commented, and includes error handling. Do not use placeholders for core business logic.
