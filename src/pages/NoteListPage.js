import React, { useEffect, useState } from "react";
import { AddButton, ListItem } from "../components";

const NoteListPage = () => {
  const [notes, setNotes] = useState([]);


  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    try {
      let response = await fetch(`/api/notes/`);
      let data = await response.json();
      console.log(data);
      setNotes(data);
    } catch (err) {
      console(err.message);
    }
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">
          &#9782; Notes
        </h2>
        <p className="notes-content">{notes.length}</p>
      </div>
      <div className="notes-list">
          {
              notes.map((note,index) => (
                  <ListItem key={index} note={note} />
              ))
          }
      </div>
      <AddButton />
    </div>
  );
};

export default NoteListPage;
