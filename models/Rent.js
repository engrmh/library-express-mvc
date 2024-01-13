const db = require("./../db.json");
const fs = require("fs");

const add = (newRent) => {
  return new Promise((resolve, reject) => {
    db.rents.push(newRent);

    fs.writeFile(`${process.cwd()}/db.json`, JSON.stringify(db), (err) => {
      if (err) {
        reject(err);
      }
      resolve({ message: "Book Reserved Successfully" });
    });
  });
};

module.exports = {
  add,
};
