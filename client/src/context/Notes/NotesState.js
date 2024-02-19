import { useContext, useState} from "react";
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
  const addNote = async (title, description, tag ) => {
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
    setNotes(notes.concat(note))
    setAlerts({type:"success",message:"Note Added"})
  }

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
    let newNotes = [...notes];
    for (let index = 0; index < newNotes.length; index++) {
      const note = newNotes[index];
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag
      }

    }

    setNotes(newNotes);
    setAlerts({type:"success",message:"Note Updated"})

  }

  return <NotesContext.Provider value={{ notes, toUpdate,addNote, deleteNote, updateNote, getNotes, setToUpdate }}>
    {props.children}
  </NotesContext.Provider>
}

export default NotesState;