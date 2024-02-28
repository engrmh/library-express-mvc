const booksModel = require("../models/books");
const { isValidObjectId } = require("mongoose");

exports.getAll = async (req, res) => {
  try {
    const allBooks = await booksModel.find({}).lean();
    res.status(200).json({ message: "OK", datas: allBooks });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidID = isValidObjectId(id);

    if (!isValidID) {
      res.status(400).json({ message: "Invalid Book ID" });
    }

    const book = await booksModel.findOne({ _id: id });
    res.status(200).json({ message: "OK", data: book });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidID = isValidObjectId(id);

    if (!isValidID) {
      res.status(400).json({ message: "Invalid Book ID" });
    }

    const result = await booksModel.deleteOne({ _id: id });

    if (result) {
      res.status(200).json({ message: "Book Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Book Not Found" });
    }
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.addNewBook = async (req, res) => {
  try {
    const { title, author, price } = req.body;

    const result = await booksModel.create({
      title,
      author,
      price,
      free: 1,
    });

    if (result) {
      res.status(200).json({ message: "Book Created Successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

exports.backingBook = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidID = isValidObjectId(id);

    if (!isValidID) {
      res.status(400).json({ message: "Invalid Book ID" });
    }

    const result = await booksModel.updateOne(
      { _id: id },
      { $set: { free: 1 } }
    );

    if (result) {
      res.status(200).json({ message: "Book Backed Successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidID = isValidObjectId(id);

    if (!isValidID) {
      res.status(400).json({ message: "Invalid Book ID" });
    }
    const { title, author, price } = req.body;

    const result = await booksModel.updateOne(
      { _id: id },
      {
        $set: {
          title,
          author,
          price,
        },
      }
    );

    if (result) {
      res.status(200).json({ message: "Book Edited Successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

exports.setRent = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidID = isValidObjectId(id);

    if (!isValidID) {
      res.status(400).json({ message: "Invalid Book ID" });
    }

    const result = await booksModel.updateOne(
      { _id: id },
      { $set: { free: 0 } }
    );

    if (result) {
      res.status(200).json({ message: "Book Backed Successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};
