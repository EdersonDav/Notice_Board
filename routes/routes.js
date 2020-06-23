const express = require("express");
const router = express.Router();

const notices = [
  {
    id: Math.random() * 10,
    Title: "First Notice test",
    description: "First Description test",
  },
  {
    id: Math.random() * 10,
    Title: "Second Notice test",
    description: "Second Description test",
  },
];

//List all notices
router.get("/all", (req, res) => {
  res.json(JSON.stringify(notices));
});

router.post("/new", (req, res) => {});

module.exports = router;
