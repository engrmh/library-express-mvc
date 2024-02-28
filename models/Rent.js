const db = require("./../db.json");
const { dbConnection } = require("../configs/db");

const add = async (newRent) => {
  const db = await dbConnection();
  const rentsCollection = db.collection(rents);
  const result = await rentsCollection.insertOne(newRent);

  if (result.acknowledged) {
    return { message: "Book Reserved Successfully" };
  }
};

module.exports = {
  add,
};
