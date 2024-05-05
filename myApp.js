require("dotenv").config();
let express = require("express");
let app = express();
console.log("Hello World");

app.use((req, res, next) => {
  console.log(
    req.method +
      " " +
      req.path +
      " - " +
      req.ip +
      " @" +
      (req.time = new Date().toString() + " - " + req.url)
  );
  next();
});

// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

app.get("/", (req, res) => {
  res.sendFile((absolutePath = __dirname + "/views/index.html"));
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.route("/name?").get((req, res) => {
  var { first: firstname, last: lastname } = req.query;
  res.json({ name: `${firstname} ${lastname}` });
});

module.exports = app;
