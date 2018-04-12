const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");

const routesGuest = require('./app/guest.js');
const routesLogin = require('./app/login.js');
const routesUsers = require('./app/users.js');
const routesAdmin = require('./app/admin.js');
const routesAdminUser = require('./app/adminuser.js');

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/css", express.static(path.resolve(__dirname, "css")));
app.use("/js", express.static(path.resolve(__dirname, "js")));

mongoose.Promise = require('bluebird');

mongoose.connect("mongodb://127.0.0.1:27017/battleship", function (err) {

  if(err) {
    process.exit(1);
  }

  app.listen(3000);

});


app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret:"secret", saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use( flash() );

require( path.resolve( __dirname, 'config', 'passport.js' ) )(passport);

app.use( routesGuest() );
app.use( routesLogin(passport) );
app.use( routesUsers() );
app.use( routesAdmin() );
app.use( routesAdminUser() );

app.use( function (req, res) {
  res.status(404);
  res.send('page not found');
});
