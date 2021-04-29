const express = require("express");
const wikiRouter = express.Router();
module.exports = wikiRouter;
const { Page } = require("../models");
const { addPage } = require("../views");

wikiRouter.get("/", (req, res, next) => {
  res.send("this is the wiki page!");
});

wikiRouter.get("/add", (req, res) => {
  res.send(addPage());
});

wikiRouter.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});
