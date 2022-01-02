var express = require("express");
var app = express();

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.status(200).render("index.hbs", { title: "Webアプリケーション開発" });
});

app.listen(3000);