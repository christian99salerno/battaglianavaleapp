const express = require('express');
const User = require('./models/user.js');

const router = express.Router();

const authUtils = require('./auth_utils');

module.exports = function () {

  router.post("/dropuser", authUtils.isAdmin, function(req, res) {
    User.remove( {_id:req.body.id } ).exec( function (err) {
    res.redirect("/gestisciutenti");
    });
  });
  
  return router;
};
