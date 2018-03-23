const express = require("express");
const path = require("path");

const app = express();

app.use("/css", express.static(path.resolve(__dirname, "css")));
app.use("/js", express.static(path.resolve(__dirname, "js")));

app.get("/", function (req, res) {
res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.use(function (req, res){
res.end("Page Not Found");
});

app.listen(3000);
