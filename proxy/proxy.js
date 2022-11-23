var proxy = require("express-http-proxy");
var app = require("express")();

var cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/", proxy("http://3.235.214.44:8000/"));

const port = 5050;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
