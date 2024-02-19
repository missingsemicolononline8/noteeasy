import { useContext, useEffect, useRef } from 'react';
import NotesContext from '../../context/Notes/NotesContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom'


const NotesList = () => {
    const { notes, getNotes } = useContext(NotesContext);
    const ref = useRef(null);

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('authToken'))
            getNotes();
        else
            navigate("/login")
        // eslint-disable-next-line
    }, [])


    return (
        <div ref={ref} className="container mx-auto pt-5 flex gap-3 overflow-x-clip items-start flex-grow" >
            {notes.map(note => {
                return <NoteItem note={note} key={note._id} parent={ref} />
            })}
        </div>
    )
}

export default NotesList