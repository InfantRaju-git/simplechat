const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth.js");

module.exports.controller = function(app) {
  app.get("/terminal", auth.checkLogin, function(req, res) {
    res.render("terminal", {
      title: "CStack Terminal",
      user: req.session.user,
      chat: req.session.chat
    });
  });

  app.use(router);
};