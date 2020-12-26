const express = require("express");
const request = require('request');
const router = express.Router();

const auth = require("../../middlewares/auth.js");

module.exports.controller = function(app) {

  app.get("/news", auth.checkLogin, function(req, res) {

  request("https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=26060a3db05e48baa1f9e1697e79d9ea", function(err, response,body){
    if(err){console.log(err);}
    if(! err && response.statusCode == 200) {
          var mydata = JSON.parse(body);
          res.render("news", {
            title:"News",
            mydata: mydata,
            user: req.session.user,
            chat: req.session.chat
          });
      }
  });



  });

  app.use(router);
}; 
