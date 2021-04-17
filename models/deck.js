const mongoose = require("mongoose");

const deckSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["History", "Arts and Lit", "Geography", "Entertainment", "Science and Nature", "Sports and Leisure"],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cards: [
    {
      term: {
        type: String,
        required: true
      },
      definition: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("Deck", deckSchema);
