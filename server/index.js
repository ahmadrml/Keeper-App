import express from 'express';
import mongoose from 'mongoose';
import Note from './NoteModel';
import morgan from 'morgan';

const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded());

mongoose.connect("mongodb+srv://AhmadRammal:ahmadMongoDB123@cluster0.q9aqjqd.mongodb.net/keeperAppDB");

app.get("/api", async (req, res) => {
  try {
    const notes = await Note.find({});
    console.log(notes);
    res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.post("/api/create", async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
    });
    await newNote.save();
    res.status(200).json("Note Added");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.delete("/api/delete", async (req, res) => {
  try {
    console.log(req.body.noteId);
    await Note.findByIdAndDelete(req.body.noteId);
    res.status(200).json("Note Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.listen(8080, () => {
  console.log("Listening on 8080");
});
