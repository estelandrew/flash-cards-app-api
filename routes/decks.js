const express = require("express");
const router = express.Router();

const { getDecks, getDeck, createNewDeck, updateDeck, updateCard, deleteDeck, findDeck, deleteCards } = require("../controllers/decksController");

// Get all decks
router.get("/", getDecks);

// Get single deck
router.get("/:id", findDeck, getDeck);

// Get single card
router.get("/:id/cards/:cardId", findDeck, getDeck);

// Create new deck
router.post("/", createNewDeck);

// Update single deck
router.patch("/:id", findDeck, updateDeck);

// Update single card in deck
//router.patch("/:id/cards/:cardId", findDeck, updateCard);

// Delete single deck
router.delete("/:id", findDeck, deleteDeck);

// Delete cards from deck
router.delete("/:id/cards", deleteCards);

// Delete single card from deck

module.exports = router;
