const crypto = require("crypto");
const RentModel = require("../models/Rent");
const BookModel = require("../models/Book");

const addNewRent = async (req, res) => {
  let reqBody = "";

  req.on("data", (data) => {
    reqBody = reqBody + data.toString();
  });

  req.on("end", async () => {
    let { userID, bookID } = JSON.parse(reqBody);

    const allBook = await BookModel.find();
    const isFreeBook = allBook.some(
      (book) => book.id === Number(bookID) && book.free === 1
    );

    if (isFreeBook) {
      const newRent = {
        id: crypto.randomUUID(),
        userID,
        bookID,
      };

      const addNewRent = await RentModel.add(newRent);
      const setBookRent = await BookModel.setRent(bookID);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(setBookRent));
      res.end();
    } else {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "This book is not free" }));
      res.end();
    }
  });
};

module.exports = {
  addNewRent,
};
