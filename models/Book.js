const db = require("./../db.json");
const fs = require("fs");

const find = () => {
  return new Promise((resolve, reject) => {
    resolve(db.books);
  });
};

const remove = (bookID) => {
  return new Promise((resolve, reject) => {
    const newBooks = db.books.filter((book) => book.id != Number(bookID));

    if (newBooks.length === db.books.length) {
      reject({ message: "Book Not Found" });
    } else {
      fs.writeFile(
        `${process.cwd()}/db.json`,
        JSON.stringify({ ...db, books: newBooks }),
        (err) => {
          if (err) {
            reject(err);
          }
          resolve({ message: "Book Removed Successfully" });
        }
      );
    }
  });
};

const add = (newBook) => {
  return new Promise((resolve, reject) => {
    db.books.push(newBook);

    fs.writeFile(`${process.cwd()}/db.json`, JSON.stringify(db), (err) => {
      if (err) {
        reject(err);
      }
      resolve({ message: "Book Added Successfully" });
    });
  });
};

const backing = (bookID) => {
  return new Promise((resolve, reject) => {
    db.books.forEach((book) => {
      if (book.id === Number(bookID)) {
        book.free = 1;
      }
    });

    fs.writeFile(`${process.cwd()}/db.json`, JSON.stringify(db), (err) => {
      if (err) {
        reject(err);
      }
      resolve({ message: "Book Backed Successfully" });
    });
  });
};

const edit = (bookID, newData) => {
  return new Promise((resolve, reject) => {
    db.books.forEach((book) => {
      if (book.id === Number(bookID)) {
        book.title = newData.title;
        book.author = newData.author;
        book.price = newData.price;
      }
    });

    fs.writeFile(`${process.cwd()}/db.json`, JSON.stringify(db), (err) => {
      if (err) {
        reject(err);
      }
      resolve({ message: "Book Updated Successfully" });
    });
  });
};

const setRent = (bookId) => {
  return new Promise((resolve, reject) => {
    db.books.forEach((book) => {
      if (book.id === Number(bookId)) {
        book.free = 0;
      }
    });

    fs.writeFile(`${process.cwd()}/db.json`, JSON.stringify(db), (err) => {
      reject(err);
    });
    resolve({ message: "This Book Rented Successfully" });
  });
};

module.exports = {
  find,
  remove,
  add,
  backing,
  edit,
  setRent,
};
