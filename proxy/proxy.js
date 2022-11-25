var proxy = require("express-http-proxy");
var app = require("express")();
require("dotenv").config();

var cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/", proxy(process.env.BACKEND_URL));

const port = 5050;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
