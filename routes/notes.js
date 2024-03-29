const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/utils");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "Response is a success!",
      body: newNote,
    };

    res.json(response);
  }
});

module.exports = notes;