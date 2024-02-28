const mongoose = require("mongoose");

const booksModel = mongoose.model(
  "books",
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    free: {
      type: Number,
      required: true,
      // default: false,
    },
  }
  // {
  //   timestamps: true,
  // }
);

module.exports = booksModel;

// const find = async () => {
//   const db = await dbConnection();
//   const booksCollection = db.collection("books");
//   const books = booksCollection.find({}).toArray();

//   return books;
// };

// const remove = async (bookID) => {
//   const db = await dbConnection();
//   const booksCollection = db.collection("books");
//   const result = await booksCollection.deleteOne({ _id: new ObjectId(bookID) });

//   console.log(result);
//   if (result.deletedCount === 1) {
//     return { message: "Book Removed Successfully" };
//   } else {
//     return { message: "Book Not Found" };
//   }
// };

// const add = async (newBook) => {
//   const db = await dbConnection();
//   const booksCollection = db.collection("books");
//   const result = await booksCollection.insertOne(newBook);

//   if (result.acknowledged) {
//     return { message: "Book Added Successfully" };
//   } else {
//     return { message: "Server Error" };
//   }
// };

// const backing = async (bookID) => {
//   const db = await dbConnection();
//   const bookCollection = db.collection("books");
//   const result = await bookCollection.updateOne(
//     { _id: new ObjectId(bookID) },
//     { $set: { free: 1 } }
//   );

//   if (result.acknowledged) {
//     return { message: "Book Backed Successfully" };
//   }
// };

// const edit = async (bookID, newData) => {
//   const db = await dbConnection();
//   const bookCollection = db.collection("books");
//   const result = await bookCollection.updateOne(
//     { _id: new ObjectId(bookID) },
//     {
//       $set: {
//         title: newData.title,
//         author: newData.author,
//         price: newData.price,
//       },
//     }
//   );
//   if (result.acknowledged) {
//     return { message: "Book Updated Successfully" };
//   } else {
//     return { message: "Book Not Found!!" };
//   }
// };

// const setRent = async (bookId) => {
//   const db = await dbConnection();
//   const bookCollection = db.collection("books");
//   const result = await bookCollection.updateOne(
//     { _id: new ObjectId(bookId) },
//     { $set: { free: 0 } }
//   );

//   if (result.acknowledged) {
//     return { message: "This Book Rented Successfully" };
//   }
// };

// module.exports = {
//   find,
//   remove,
//   add,
//   backing,
//   edit,
//   setRent,
// };
