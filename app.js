const express = require("express");
const dotenv = require("dotenv").config();
const connection = require("./config/db_config");
const route = require("./routes/processRouter");
const { check, validationResult } = require("express-validator");
const flash = require("express-flash");
const session = require("express-session");
const PORT = process.env.PORT;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(flash());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", route);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
