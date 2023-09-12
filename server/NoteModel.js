const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "No Title",
  },
  content: {
    type: String,
    default: "No Content",
  },
} , { timestamps: true } );

module.exports = mongoose.model("Note", NoteSchema);
