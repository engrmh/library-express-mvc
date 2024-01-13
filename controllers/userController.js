const UserModel = require("../models/User");
const crypto = require("crypto");
const url = require("url");

const addOne = async (req, res) => {
  let user = "";

  req.on("data", (data) => {
    user = user + data.toString();
  });

  req.on("end", async () => {
    const { name, username, email } = JSON.parse(user);

    const allUsers = await UserModel.getAll();
    const isUserExist = allUsers.find(
      (user) => user.email === email || user.username === username
    );
    if (name === "" || username === "" || email === "") {
      res.writeHead(422, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "User data are not valid" }));
      res.end();
    } else if (isUserExist) {
      res.writeHead(409, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({ message: "email or username already is exist" })
      );
      res.end();
    } else {
      const newUser = {
        id: crypto.randomUUID(),
        name,
        username,
        email,
        crime: 0,
        role: "USER",
      };

      const addNewUser = await UserModel.add(newUser);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(addNewUser));
      res.end();
    }
  });
};

const upgradeUser = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const userID = parsedUrl.query.id;

  const upgradingUser = await UserModel.upgrade(userID);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(upgradingUser));
  res.end();
};

const crimingUser = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const userID = parsedUrl.query.id;
  let reqBody = "";

  req.on("data", (data) => {
    reqBody = reqBody + data.toString();
  });

  req.on("end", async () => {
    const { crime } = JSON.parse(reqBody);

    const crimeUser = await UserModel.crime(userID, crime);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(crimeUser));
    res.end();
  });
};

const login = async (req, res) => {
  let user = "";

  req.on("data", (data) => {
    user = user + data.toString();
  });

  req.on("end", async () => {
    const { username, email } = JSON.parse(user);

    const allUsers = await UserModel.getAll();

    const mainUser = allUsers.find(
      (user) => user.username === username && user.email === email
    );

    if (mainUser) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({ username: mainUser.username, email: mainUser.email })
      );
      res.end();
    } else {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "User Not Found" }));
      res.end();
    }
  });
};

module.exports = {
  addOne,
  upgradeUser,
  crimingUser,
  login,
};
