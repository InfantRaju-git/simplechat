const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth.js");

module.exports.controller = function(app) {
  app.get("/main", auth.checkLogin, function(req, res) {
    res.render("main", {
      title: "CStack",
      user: req.session.user,
      chat: req.session.chat
    });
  });

  app.use(router);
};