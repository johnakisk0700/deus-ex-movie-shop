var proxy = require("express-http-proxy");
var app = require("express")();
require("dotenv").config();

var cors = require("cors");
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/", proxy(process.env.BACKEND_URL));

const port = 5050;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
