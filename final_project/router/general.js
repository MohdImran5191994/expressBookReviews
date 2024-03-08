const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  
    });
    const doesExist = (username)=>{
        let userswithsamename = users.filter((user)=>{
          return user.username === username
        });
        if(userswithsamename.length > 0){
          return true;
        } else {
          return false;
        }
      }

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    new Promise((resolve, reject) => {
     const mybooks = books
     resolve(mybooks)
   }).then((mybooks)=>{
     res.send(JSON.stringify({ mybooks }, null, 4))
   }).catch((error) => {
     console.error('Error:', error);
     res.status(500).send('Internal Server Error');
   });
   
 })

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here    
    const isbn = req.params.isbn
    new Promise((resolve,reject)=>{
        if(isbn<=books[isbn]){ 
            isbnbook = books[isbn]
              resolve(isbnbook)}
              reject(new Error('book not found'))
    }).then((isbnbook)=>{ res.status(300).json(isbnbook)
    }).catch((error) => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      })
   });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    const author =req.params.author
    new Promise((resolve,reject)=>{
      // const bookkey = Object.keys(books)
  
      for(let i=1;i<=Object.keys(books).length;i++){
        if(books[i].author === author){
          const bookauthor = books[i]
          resolve (bookauthor)
  }}
  reject(new Error('book not found'))
  }).then((bookauthor)=>{ res.status(300).json(bookauthor)
  }).catch((error) => {
  console.error('Error:', error);
  res.status(500).send('Internal Server Error');
  })
    
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title =req.params.title
    new Promise((resolve,reject)=>{
      // const bookkey = Object.keys(books)

      for(let i=1;i<=Object.keys(books).length;i++){
        if(books[i].title === title){
          const booktitle = books[i]
          resolve (booktitle)
}}
reject(new Error('book not found'))
}).then((booktitle)=>{ res.status(300).json(booktitle)
}).catch((error) => {
  console.error('Error:', error);
  res.status(500).send('Internal Server Error');
})
    });
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
     new Promise((resolve,reject)=>{
      const bokisbn=books[isbn];
      resolve(bokisbn)
  }).then((bokisbn) =>{
    res.status(300).json(bokisbn.reviews)
  }).catch((error) => {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  });
  }
  );

module.exports.general = public_users;
