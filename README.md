
# Security Learning Portal

A full-stack web application for learning cybersecurity
through books, videos, and articles.

## Technologies

### Frontend
- React
- Vite
- React Router
- CSS
- Lucide React

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Zod

## Features

- Responsive user interface
- Cybersecurity learning resources
- Books, videos, and articles
- Search functionality
- Category and resource type filtering
- REST API integration
- Input validation using Zod
- Security middleware using Helmet
- API rate limiting
- Automated API integration tests

## Learning Categories

1. Application Security
2. Cloud Security
3. Network Security
4. Ethical Hacking

## Project Structure

security-learning-portal/
  frontend/
  backend/
  README.md
  .gitignore

## Running the Project

Requirements:
- Node.js
- PostgreSQL
- npm

### Backend

cd backend
npm install

Configure the DATABASE_URL and PORT variables
in backend/.env.

Run Prisma migrations and generate the client:

npx prisma migrate deploy
npx prisma generate

Start the backend:

npm run dev

Backend URL:
http://localhost:5000

### Frontend

cd frontend
npm install
npm run dev

Frontend URL:
http://localhost:5173

## API Endpoints

GET /api/health

GET /api/resources

GET /api/resources?search=OWASP

GET /api/resources?type=BOOK

GET /api/resources?category=Cloud%20Security

## Testing

cd backend

node --env-file=.env --test tests/api.test.js

## Current Test Results

- 10 API tests passed
- 0 API tests failed
- Frontend production build successful

## Future Improvements

- Additional learning resources
- Expanded frontend testing
- Production deployment
