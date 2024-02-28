const express = require("express");
const app = express();
require("dotenv").config();
require("./configs/db");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
// app.use('/api/rent', rentRouter)

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
