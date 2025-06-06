# Tourism Booking App

A web application for booking tourist accommodations and guides.

## Features

- User authentication and registration
- Accommodation listings and bookings
- Tour guide profiles and services
- Search and filtering functionality
- Booking management
- Rating and review system
- Multi-language support (English/Russian)
- Responsive design

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

### Frontend
- React
- TypeScript
- Material-UI
- i18next for translations

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

```bash
# Install dependencies for all parts of the application
npm run install-all

# Start the backend server
npm start

# In a separate terminal, start the frontend development server
cd frontend
npm start
```

## Environment Variables

The following environment variables are required:

- `NODE_ENV`: Set to "production" for production environment
- `PORT`: The port number for the backend server (default: 10000)

## Deployment

This application is configured for deployment on Render. The configuration can be found in `render.yaml`.

## Running Tests

### Backend Tests
```bash
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## API Documentation

### Authentication Endpoints
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Accommodation Endpoints
- GET `/api/accommodations` - Get all accommodations
- GET `/api/accommodations/:id` - Get accommodation by ID
- GET `/api/accommodations/search` - Search accommodations

### Guide Endpoints
- GET `/api/guides` - Get all guides
- GET `/api/guides/:id` - Get guide by ID
- GET `/api/guides/search` - Search guides

### Booking Endpoints
- GET `/api/bookings` - Get user's bookings
- POST `/api/bookings` - Create a booking
- PUT `/api/bookings/:id` - Update booking
- DELETE `/api/bookings/:id` - Cancel booking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details 