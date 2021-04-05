const express = require("express");
require("dotenv").config();
const router = require("./src/routers/");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Your server is running on port ${port}`));
