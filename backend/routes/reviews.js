const express = require("express");
const db = require("../db/dbConfig");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { pillow_id } = req.params;
  try {
    const pillowReview = await db.any(
      "SELECT * FROM reviews WHERE pillow_id=$1",
      pillow_id
    );
    res.json(pillowReview);
  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
  }
});

router.post("/", async (req, res) => {
  const { pillow_id } = req.params;
  const { user_id, content, rating } = req.body;
  try {
    const newReview = await db.one(
      "INSERT INTO reviews (pillow_id, user_id, content, rating) VALUES($1,$2,$3,$4) RETURNING *",
      [pillow_id, user_id, content, rating]
    );
    res.json(newReview);
  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
  }
});

// // Additive edit
// router.put("/", async (req, res) => {
//     const {id} = req.params;
//     const {}
// })

module.exports = router;
