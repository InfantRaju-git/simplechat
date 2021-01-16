const express = require("express");
const router = express.Router();
const Note=require('../models/notes.js')
const auth = require("../../middlewares/auth.js");

module.exports.controller = function(app) {

  app.get("/note", auth.checkLogin, async(req, res)=> {
    const notes = await Note.find().sort('-createdAt');
    res.render("note", {
      title: "NotePad",
      user: req.session.user,
      notes: notes
    });
  });

  app.post('/note', auth.checkLogin,async (req, res) =>{
    let note = await new Note({
      title: req.body.title,
      description: req.body.description,
    });
    try {
      note = await note.save();
      res.redirect('/note');
    } catch (e) {
      console.log(e);
      res.render('newnote');
    }
  });
  
  app.get("/newnote", auth.checkLogin, function(req, res) {
    res.render("newnote", {
      title: "NotePad",
      user: req.session.user,
      chat: req.session.chat
    });
  });

  app.post("/note/:id", async (req, res) => {
    try {
      await Note.findByIdAndRemove(req.params.id);
      res.redirect('/note');
    } catch (e) {
      console.log(e);
      res.redirect('/note');
    }
  });

  app.use(router);
};