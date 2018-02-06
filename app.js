var express= require('express');
var app = express();
var faker = require('faker');
var mysql = require('mysql');
var bodyparser = require("body-parser");

// view engine ejs: Allow POSTing from home.ejs
// bodyparser allows getting data from home.ejs form
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));


// DATABASE SETUP /////////////////////////////////////////////////////////
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'joinus',
  password : 'rootpass'
});


// Query and send results to webpage //////////////////////////////////////
app.get("/", function(req, res){

  var q = 'SELECT COUNT(*) AS total FROM users ';
  console.log("Got request from "/* + req.connection.remoteAddress*/);

  // Query count of users in database
  connection.query(q, function (error, results, fields) {
    if (error) throw error;
    var mysqlResults = results[0].total;
    //res.send("Got request. Subscribers: " + mysqlResults);

    res.render("home", {data: mysqlResults, favorite_color:'purple'});
  });
  //connection.end();
})


// Receive POST from home.ejs <form>
app.post("/register", function(req, res){

  var person= {
    email: req.body.email
  };
  var q = 'INSERT INTO users SET ?';
  connection.query(q, person, function(error, result){
    if(error) throw error;
    console.log(result);
  });
});



// SERVER PORT to listen on ////////////////////////////////////////////////
app.listen(8080, function(){
  console.log("\nServer running on 8080\n");
});
