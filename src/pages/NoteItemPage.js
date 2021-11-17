import React, { useState, useEffect, useCallback } from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NoteItemPage = ({ match:{params:{id:noteId}}, history }) => {
  const [note, setNote] = useState({});

  const getNote =  useCallback(async () => {
    if (noteId === "new") return;
    await fetch(`/api/notes/${noteId}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        console.log(data);
        setNote(data);
      })
      .catch((error) => {
        console.log(error)
      });
  },[noteId])

  useEffect(() => {
    getNote();
  }, [getNote]);

  

  let updateNote = async () => {
    await fetch(`/api/notes/${noteId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          history.push("/");
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => console.log(error));
  };

  let deleteNote = async () => {
    await fetch(`/api/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          history.push("/");
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => console.log(error));
  };

  let createNote = async () => {
    await fetch("/api/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          history.push("/");
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => console.log(error));
  };

  let handleSubmit = () => {
    if (noteId !== "new" && note.body === "") {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note.body !== null) {
      createNote();
    }
  };

  const handleChange = (e) => {
    setNote((note) => ({ ...note, body: e.target.value }));
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea value={note?.body} onChange={handleChange}></textarea>
    </div>
  );
};

export default NoteItemPage;
