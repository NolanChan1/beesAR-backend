const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("./middleware/logger");
const connectDB = require("./config/db")

const app = express();

dotenv.config();

// Set connection to db
connectDB.connectToServer();

// Init middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Product API Routes
app.use("/api/products", require("./routes/api/products"));

// Catagories API Routes
app.use("/api/catagories", require("./routes/api/catagories"))

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${process.env.PORT}`));