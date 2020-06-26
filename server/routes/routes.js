const express = require("express");
const router = express.Router();
const model = require("../model/notieces");
const cors = require("cors");

//Options to cors in my domain
const options = {
  origin: "http://192.168.15.5:5000",
};

router.use(cors(options));

//List all notices
router.get("/all", (req, res) => {
  res.json(model.getNotices());
});

//Create notice
router.post("/new", (req, res) => {
  model.createNotices(req.body.title, req.body.description);
  res.send("Notice successfully created");
});

//Delete notice
router.delete("/delete", (req, res) => {
  model.deleteNotice(req.body.id);
  res.send("Notice successfully deleted");
});

//Update notice
router.put("/update", (req, res) => {
  model.updateNotice(req.body.id, req.body.title, req.body.description);
  res.send("Notice successfully update");
});

module.exports = router;
