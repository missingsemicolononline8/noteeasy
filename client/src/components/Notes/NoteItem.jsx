import React, { useContext } from 'react'
import NotesContext from '../../context/Notes/NotesContext';
import { motion, useMotionValue } from 'framer-motion';
import { LiaTrashAlt, LiaEdit } from "react-icons/lia";


const NoteItem = ({ note, parent }) => {
    const { deleteNote, setToUpdate } = useContext(NotesContext);
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const noteRef = React.useRef(null)

    const handleEdit = () => {
        noteRef.current.style.left = noteRef.current.getBoundingClientRect().left - 12 + 'px';
        noteRef.current.style.top = noteRef.current.getBoundingClientRect().top + window.pageYOffset - 12 + 'px';
        noteRef.current.style.position = 'absolute';
        x.set(0)
        y.set(0)
        setTimeout(() => {
            setToUpdate({
                _id: note._id,
                title: note.title,
                description: note.description,
                tag: note.tag,
                xCord: x.current,
                yCord: y.current
            })
        }, 100);

    }

    return (
        <div className='w-60 group'>
            <motion.div key="componentB" ref={noteRef} layout layoutId={note._id} drag style={{ x, y }} dragConstraints={parent} whileDrag={{ scale: 1.1 }} dragElastic={0.2} className="w-60 m-3" >
                <div className="card border border-[#e0e0e0] rounded-[20px] overflow-hidden bg-white">
                    <div className="card-body relative">
                        {note.title || note.description ?
                            <>
                                <h5 className="card-title pt-3 px-4">{note.title}</h5>
                                <p className="card-text py-3 px-4">{note.description}</p>
                                <p className="pb-4 rounded-pill text-bg-info px-4">{note.tag}</p>
                            </>
                            : <p className="card-text py-3 px-4">Empty Note</p>
                        }
                        <div className='w-full opacity-0 group-hover:opacity-100 hover:opacity-100 transition text-lg text-slate-800 flex justify-end py-2 pr-2'>
                            <button className="p-2 rounded-full hover:bg-gray-200" onClick={handleEdit}><LiaEdit /></button>
                            <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => deleteNote(note._id)}><LiaTrashAlt /></button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}


export default NoteItem
