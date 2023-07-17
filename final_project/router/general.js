const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    const bookList = Object.values(books); // Convert the books object into an array of values

    const formattedBookList = JSON.stringify(bookList, null, 2);

    return res.status(300).send(`<pre>${formattedBookList}</pre>`);
});

// get by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn; // Get the ISBN from the request parameters
  
    // Find the book with the given ISBN in the books database
    const book = books[isbn];
  
    if (book) {
      return res.status(300).json({ message: "Multiple choices", options: [book] });
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  });
  
  
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const authorName = req.params.author; // Get the author name from the request parameters
    const booksByAuthor = []; // To store books that match the provided author
  
    // Iterate through the 'books' object to find books with matching author
    Object.values(books).forEach((book) => {
      if (book.author === authorName) {
        booksByAuthor.push(book);
      }
    });
  
    if (booksByAuthor.length > 0) {
      return res.status(300).json({
        message: "Multiple choices",
        options: booksByAuthor
      });
    } else {
      return res.status(404).json({ message: "Books by this author not found" });
    }
  });
  

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title; // Get the title from the request parameters
    const bookKeys = Object.keys(books); // Obtain all the keys (book identifiers) from the 'books' object
  
    // Initialize an array to store book details with the given title
    const booksByTitle = [];
  
    // Iterate through the 'books' array & check if the title matches the one provided in the request parameters
    bookKeys.forEach((key) => {
      const book = books[key];
      if (book.title === title) {
        booksByTitle.push(book);
      }
    });
  
    if (booksByTitle.length > 0) {
      return res.status(300).json({ message: "Multiple choices", options: booksByTitle });
    } else {
      return res.status(404).json({ message: "No books found with this title" });
    }
  });
  

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn; // Get the ISBN from the request parameters
  
    // Find the book with the given ISBN in the books database
    const book = books[isbn];
  
    if (book) {
      const reviews = book.reviews || []; // Get the reviews for the book or an empty array if no reviews exist
      return res.status(300).json({ message: "Book reviews", reviews });
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  });
  
module.exports.general = public_users;
