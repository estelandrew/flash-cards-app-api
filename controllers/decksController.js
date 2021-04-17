const { db } = require("../models/deck");
const Deck = require("../models/deck");

// Get all decks in database
exports.getDecks = async (req, res) => {
  try {
    const decks = await Deck.find();
    res.status(200).json(decks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single decks
exports.getDeck = async (req, res) => {
  res.status(200).json(res.deck);
};

// Create a new deck
exports.createNewDeck = async (req, res) => {
  // Add user to req body
  //console.log(req.user.id);
  //req.body.user = req.user.id;

  const deck = new Deck({
    name: req.body.name,
    category: req.body.category,
    cards: req.body.cards
    //user: req.body.user
  });

  try {
    const newDeck = await deck.save();
    res.status(201).json(newDeck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing deck
exports.updateDeck = async (req, res) => {
  if (req.body.name != null) {
    res.deck.name = req.body.name;
  }
  if (req.body.category != null) {
    res.deck.category = req.body.category;
  }
  if (req.body.cards != null) {
    req.body.cards.forEach(card => {
      if (card.hasOwnProperty("_id")) {
        // check if card exists in deck, if it does edit existing card
        const index = res.deck.cards.findIndex(item => {
          return item._id.toString() === card._id.toString();
        });
        console.log(index);
        res.deck.cards[index].definition = card.definition;
        res.deck.cards[index].term = card.term;
      } else {
        // if card does not exist, push it onto array
        res.deck.cards.push(card);
      }
    });
  }
  try {
    const updatedDeck = await res.deck.save();
    res.json(updatedDeck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete deck from database
exports.deleteDeck = async (req, res) => {
  console.log("woops, shouldn't have hit this function");
  try {
    await res.deck.remove();
    res.json({ message: "Deleted deck!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete cards from deck
exports.deleteCards = async (req, res) => {
  const ids = req.body.ids;
  try {
    await Deck.updateMany({ _id: req.params.id }, { $pull: { cards: { _id: { $in: ids } } } });
    res.json({ message: "Deleted cards!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Helper method for finding single deck
exports.findDeck = async (req, res, next) => {
  let deck;
  try {
    deck = await Deck.findById(req.params.id);
    if (deck == null) {
      return res.status(404).json({ message: "Cannot find deck" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.deck = deck;
  next();
};
