const express = require("express");
const url = require('url');
var httpServer = require('http');
const ioServer = require('socket.io');
const RTCMultiConnectionServer = require('rtcmulticonnection-server');
const fs = require('fs');
const path = require("path");
const router = express.Router();

const auth = require("../../middlewares/auth.js");

module.exports.controller = function(app) {
  app.get("/voice", auth.checkLogin, function(req, res) {

    res.render("voice", {
      title: "Voice Conference",
      user: req.session.user,
      chat: req.session.chat
    });
  });

  app.use(router);
};