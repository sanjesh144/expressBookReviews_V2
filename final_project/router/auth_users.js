const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    // Code to check if the username is valid (e.g., username should not be empty)
    return username.trim() !== '';
  };

const authenticatedUser = (username, password) => {
    // Code to check if username and password match the one we have in records.
    const user = users.find((user) => user.username === username && user.password === password);
    return !!user; // Return true if user is found, otherwise false
  };

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
