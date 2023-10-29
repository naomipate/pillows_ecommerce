const express = require("express");
const router = express.Router();
const db = require("../db/dbConfig");
const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();

let userUpload = multer({
  storage,
});

router.get("/", async (req, res) => {
  try {
    const users = await db.any("SELECT * FROM users WHERE is_deleted=false");
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.one(
      "SELECT * FROM users WHERE id=$1 AND is_deleted=false",
      id
    );
    res.json(user);
  } catch (e) {
    console.log(e);
    let resObj;
    if ((e.message = "No data returned from the query.")) {
      resObj = { message: `Error: User does not exist` };
    } else {
      resObj = { message: `Error: ${e.code}, ${e.message}, ${e.query}` };
    }

    res.status(500).json(resObj);
  }
});

// CREATE
router.post("/", userUpload.single("profile_img"), async (req, res) => {
  const { username, email, is_deleted, profile_img } = req.body;

  const partialImgPath = `/images/users/${
    Date.now() + "_" + req.file.originalname
  }`;
  const path = "./public" + partialImgPath;

  await sharp(req.file.buffer).resize(300, 300).toFile(path);

  try {
    const newUser = await db.any(
      "INSERT INTO users (username, email, is_deleted, profile_img) VALUES ($1,$2,$3)",
      [username, email, false, partialImgPath]
    );
    res.json(newUser);
  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = db.one(
      "UPDATE users SET username=$1, email=$2, is_deleted=$3, profile_img=$4 WHERE id=$5 RETURNING *",
      [username, email, false, profile_img]
    );
    res.json(updatedUser);
  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    db.none("UPDATE users SET is_deleted=true WHERE id=$1", id);
    res.json("Successfully deleted user!");
  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
  }
});

module.exports = router;
