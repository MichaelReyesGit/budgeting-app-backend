const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const transactions = require("./models/transactions");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// create a new transaction
app.post("/transactions", (req, res) => {
  const { item_name, amount, date, from, category } = req.body;
  const newTransaction = {
    id: uuidv4(),
    item_name,
    amount,
    date,
    from,
    category,
  };
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// index of all transactions
app.get("/transactions", (req, res) => {
  res.json(transactions);
});

// show a single transaction
app.get("/transactions/:id", (req, res) => {
  const transactionId = req.params.id;
  const transaction = transactions.find((t) => t.id === transactionId);
  if (!transaction) {
    res.status(404).json({ error: "Transaction not found" });
  } else {
    res.json(transaction);
  }
});

// update a single transaction
app.put("/transactions/:id", (req, res) => {
  const transactionId = req.params.id;
  const updatedTransaction = req.body;
  const transactionIndex = transactions.findIndex(
    (t) => t.id === transactionId
  );
  if (transactionIndex === -1) {
    res.status(404).json({ error: "Transaction not found" });
  } else {
    transactions[transactionIndex] = {
      id: transactionId,
      ...updatedTransaction,
    };
    res.json(transactions[transactionIndex]);
  }
});

// delete a single transaction
app.delete("/transactions/:id", (req, res) => {
  const transactionId = req.params.id;
  const transactionIndex = transactions.findIndex(
    (t) => t.id === transactionId
  );
  if (transactionIndex === -1) {
    res.status(404).json({ error: "Transaction not found" });
  } else {
    const deletedTransaction = transactions.splice(transactionIndex, 1)[0];
    res.json(deletedTransaction);
  }
});

// error handling
app.use((req, res) => {
  res.status(404).json({ error: "Sorry, no page found!" });
});

module.exports = app;
