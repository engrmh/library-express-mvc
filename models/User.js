const { resolve } = require("path");
const db = require("./../db.json");
const fs = require("fs");

const getAll = () => {
  return new Promise((resolve, reject) => {
    resolve(db.users);
  });
};

const add = (newUser) => {
  return new Promise((resolve, reject) => {
    db.users.push(newUser);

    fs.writeFile(`${process.cwd()}/db.json`, JSON.stringify(db), (err) => {
      if (err) {
        reject(err);
      }
      resolve({ message: "New User Registered Successfully" });
    });
  });
};

const upgrade = (userId) => {
  return new Promise((resolve, reject) => {
    db.users.forEach((user) => {
      if (user.id === Number(userId)) {
        user.role = "ADMIN";
      }
    });

    fs.writeFile(`${process.cwd()}/db.json`, JSON.stringify(db), (err) => {
      if (err) {
        reject(err);
      }
      resolve({ message: "User Upgraded Successfully" });
    });
  });
};

const crime = (userId, crime) => {
  return new Promise((resolve, reject) => {
    db.users.forEach((user) => {
      if (user.id === Number(userId)) {
        user.crime += crime;
      }
    });

    fs.writeFile(`${process.cwd()}/db.json`, JSON.stringify(db), (err) => {
      if (err) {
        reject(err);
      }
      resolve({ message: "Crime Set Successfully" });
    });
  });
};

module.exports = {
  getAll,
  add,
  upgrade,
  crime,
};
