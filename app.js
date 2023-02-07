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

// Categories API Routes
app.use("/api/categories", require("./routes/api/categories"));

// Product image API Routes
app.use("/api/productImages", require("./routes/api/productImage"));

// GLTF file API Routes
app.use("/api/gltf", require("./routes/api/gltf"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${process.env.PORT}`));

