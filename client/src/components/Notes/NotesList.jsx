import { useContext, useMemo, useRef } from 'react';
import NotesContext from '../../context/Notes/NotesContext';
import NoteItem from './NoteItem';
import { AnimatePresence, motion } from 'framer-motion';


const NotesList = () => {
    const { notes, loading } = useContext(NotesContext);
    const ref = useRef(null);

    const pinnedNotes = useMemo(() => (
        notes.filter(note => note.pinned)
    ), [notes])

    const rest = useMemo(() => (
        notes.filter(note => !(note.pinned))
    ), [notes])



    const generateLoadingArray = (length) => Array.from({ length }, (_, index) => index);

    console.log('Notelist rendered')

    return (
        <div ref={ref} className='flex-grow overflow-x-hidden'>
            {loading && <div className="container mx-auto px-5 pt-5 flex flex-wrap items-start content-baseline flex-grow" >
                {generateLoadingArray(15).map(g => <NoteItem key={g} loading />)}
            </div>}

            {pinnedNotes.length > 0 && <motion.div className='container mx-auto px-5 mb-10'>
                <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} >PINNED</motion.h4>
                <div className="pt-5 flex flex-wrap items-start content-baseline flex-grow" >
                    <AnimatePresence>
                        {pinnedNotes.map(note => <NoteItem note={note} key={note._id} parent={ref} />)}
                    </AnimatePresence>
                </div>
            </motion.div>}

            {rest.length > 0 && <motion.div className='container mx-auto px-5 '>
                {pinnedNotes.length > 0 && <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>OTHERS</motion.h4>}
                <div className="pt-5 flex flex-wrap items-start content-baseline flex-grow" >
                    <AnimatePresence>
                        {rest.map(note => <NoteItem note={note} key={note._id} parent={ref} />)}
                    </AnimatePresence>
                </div>
            </motion.div>}

        </div>
    )
}

export default NotesList