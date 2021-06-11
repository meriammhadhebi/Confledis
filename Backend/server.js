require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const router = require("./routes/product.route");
const http = require('http');


const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);

app.use("/product", router);
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
app.use(express.json());
app.listen(process.env.PORT || 4000, () => console.log("Server Started !"));

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database !"));