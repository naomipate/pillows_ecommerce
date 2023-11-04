const express = require("express");
const app = express();
// const userUpload = multer({ dest: "public/images/users/" });
require("dotenv").config();
const { PORT } = process.env;
const cors = require("cors");

const pillowsRoutes = require("./routes/pillows");
const usersRoutes = require("./routes/users");

// middleware
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./db/dbConfig");

//images middleware
app.use(express.static("public"));

app.use("/pillows", pillowsRoutes);

app.use("/users", usersRoutes);

app.listen(PORT, console.log("Server running on port: " + PORT));
