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

    console.log('Notes List Component')

    return (
        <div ref={ref} className="container mx-auto px-4 pt-5 flex gap-3 flex-wrap items-start flex-grow" >
            {notes.map(note => {
                return <NoteItem note={note} key={note._id} parent={ref} />
            })}
        </div>
    )
}

export default NotesList