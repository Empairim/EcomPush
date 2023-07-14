# EcomPush
For the green ECOM Crm EcomWebsite and Ecom api
# E-commerce Application

This is an e-commerce application built with Docker, Node.js/Express for the API backend, and Next.js for the frontend.

## Features

- User authentication and authorization
- Product catalog and search functionality
- Shopping cart and checkout process
- Order management and tracking
- Customer Relationship Management (CRM) integration
- Responsive and user-friendly UI

## Prerequisites

- Docker
- Node.js (v12 or higher)

## Installation

1. Clone the repository:

git clone <repository-url>


2. Navigate to the project directory:

cd e-commerce-app


3. Install dependencies for the API backend:

cd backend
npm install


4. Install dependencies for the frontend:

cd ../frontend
npm install


## Configuration

1. Create a `.env` file in the `backend` directory based on the provided `.env.example` file. Update the variables with your own configuration details, such as database connection URL, JWT secret, etc.

2. Create a `.env.local` file in the `frontend` directory based on the provided `.env.example` file. Update the variables with your own configuration details, such as API endpoint URL, etc.

## Usage

1. Start the Docker containers:

docker-compose up


2. The API backend will be running on `http://localhost:3000` and the frontend on `http://localhost:4000`.

3. Access the application in your web browser by visiting `http://localhost:4000`.

## Development

- To start the API backend in development mode:

cd backend
npm run dev


- To start the frontend in development mode:

cd frontend
npm run dev


- The API backend will be running on `http://localhost:3000` and the frontend on `http://localhost:3001`.

## Deployment

- To deploy the application to a production environment, follow the appropriate deployment process for Docker containers and Node.js/Next.js applications.

## Contributing

Contributions are welcome! Please follow the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.
