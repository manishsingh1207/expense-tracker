const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

// Get all transactions (with optional date filter)
router.get("/", async (req, res) => {
  const { startDate, endDate } = req.query;
  let filter = {};

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const transactions = await Transaction.find(filter).sort({ date: -1 });
  res.json(transactions);
});

// Add transaction
router.post("/", async (req, res) => {
  const transaction = new Transaction(req.body);
  const saved = await transaction.save();
  res.status(201).json(saved);
});

module.exports = router;
