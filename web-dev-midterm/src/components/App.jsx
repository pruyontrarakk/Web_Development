import React from "react";
import Header from "./header";
import Footer from "./footer";
import Note from "./note";
import { notes as initialNotes } from "../notes";

function App() {
  // contains all of the notes
  const [allNotes, setAllNotes] = React.useState(initialNotes);
  // gets the new note being written
  const [newNote, setNewNote] = React.useState({ title: "", content: "" });
  // setting the new keys starting from highest key + 1
  const [newKey, setNewKey] = React.useState(
    Math.max(...initialNotes.map((note) => note.key), 0) + 1
  );

  // change the new note by reading it in + accounting for previous notes
  function handleChange(event) {
    const newTitle = event.target.name;
    const newContent = event.target.value;

    setNewNote((prevNote) => {
      return {
        ...prevNote,
        [newTitle]: newContent,
      };
    });
  }

  // add a note with the submit button
  function addNote(event) {
    event.preventDefault();

    // prevent empty notes
    if (!newNote.title || !newNote.content) {
      alert("Please add a title and content");
      return;
    }

    setAllNotes((prevNotes) => {
      return [...prevNotes, { ...newNote, key: newKey }];
    });

    // reset new note for next time
    setNewNote({ title: "", content: "" });

    // increment the key for the next new note
    setNewKey(newKey + 1);
  }

  // delete a note with delete button
  function deleteNote(id) {
    setAllNotes((prevNotes) => {
      return prevNotes.filter((note) => note.key !== id);
    });
  }

  return (
    <div>
      <Header />
      <form className="form" onSubmit={addNote}>
        <div>
          <input
            className="input"
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={newNote.title}
            onChange={handleChange}
          />
          <textarea
            className="textarea"
            type="text"
            id="content"
            name="content"
            placeholder="Content"
            value={newNote.content}
            onChange={handleChange}
            rows="3"
          />
          <button className="form" type="submit">
            Add
          </button>
        </div>
      </form>
      {allNotes.map((note) => (
        <Note
          id={note.key}
          key={note.key} //used to compare to id for delete
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
