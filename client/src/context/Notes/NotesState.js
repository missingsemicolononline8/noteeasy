import { useCallback, useContext, useState} from "react";
import NotesContext from "./NotesContext";
import AlertContext from "../Alert/AlertContext";



const NotesState = (props) => {
  const HOST = process.env.REACT_APP_API_HOST;
  const initState = [];
  const [notes, setNotes] = useState(initState);
  const [toUpdate, setToUpdate] = useState(null);
  const setAlerts = useContext(AlertContext);

  // Fetch Notes
  const getNotes = async () => {
    const response = await fetch(`${HOST}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('authToken'),
        "Content-Type": "application/json"
      }
    }); 

    setNotes(await response.json());
  }

  // Add a note
  const addNote = useCallback(async (title, description, tag ) => {
    console.log("Adding a new note");
    // TODO : API CALL
    const response = await fetch(`${HOST}/api/notes/addnote`, {
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
    });
    const note = await response.json();
    
    if(response.status === 400) {
        setAlerts({type:"error",message:"Error occured"})
        console.log(note);
        return;
    }  
    setNotes((prevNotes) => prevNotes.concat(note) )
    setAlerts({type:"success",message:"Note Added"})
  } ,[])

  // Delete a note
  const deleteNote = async (id) => {
    // API Call
    
    const response = await fetch(`${HOST}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem('authToken'),
        "Content-Type": "application/json"

      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes);
    setAlerts({type:"error",message:"Note Deleted"})
  }

  // Update a note

  const updateNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${HOST}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem('authToken'),
        "Content-Type": "application/json"

      },

      body: JSON.stringify({
        "title": title,
        "description": description,
        "tag": tag
      }),
    });

    const json = await response.json();

    // Logic to edit in client
    const newNotes = notes.map(note => {
      return note._id === id ? {...note,title,description,tag} : note  
    });

    setNotes(newNotes);
    setToUpdate(null);
    setAlerts({type:"success",message:"Note Updated"})

  }

  // Toggle Note Pinned

  const toggleNotePin = async (noteId,pinned,cb) => {
    const response = await fetch(`${HOST}/api/notes/togglepin/${noteId}`, {
      method: "PUT",
      headers: {
          "auth-token": localStorage.getItem('authToken'),
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          isPinned: !pinned
      }),

  })
  if (response.status !== 200) {
      return
  }
  cb((prev) => !prev)

  }

  return <NotesContext.Provider value={{ notes, toUpdate,addNote, deleteNote, updateNote, getNotes, setToUpdate, toggleNotePin }}>
    {props.children}
  </NotesContext.Provider>
}

export default NotesState;