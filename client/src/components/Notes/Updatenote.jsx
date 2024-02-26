import React, { useContext, useRef, useLayoutEffect, useEffect, } from 'react';
import NotesContext from '../../context/Notes/NotesContext';
import { resizeTextarea } from './Addnote';
import { AnimatePresence, motion } from 'framer-motion';
import Input from '../UI/Input';
import Button from '../UI/Button';

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
            {toUpdate && <motion.dialog key="componentA" layout ref={editModal} layoutId={toUpdate._id} className="rounded-lg bg-white w-[600px] p-5 pb-10 relative group" tabIndex="-1"  >
                <form>
                    <Input inputRef={titleInput} placeholder='Title' name='title' styleType='notes' />
                    <Input inputRef={descriptionInput} placeholder='note' name='description' inputType='textarea' handleChange={resizeTextarea} />
                    <Input inputRef={tagInput} placeholder='Tag' name='tag' styleType='notes' />
                </form>
                <Button text="Close" className='rounded absolute right-3 bottom-2 px-4 py-2 hover:bg-[rgba(95,99,104,0.039)] active:bg-[rgba(95,99,104,0.161)] focus-visible:outline-none focus-visible:bg-[rgba(95,99,104,0.039)]' handleClick={handleUpdate} />
            </motion.dialog>
            }
        </AnimatePresence>
    )
}

export default Updatenote
