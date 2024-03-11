import { useContext } from 'react'
import NotesContext from '../../context/Notes/NotesContext';
import { motion, useMotionValue, useAnimate } from 'framer-motion';
import { LiaTrashAlt, LiaEdit } from "react-icons/lia";
import { HiOutlineDuplicate } from "react-icons/hi";
import ToggleNotePinned from './ToggleNotePinned';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { v4 as uuid } from 'uuid';

const NoteItem = ({ note, loading, parent }) => {
    const { deleteNote, setToUpdate, duplicateNote } = useContext(NotesContext);
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const [scope, animate] = useAnimate()

    const handleEdit = () => {
        setToUpdate({
            ...note, noteEl: scope.current, animate, notePositions: {
                translatedX: x.current,
                translatedY: y.current
            }
        })
    }

    { typeof note.title === 'string' && console.log(`Note Item : ${note.title}`) }

    return (
        <motion.div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-1 group box-border' layoutId={note.lId || note._id} layout exit={{ scale: 0 }} >
            <motion.div ref={scope} style={{ x, y, opacity: note.pending ? 0.4 : 1 }} drag dragConstraints={parent} dragElastic={0.1} whileDrag={{ scale: 1.1 }} className="w-full" >
                <div className="card border border-[#e0e0e0] rounded-md overflow-hidden bg-white">
                    <div className="card-body relative">
                        <ToggleNotePinned className="group-hover:block" noteId={note._id} isPinned={note.pinned} />
                        {note.title || note.description ?
                            <>
                                <h5 className="card-title pt-3 px-4">{note.title}</h5>
                                <p className="card-text py-3 px-4 mb-1">{note.description}</p>
                            </>
                            : <p className="card-text py-3 px-4">Empty Note</p>
                        }
                        <a className="mx-4 px-3 py-1 rounded-md bg-slate-200 text-xs font-semibold">{note.tag}</a>
                        <div className='w-full opacity-0 group-hover:opacity-100 hover:opacity-100 transition text-lg text-slate-800 flex justify-end py-2 pr-2'>
                            {loading ? <Skeleton width={30} containerClassName="mx-2" /> : <button className="p-2 rounded-full hover:bg-gray-200" onClick={handleEdit}><LiaEdit /></button>}
                            {loading ? <Skeleton width={30} containerClassName="mx-2" /> : <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => duplicateNote(note._id)}><HiOutlineDuplicate /></button>}
                            {loading ? <Skeleton width={30} containerClassName="mx-2" /> : <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => deleteNote(note._id)}><LiaTrashAlt /> </button>}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>

    )
}

NoteItem.defaultProps = {
    note: {
        _id: uuid(),
        title: <Skeleton />,
        description: <Skeleton />,
        tag: <Skeleton width={30} />
    }
}

export default NoteItem
