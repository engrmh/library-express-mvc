const http = require("http");
const fs = require("fs");
const url = require("url");
const db = require("./db.json");
const bookController = require("./controllers/bookController");
const userController = require("./controllers/userController");
const rentController = require("./controllers/rentController");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/users") {
    fs.readFile("db.json", (err, db) => {
      if (err) {
        throw err;
      }

      const data = JSON.parse(db);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(data.users));
      res.end();
    });
  } else if (req.method === "GET" && req.url === "/api/books") {
    bookController.getAll(req, res);
  } else if (req.method === "DELETE" && req.url.startsWith("/api/books")) {
    bookController.removeOne(req, res);
  } else if (req.method === "POST" && req.url === "/api/books") {
    bookController.addBook(req, res);
  } else if (req.method === "PUT" && req.url.startsWith("/api/books/back")) {
    bookController.bookBack(req, res);
  } else if (req.method === "PUT" && req.url.startsWith("/api/books")) {
    bookController.editBook(req, res);
  } else if (req.method === "POST" && req.url === "/api/users") {
    userController.addOne(req, res);
  } else if (req.method === "PUT" && req.url.startsWith("/api/users/upgrade")) {
    userController.upgradeUser(req, res);
  } else if (req.method === "PUT" && req.url.startsWith("/api/users/crime")) {
    userController.crimingUser(req, res);
  } else if (req.method === "POST" && req.url === "/api/users/login") {
    userController.login(req, res);
  } else if (req.method === "POST" && req.url === "/api/books/rent") {
    rentController.addNewRent(req, res);
  }
});

server.listen(4000, () => {
  console.log("Server Rinning On Port 4000");
});
