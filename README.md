# Todos Service

## Intro

The `todos-service` handles CRUD operations for managing todos.
It's built using Node.js and MongoDB.

## Assumption

1. There is a single user for the application, and no authentication is required.

## System Architecture

**todos-service** provides the following endpoints:

- `GET /todos` - Retrieves all todos.
- `POST /todos` - Creates a new todo.
- `PUT /todos/:id` - Updates a todo by ID.
- `DELETE /todos/:id` - Deletes a todo by ID.

## Running the Application

1. Clone the repository: `git clone https://github.com/danielbellmas/todos-service.git`
1. Install the dependencies for `todos-service`:
   ```bash
   npm install
   ```
1. Add a `.env` file in the root directory according to `.env.example`

1. Start the `todos-service`:
   ```bash
   npm start
   ```
