const { MongoClient } = require("mongodb");
require("dotenv").config();

const dbConnection = new MongoClient(process.env.dbConnectinUrl);
const dbName = process.env. dbName;

const main = async () => {
  await dbConnection.connect();
  console.log("Connected successfully to server");
  const db = dbConnection.db(dbName);
  return "Done";
};

main().then(console.log).catch(console.error);
