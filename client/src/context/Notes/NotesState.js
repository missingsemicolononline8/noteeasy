import { useContext, useState, useRef, useEffect } from "react";
import NotesContext from "./NotesContext";
import AlertContext from "../Alert/AlertContext";
import { v4 as uuid } from 'uuid';

const NotesState = (props) => {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toModify, setToModify] = useState(null);
  const editModal = useRef(null);
  const modalCallbackRef = useRef(() => {});
  const setAlerts = useContext(AlertContext);

  useEffect(() => {
    getNotes().then(d => setLoading(false));
}, [])

  // Fetch Notes
  const getNotes = async () => {
    const response = await fetch(`${API_HOST}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('authToken'),
        "Content-Type": "application/json"
      }
    });

    if(!(response.ok)) {
       return
    }

    return setNotes(await response.json());
  }

  // Add a note
  const addNote = (title, description, tag) => {

    const initialNotes = notes;
    const lId = uuid()
    const tempNewNote = {
      title, description, tag, pinned: false, _id: null, lId, pending: true
    }

    setNotes((prevNotes) => prevNotes.concat(tempNewNote))

    fetch(`${API_HOST}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem('authToken'),
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        "title": title,
        "description": description,
        "tag": tag
      }),
    }).then(r => {

      if (r.ok) {
        r.json().then(data => {
          setNotes(initialNotes.concat({ ...data, lId }));
          setAlerts({ type: "success", message: "Note Added" })
        })
      }

      else {
        setNotes(initialNotes);
        r.json().then(data => {
          setAlerts({ type: "error", message: data.message })
        })
      }

    }).catch(e => {
      setNotes(initialNotes);
      setAlerts({ type: "error", message: "Something went wrong. Please try again" })
    })

  }

  // Delete a note
  const deleteNote = (id) => {

    const initialNotes = notes;
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })

    setNotes(newNotes);

    fetch(`${API_HOST}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem('authToken'),
        "Content-Type": "application/json"
      },
    }).then(r => {

      if (r.ok)
        setAlerts({ type: "success", message: "Note Deleted" })

      else {
        setNotes(initialNotes)
        r.json().then(data => {
          setAlerts({ type: "error", message: data.message })
        })
      }
    }).catch(e => {
      setNotes(initialNotes);
      setAlerts({ type: "error", message: "Something went wrong. Please try again" })
    })

  }

  // Update a note

  const updateNote = (id, titleInput, descriptionInput, tagInput) => {

    const initialNotes = notes;

    setNotes(prevNotes => prevNotes.map(note => {
      return note._id === id ? { 
        ...note, 
        title : titleInput.value, 
        description: descriptionInput.value, 
        tag: tagInput.value 
      } : note
    }));


    fetch(`${API_HOST}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem('authToken'),
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        "title": titleInput.value,
        "description": descriptionInput.value,
        "tag": tagInput.value
      }),
    }).then(r => {

      if (r.ok)
        setAlerts({ type: "success", message: "Note Updated" })

      else {
        setNotes(initialNotes)
        r.json().then(data => {
          setAlerts({ type: "error", message: data.message })
        })
      }

    })
      .catch(e => {
        setNotes(initialNotes);
        setAlerts({ type: "error", message: "Something went wrong. Please try again." })
      });

  }

  const duplicateNote = (noteId) => {
    const initialNotes = notes;
    const noteToDuplicate = notes.filter(note => note._id === noteId);
    const lId = uuid();
    const tempNewNote = {
      title: noteToDuplicate[0].title,
      description: noteToDuplicate[0].description,
      tag: noteToDuplicate[0].description,
      pinned: false,
      _id: null,
      lId,
      pending: true
    }

    setNotes((prevNotes) => prevNotes.concat(tempNewNote))

    fetch(`${API_HOST}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem('authToken'),
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        "title": noteToDuplicate[0].title,
        "description": noteToDuplicate[0].description,
        "tag": noteToDuplicate[0].tag
      }),
    }).then(r => {

      if (r.ok) {
        r.json().then(data => {
          setNotes(initialNotes.concat({ ...data, lId }));
          setAlerts({ type: "success", message: "Note Added" })
        })
      }

      else {
        setNotes(initialNotes);
        r.json().then(data => {
          setAlerts({ type: "error", message: data.message })
        })
      }

    }).catch(e => {
      setNotes(initialNotes);
      setAlerts({ type: "error", message: "Something went wrong. Please try again" })
    })
  }

  // Toggle Note Pinned

  const toggleNotePinned = async (noteId, pinned, revert) => {

    setNotes(prevNotes => (
      prevNotes.map(note => note._id === noteId ? { ...note, pinned } : note)
    ))

    fetch(`${API_HOST}/api/notes/togglepin/${noteId}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem('authToken'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isPinned: pinned
      }),

    }).then(r => {
      if (!(r.ok)) {
        revert()
      }
    }).catch(e => {
      revert()
    })
  }

  return <NotesContext.Provider value={{ notes, toModify, editModal, loading, modalCallbackRef, getNotes, addNote, deleteNote, updateNote, setToModify, duplicateNote, toggleNotePinned }}>
    {props.children}
  </NotesContext.Provider>
}

export default NotesState;