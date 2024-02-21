import { useContext, useEffect, useRef } from 'react';
import NotesContext from '../../context/Notes/NotesContext';
import NoteItem from './NoteItem';

const NotesList = () => {
    const { notes, getNotes } = useContext(NotesContext);
    const ref = useRef(null);

    useEffect(() => {
        if (localStorage.getItem('authToken'))
            getNotes();
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