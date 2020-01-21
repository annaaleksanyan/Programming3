var express = require("express");
var app = express();

app.get("/name/:name", function(req, res){
   var name = req.params.name;
   res.send("<h1>Hello " + name + "</h1>");
   res.redirect('http://google.com');
});
app.get('/url', function(req, res){
   var url = 'http://google.com'
   res.redirect(301, url)
 });
 app.get('*', function(req, res) {
   res.send('what???', 404);
});
app.search('/url', function(req, res){
   var url = 'google.com/search?q=search value'
   res.redirect(301, url)
});




// app.get("/name/:name", function(req, res){
//    var name = req.params.name;
//    res.send("<h1>Hello " + name + "</h1>");
//    res.redirect('http://google.com');
// });
// app.listen(3000, function(){
//    console.log("Example is running on port 3000");
// });
// app.search(function(req, res){
//    res.redirect('google.com/search?q=search value')
// })
// app.error('/*',function(req, res){ 
// }


// // // request(app)
// // if (error.response.status == 404) {
// //    res.redirect("/404")
// // }
// // return res.redirect('/404');
