# Book_Management

# GraphQL Node.js Express MongoDB Project

This is a Node.js project using Express.js for the backend, MongoDB for the database, and GraphQL for the API layer. The project follows an MVC (Model-View-Controller) architecture.

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

1. Clone the repository:


2. Install dependencies:


3. Set up environment variables:

Create a `.env` file in the root directory of the project and define the following variables:


## Project Structure

The project is structured as follows:

- `controllers/`: Contains controller files for handling business logic.
- `models/`: Contains MongoDB models and schemas.
- `routes/`: Contains route files defining API endpoints.
- `middlewares/`: Contains middleware functions.
- `schema.graphql`: Defines the GraphQL schema using GraphQL schema language.
- `resolvers.js`: Implements resolver functions for handling GraphQL queries.
- `server.js`: Entry point of the application.

## Usage

To start the server, run:


The server will start listening on port 8080 by default. You can access the GraphQL Playground at `http://localhost:8080/graphql` to interact with the API.

## Available Endpoints

- `/graphql`: GraphQL endpoint for querying and mutating data.

## Contributing

Feel free to contribute to this project by creating issues or pull requests. All contributions are welcome!

