require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to database"));

// use express.json() middleware -- lets server accept json inside of request
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// set up routes
const decksRouter = require("./routes/decks");
app.use("/api/v1/decks", decksRouter);

app.listen(3000, () => console.log("Server started!"));
