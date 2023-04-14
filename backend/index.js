const express = require("express");
const app = express();
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv").config();
const bookRoutes = require("./routes/books");
const port = process.env.PORT || 7000;
const connectDB = require("./config/db");
const cors = require("cors");

connectDB(process.env.MONGO_URI);

//Logger function middleware
const logger = (req, res, next) => {
  console.log(`Logged, ${req.url} | ${req.method} -- ${new Date()}`);
  next();
};

//accessing or using middleware
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bookRoutes);
app.use(require(path.join(__dirname, "./routes/users.js")));

app.listen(port, (err) => {
  if (err) {
    throw new err();
  } else {
    console.log(`Server is listening on port number ${port}`);
  }
});
