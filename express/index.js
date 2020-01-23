var express = require("express"); 
var app = express(); 

app.get("/", function (req, res) { 
var urlGoogle = 'https://www.google.com/' 
res.redirect(urlGoogle) 
});
app.get("/:", function (req, res) {
var urlSearch = 'https://google.com/search?q=search value' 
res.redirect(urlSearch) 
});
app.get("/*", function (req, res) { 
res.send("<h1>404 Error");
});
app.listen(3000, function () {
console.log("Example is running on port 3000");
});
