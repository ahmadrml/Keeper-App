import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const nts = await axios.get("/api");
      console.log(nts.data);
      setNotes(nts.data);
    };
    getNotes();
  }, []);

  const addNote = async (newNote) => {
    await axios.post("/api/create", {
      title: newNote.title,
      content: newNote.content,
    });
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  };

  const deleteNote = async (id) => {
    console.log(id);
    axios.delete("/api/delete", { data: { noteId: id } });
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="notes-container">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
