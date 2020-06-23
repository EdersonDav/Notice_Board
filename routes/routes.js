const express = require("express");
const router = express.Router();

function generateId() {
  return Math.random().toString(36).replace(".", "");
}

const notices = [
  {
    id: generateId(),
    title: "First Notice test",
    description: "First description test",
  },
  {
    id: generateId(),
    title: "Second Notice test",
    description: "Second description test",
  },
];

//List all notices
router.get("/all", (req, res) => {
  res.json(notices);
});

router.post("/new", (req, res) => {
  let id = generateId();
  let title = req.body.title;
  let description = req.body.description;

  notices.push({
    id,
    title,
    description,
  });

  res.send("Notices create sucess");
});

module.exports = router;
