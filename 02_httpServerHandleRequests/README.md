# Basic HTTP server

## Exercise 1: Simple HTTP Server

Create a basic HTTP server listening on port 3000. The server should respond with "Welcome to my first Node.js server!" when visiting the root URL (/).

## Exercise 2: Handling Different HTTP Requests

Modify the server to handle two endpoints: /products and /orders. Visiting /products should respond with "Here are all products," and /orders should respond with "Here are all orders." If the client attempts to access another URL, respond with a 404 status code and the message "You are trying to access a non-existent URL."

(Note: `req.url` indicates the URL the client is trying to access.)

## Exercise 3: Simple RESTful API Server

Task: Create a basic RESTful API server handling GET requests. The server should have an endpoint /api/messages that returns a list of messages in JSON format. Read the list from a JSON file using the fs library.
