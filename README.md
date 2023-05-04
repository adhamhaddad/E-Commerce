# E-commerce Project

This is a basic e-commerce project for my graduation. The project is built using **React** for the front-end, **Node.js** for the back-end API, **Redis** for caching, and **PostgreSQL** for the database. The project is designed to simulate the functionality of an online store, allowing users to browse products, add them to their cart, and place orders.

## Getting Started

To get started with the project, follow these steps:

    Clone the repository to your local machine.
    Install the dependencies using npm install.
    Set up a PostgreSQL database.
    Set up a Redis and run the server.
    Run the database migrations using npm run migrate:up.
    Start the backend server using npm start.
    Start the frontend server using npm run dev
    Navigate to http://localhost:5173 in your web browser.

[Redis Quick start](https://redis.io/docs/getting-started/)

## Database Setup

1. Create a new PostgreSQL database named `ecommerce`.
   - `CREATE DATABASE ecommerce;`.
2. Run the following commands to create a new PostgreSQL user:
   - `CREATE ROLE admin WITH LOGIN PASSWORD 'admin';`
   - `ALTER ROLE admin SUPERUSER CREATEROLE CREATEDB;`
   - `GRANT ALL PRIVILEGES ON DATABASE ecommerce TO admin;`

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` or `yarn` to install dependencies.
3. Export the environment variables in `.env.example` to your environment variables file.
4. Start the API in dev mode with `npm run dev` or `yarn dev`.
5. Without closing the terminal, navigate to the frontend directory with `cd frontend`.
6. Run `npm install` or `yarn` to install frontend dependencies.
7. Start the frontend server with `npm run start` or `yarn start`.

## API Documentation

For more information on the API, please refer to the [API.md](./documents/API.md) document in the `documents` folder.

## Usage

Once the project is installed and running, you can access the online store by navigating to the URL of the local server. You can register as a new user, browse products, add them to your cart, and place orders. As an admin, you can manage products, orders, and users through the admin panel.

## Contributing

This project was developed as a graduation project and is not currently accepting contributions. However, feedback and suggestions for future improvements are always welcome.

## Unit Tests

No unit tests are available at this time.

## Built With

- [React](https://reactjs.org/) - Single Page Application Library
- [Node.js](https://nodejs.org) - JavaScript Runtime
- [Express](https://expressjs.com/) - JavaScript API Framework
- [Redis](https://redis.io/) - In-Memory Data Store
- [PostgreSQL](https://www.postgresql.org/) - Open Source Relational Database
