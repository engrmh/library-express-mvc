const url = require("url");
const BookModel = require("./../models/Book");
const crypto = require("crypto");

const getAll = async (req, res) => {
  const book = await BookModel.find();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(book));
  res.end();
};

const removeOne = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const bookID = parsedUrl.query.id;

  const removeBook = await BookModel.remove(bookID);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(removeBook));
  res.end();
};

const addBook = async (req, res) => {
  let book = "";

  req.on("data", (data) => {
    book = book + data.toString();
  });

  req.on("end", async () => {
    const newBook = { id: crypto.randomUUID(), ...JSON.parse(book), free: 1 };
    const addBook = await BookModel.add(newBook);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify(addBook));
    res.end();
  });
};

const bookBack = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const bookID = parsedUrl.query.id;

  const backBookRes = await BookModel.backing(bookID);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(backBookRes));
  res.end();
};

const editBook = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const bookID = parsedUrl.query.id;

  let bookNewInfos = "";

  req.on("data", (data) => {
    bookNewInfos = bookNewInfos + data.toString();
  });

  req.on("end", async () => {
    const reqBody = JSON.parse(bookNewInfos);

    const editingBook = await BookModel.edit(bookID, reqBody);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(editingBook));
    res.end();
  });
};

module.exports = {
  getAll,
  removeOne,
  addBook,
  bookBack,
  editBook,
};
