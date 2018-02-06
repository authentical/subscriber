var express= require('express');
var app = express();
var faker = require('faker');
var mysql = require('mysql');

// DATABASE SETUP /////////////////////////////////////////////////////////
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'joinus',
  password : 'rootpass'
});


app.get("/", function(req, res){

  var q = 'SELECT COUNT(*) AS total FROM users ';
  console.log("Got request from "/* + req.connection.remoteAddress*/);

  // Query count of users in database
  connection.query(q, function (error, results, fields) {
    if (error) throw error;
    var mysqlResults = results[0].total;
    res.send("Got request. Subscribers: " + mysqlResults);
  });
  //connection.end();
})

app.get("/joke", function(req, res){
  console.log("Got request");
  res.send("Got request. What do you a sausage with no hands?");
})

app.get("/nums", function(req, res){
  console.log("Got request");
  var num = Math.floor((Math.random() * 10) +1);
  res.send("Got request. Your number for today: " + num);
})


app.listen(8080, function(){
  console.log("\nServer running on 8080\n");
});
