const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

console.log("Expense Tracker API started - CI/CD v1.0.1");

app.use("/api", require("./routes/transactions"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
