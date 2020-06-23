const express = require("express");
const bodyParser = require("body-parser");
const PORT = 5000;
const app = express();
const router = require("./routes/routes");

app.use(bodyParser.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server runing in port ${PORT}`);
});
