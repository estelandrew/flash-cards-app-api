const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const param = process.argv.slice(2)[0];

if (param !== "i" && param !== "d") {
  console.log("Please pass argument 'i' to import, or 'd' to delete");
  process.exit();
}

// Load dot env vars
dotenv.config({ path: "../.env" });

// Load models
const Deck = require("../models/deck.js");

//Connect to database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//Read JSON files
const decks = JSON.parse(fs.readFileSync(`${__dirname}/decks.json`, "utf-8"));

// Import into DB
const importData = async () => {
  try {
    await Deck.create(decks);
    console.log("Data imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Deck.deleteMany();
    console.log("Data destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (param === "i") {
  importData();
} else {
  deleteData();
}
