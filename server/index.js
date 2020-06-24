const express = require("express");
const bodyParser = require("body-parser");
const PORT = 5000;
const app = express();
const router = require("./routes/routes");
const path = require("path");

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server runing in port ${PORT}`);
});
