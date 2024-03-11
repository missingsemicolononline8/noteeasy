import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import NotesContext from '../../context/Notes/NotesContext';
import NoteItem from './NoteItem';
import { AnimatePresence } from 'framer-motion';


const NotesList = () => {
    const { notes, getNotes } = useContext(NotesContext);
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);

    const pinnedNotes = useMemo(() => (
        notes.filter(note => note.pinned)
    ), [notes])

    const rest = useMemo(() => (
        notes.filter(note => !(note.pinned))
    ), [notes])

    useEffect(() => {
        getNotes().then(d => setLoading(false));
    }, [])

    const generateLoadingArray = (length) => Array.from({ length }, (_, index) => index);

    console.log('Notelist rendered')

    return (
        <div ref={ref} className='flex-grow'>
            <div className="container mx-auto px-5 pt-5 flex flex-wrap items-start content-baseline" >
                {loading && generateLoadingArray(18).map(g => <NoteItem key={g} loading />)}
                <AnimatePresence>
                    {pinnedNotes.map(note => <NoteItem note={note} key={note._id} parent={ref} />)}
                </AnimatePresence>
            </div>

            <div className="container mx-auto px-5 pt-5 flex flex-wrap items-start content-baseline flex-grow" >
                <AnimatePresence>
                    {rest.map(note => <NoteItem note={note} key={note._id} parent={ref} />)}
                </AnimatePresence>
            </div>

        </div>
    )
}

export default NotesList