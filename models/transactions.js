const { v4: uuidv4 } = require("uuid");

const transactions = [
  {
    id: uuidv4(),
    item_name: "Income",
    amount: 1000,
    date: "2023-07-01",
    from: "Employer",
    category: "Income",
  },
  {
    id: uuidv4(),
    item_name: "Groceries",
    amount: 50,
    date: "2023-07-02",
    from: "Grocery Store",
    category: "Food",
  },
  {
    id: uuidv4(),
    item_name: "Savings",
    amount: 200,
    date: "2023-07-03",
    from: "Bank",
    category: "Savings",
  },
];

module.exports = transactions;
