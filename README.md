# E-commerce Platform (Task Vistaar)

This project is a full-stack e-commerce platform built with React, Redux, and Tailwind CSS on the frontend, and Node.js, Express, and MongoDB on the backend. The platform supports user and admin roles, product management, order processing, and authentication via email and Google OAuth.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  
## Features

- User authentication and authorization
- Admin dashboard for managing products and orders
- User dashboard for viewing orders
- Product listing and details pages
- Shopping cart functionality
- Order processing
- Google OAuth integration

## Technologies Used

### Frontend

- React
- Redux
- Tailwind CSS
- React Router
- Axios
- Swiper

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Passport.js (Google OAuth)
- ImageKit

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory with the following variables:

```sh
PORT=8080
MONGODB_URL=<your-mongodb-url>
EXPRESS_SESSION_SECRET=<your-session-secret>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:5173/
BACKEND_URL=http://localhost:8080/

PUBLICK_KEY_IMAGEKIT=<your-imagekit-public-key>
PRIVATE_KEY_IMAGEKIT=<your-imagekit-private-key> 
ENDPOINT_URL_IMAGEKIT=<your-imagekit-endpoint-url>

GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

### Frontend

No specific environment variables are required for the frontend.

## Setup Instructions

### Backend Setup

1. Navigate to the `backend` directory:

```sh
cd backend
```

2. Install the dependencies:

```sh
npm install
```

3. Start the backend server:

```sh
npm start
```

### Frontend Setup

0. First Go to src/utils/axio.js file and change your BaseURL to

```sh
BaseURL = "http://localhost:8080/";
```

1. Navigate to the `frontend` directory:

```sh
cd frontend
```

2. Install the dependencies:

```sh
npm install
```

3. Start the frontend development server:

```sh
npm run dev
```