const crypto = require("crypto");
const RentModel = require("../models/Rent");
const BookModel = require("../models/Book");

const addNewRent = async (req, res) => {
  try {
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
          userID,
          bookID,
        };

        const addNewRent = await RentModel.add(newRent);
        const setBookRent = await BookModel.setRent(bookID, userID);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(setBookRent));
      } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "This book is not free" }));
      }
    });
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
};

module.exports = {
  addNewRent,
};
