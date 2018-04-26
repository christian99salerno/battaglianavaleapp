const express = require('express');
const Match = require('./models/partita.js');
const authUtils = require('./auth_utils');

const router = express.Router();

module.exports = function () {
  router.post('/searchmatch', authUtils.isLoggedIn, function (req, res) {
  Match.findOne({state: "preparazione"}).exec(function (err, partita){

    //nuova partita in attesa del secondo giocatore
    if(!partita){
      const p = new Match({id_user1:req.user._id});
      p.save(function (err, partita) {
        res.render('incerca',{
        idPartita: partita._id });
      });
    }
      
    //associazione con partita già presente
    else if(partita){
      Match.update({ _id: partita._id }, {id_user2:req.user._id}, function (err) {
        console.log('err',err);
        res.render('inpreparazione');
      });
    }
    });
  });

router.post('/annullamatch', authUtils.isLoggedIn, function (req, res) {
   console.log("idPartita da cancellare:", req.body.idPartita);
   Match.remove({_id:req.body.idPartita});
   res.render('home');
});

return router;
};

