import React, { useContext, useRef, useLayoutEffect, useEffect, } from 'react';
import NotesContext from '../../context/Notes/NotesContext';
import { resizeTextarea } from './Addnote';
import { AnimatePresence, motion } from 'framer-motion';

const Updatenote = () => {
    const titleInput = useRef(null);
    const descriptionInput = useRef(null);
    const tagInput = useRef(null);

    const editModal = useRef(null);

    const { updateNote, toUpdate } = useContext(NotesContext);

    const handleUpdate = (e) => {
        e?.preventDefault();
        updateNote(toUpdate._id, titleInput.current.value, descriptionInput.current.value, tagInput.current.value);
    }


    useLayoutEffect(() => {
        if (toUpdate) {
            titleInput.current.value = toUpdate.title;
            descriptionInput.current.value = toUpdate.description;
            tagInput.current.value = toUpdate.tag;
            editModal.current.showModal()
            resizeTextarea({ target: descriptionInput.current })
        }
    }, [toUpdate])


    return (
        <AnimatePresence>
            {toUpdate && <motion.dialog key="componentA" layout ref={editModal} layoutId={toUpdate._id} className="rounded-lg bg-white w-[600px] p-5 pb-10 relative" tabIndex="-1" exit={{ x: 0, y: 0 }} >
                <form>
                    <div className="mb-4">
                        <motion.input ref={titleInput} type="text" placeholder='Title' className="outline-none w-full text-2xl" id="title" name="title" />
                    </div>
                    <div className="my-4">
                        <motion.textarea ref={descriptionInput} placeholder='Note' className="outline-none w-full resize-none overflow-hidden" id="description" name="description" onChange={resizeTextarea} rows={1}></motion.textarea>
                    </div>
                    <div className="mt-4">
                        <motion.input ref={tagInput} type="text" placeholder='Tag' className="outline-none w-full" id="tag" name="tag" />
                    </div>
                </form>
                <button
                    className='rounded absolute right-3 bottom-2 px-4 py-2 hover:bg-[rgba(95,99,104,0.039)] active:bg-[rgba(95,99,104,0.161)] focus-visible:outline-none focus-visible:bg-[rgba(95,99,104,0.039)]'
                    onClick={handleUpdate}
                >
                    Close
                </button>
            </motion.dialog>
            }
        </AnimatePresence>
    )
}

export default Updatenote
