const express = require("express");
const router = express.Router();

const reviewsRoutes = require("./reviews");
// REVIEWS
router.use("/:pillow_id/reviews", reviewsRoutes);

const db = require("../db/dbConfig");
const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();

let pillowUpload = multer({
  storage,
});

// PILLOWS
router.get("/", async (req, res) => {
  try {
    const pillows = await db.any(
      "SELECT * FROM pillows WHERE is_deleted=false"
    );
    res.json(pillows);
  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
  }
});

// PILLOW RETRIEVAL
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pillow = await db.one(
      "SELECT * FROM pillows WHERE id=$1 AND is_deleted=false",
      id
    );
    res.json(pillow);
  } catch (e) {
    let resObj;
    if ((e.message = "No data returned from the query.")) {
      resObj = { message: "Error: Pillow does not exist" };
    } else {
      resObj = { message: `Error: ${e}` };
    }
    res.status(500).json(resObj);
  }
});

// CREATE
router.post("/", pillowUpload.single("img_url"), async (req, res) => {
  const { brand_name, display_name, has_text, color } = req.body;
  const partialImgPath = `/images/pillows/${
    Date.now() + "_" + req.file.originalname
  }`;
  const path = "./public" + partialImgPath;

  await sharp(req.file.buffer).resize(300, 300).toFile(path);
  try {
    const newPillow = await db.any(
      "INSERT INTO pillows (brand_name, display_name, is_deleted, has_text, color, img_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [brand_name, display_name, false, has_text, color, partialImgPath]
    );
    res.json(newPillow);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: `Error: ${e}` });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { brand_name, display_name, has_text, color, img_url } = req.body;
  try {
    const updatedPillow = await db.one(
      "UPDATE pillows SET brand_name=$1, display_name=$2, has_text=$3, color=$4, img_url=$5 WHERE id=$6 RETURNING *",
      [brand_name, display_name, has_text, color, img_url, id]
    );
    res.json(updatedPillow);
  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.none("UPDATE pillows SET is_deleted=true WHERE id=$1", id);
    res.json("Successfully deleted pillow!");
  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
  }
});

module.exports = router;
