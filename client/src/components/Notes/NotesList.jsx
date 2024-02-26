import { useContext, useEffect, useRef, useState, useMemo } from 'react';
import NotesContext from '../../context/Notes/NotesContext';
import NoteItem from './NoteItem';



const NotesList = () => {
    const { notes, getNotes } = useContext(NotesContext);
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);

    useEffect(() => {
        getNotes().then(d => setLoading(false));
    }, [])

    const generateLoadingArray = (length) => Array.from({ length }, (_, index) => index);

    const renderedNotes = useMemo(() => (
        loading ? generateLoadingArray(15).map(g => <NoteItem key={g} loading />) :
            notes.map(note => <NoteItem note={note} key={note._id} parent={ref} />)
    ), [loading, notes]);

    return (
        <div ref={ref} className="container mx-auto px-4 pt-5 gap-3 flex flex-wrap justify-between items-start content-baseline flex-grow" >
            {renderedNotes}
        </div>
    )
}

export default NotesList