import { useContext, useState} from "react";
import NotesContext from "./NotesContext";
import AlertContext from "../Alert/AlertContext";
import { v4 as uuid } from 'uuid';

const NotesState = (props) => {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const [notes, setNotes] = useState([]);
  const [toUpdate, setToUpdate] = useState(null);
  const setAlerts = useContext(AlertContext);

  // Fetch Notes
const getNotes = async () => {
    const response = await fetch(`${API_HOST}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('authToken'),
        "Content-Type": "application/json"
      }
    }); 

    return setNotes(await response.json());
}

  // Add a note
const addNote = async (title, description, tag ) => {
    
    const previousNotes = notes;
    const  tempNewNote = {
      title,description,tag,pinned:false,_id: uuid(),pending:true
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

      if(r.ok) {
        r.json().then(data => {
            setNotes(previousNotes.concat(data));
            setAlerts({type:"success",message:"Note Added"})          
        })
      }

      else {
           setNotes(previousNotes);
           r.json().then(data => {
              setAlerts({type:"error",message:data.message})
           })
      }

    }).catch(e => {
           setNotes(previousNotes);
           setAlerts({type:"error",message:"Something went wrong. Please try again"})
    })
    
}

  // Delete a note
const deleteNote = async (id) => {

  const prevNotes = notes;
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

      if(r.ok)  
      setAlerts({type:"success",message:"Note Deleted"})

      else {
        setNotes(prevNotes)
        r.json().then(data => {
           setAlerts({type:"error",message:data.message})
        })
      }
    }).catch(e => {
        setNotes(prevNotes);
        setAlerts({type:"error",message:"Something went wrong. Please try again"})
    }) 
    
}

  // Update a note

const updateNote = async (id, title, description, tag) => {
    
    const prevNotes = notes;

    const newNotes = notes.map(note => {
      return note._id === id ? {...note,title,description,tag} : note  
    });

    setNotes(newNotes);
    setToUpdate(null);

    fetch(`${API_HOST}/api/notes/updatenote/${id}`, {
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
    }).then(r => { 
          
          if(r.ok)  
          setAlerts({type:"success",message:"Note Updated"})

          else {
            setNotes(prevNotes)
            r.json().then(data => {
               setAlerts({type:"error",message:data.message})
            })
          }

        })
      .catch(e => {
        setNotes(prevNotes);
        setAlerts({type:"error",message:"Something went wrong. Please try again."})
    });
  
  }

  // Toggle Note Pinned

  const toggleNotePin = async (noteId,pinned,revert) => {

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
     if(!(r.ok)) {
        revert()
     }
  }).catch(e => {
    revert()
  })
  }

  return <NotesContext.Provider value={{ notes, toUpdate,addNote, deleteNote, updateNote, getNotes, setToUpdate, toggleNotePin }}>
    {props.children}
  </NotesContext.Provider>
}

export default NotesState;