import React, { useContext, useEffect, useState, useRef } from 'react';
import NotesContext from '../context/Notes/NotesContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import Updatenote from './Updatenote';
import {useNavigate} from 'react-router-dom'




const Notes = () => {
    const { notes, getNotes } = useContext(NotesContext);
    const [currentNote,setCurrentNote] = useState({title:"",description:"",tag:""});
    const openEditModel = useRef(null);
    let navigate  = useNavigate();

    
    const openEditNoteModal =(note)=> {
        setCurrentNote(note);
        openEditModel.current.click();
    }

    const onChange = (e) => {
        setCurrentNote({...currentNote,[e.target.name]:e.target.value})
    }

    useEffect(() => {
        if(localStorage.getItem('authToken'))
        getNotes();
        else
        navigate("/login")
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Addnote />
            <Updatenote openEditModelRef={openEditModel} note={currentNote} onChange={onChange}/>
            <div className="container row">
                <h1>Your Notes</h1>
                {notes.length === 0 && <div className='container'>No notes to display</div>}
                {notes.map((note, idx) => {
                    return <NoteItem note={note} openEditNoteModal={() => openEditNoteModal(note)} key={note._id} />
                })}
            </div>
        </>
    )
}

export default Notes
