const express = require("express");
const ticketPath = require("./routes/tickets");
const connectDB = require("./config/db");
const authPath = require("./routes/auth");
const favPath = require("./routes/favourites");
const cartPath = require("./routes/carts");
const userPath = require("./routes/user");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

app.use("/api/tickets", ticketPath);
app.use("/api/auth", authPath);
app.use("/api/fav", favPath);
app.use("/api/cart", cartPath);
app.use("/api/user", userPath);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${port}`
  )
);
