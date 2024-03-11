import React, { useContext, useRef, useEffect, } from 'react';
import NotesContext from '../../context/Notes/NotesContext';
import { resizeTextarea } from './Addnote';
import { AnimatePresence } from 'framer-motion';
import Input from '../UI/Input';
import Button from '../UI/Button';
import useUpdateModal from '../../Hooks/useUpdateModal';
import useModal from '../../Hooks/useModal';

const Updatenote = () => {
    const titleInput = useRef(null);
    const descriptionInput = useRef(null);
    const tagInput = useRef(null);

    const { updateNote, toUpdate, editModal } = useContext(NotesContext);
    const [showModal, , Modal] = useModal(editModal)

    const initAndExitState = {
        left: toUpdate?.noteEl.getBoundingClientRect().left + 'px',
        top: toUpdate?.noteEl.getBoundingClientRect().top + 'px',
        width: toUpdate?.noteEl.getBoundingClientRect().width + 'px',
        height: toUpdate?.noteEl.getBoundingClientRect().height + 'px',
        margin: 0,
        opacity: 0,
    }

    useEffect(() => {
        if (toUpdate) {
            titleInput.current.value = toUpdate.title;
            descriptionInput.current.value = toUpdate.description;
            tagInput.current.value = toUpdate.tag;
            showModal()
            resizeTextarea({ target: descriptionInput.current })
        }
    }, [toUpdate])

    const [controls, resetPositions] = useUpdateModal(initAndExitState);

    const handleUpdate = (e) => {
        e?.preventDefault();
        updateNote(toUpdate._id, titleInput.current.value, descriptionInput.current.value, tagInput.current.value);
        resetPositions()
    }

    return (
        <AnimatePresence>
            {toUpdate && <Modal className="rounded-lg bg-white w-[600px] p-5 pb-10 relative group overflow-clip" tabIndex="-1" animate={controls} exit={initAndExitState}>
                <form>
                    <Input inputRef={titleInput} placeholder='Title' name='title' styleType='notes' />
                    <Input inputRef={descriptionInput} placeholder='note' name='description' inputType='textarea' handleChange={resizeTextarea} />
                    <Input inputRef={tagInput} placeholder='Tag' name='tag' styleType='notes' />
                </form>
                <Button text="Close" className='rounded absolute right-3 bottom-2 px-4 py-2 hover:bg-[rgba(95,99,104,0.039)] active:bg-[rgba(95,99,104,0.161)] focus-visible:outline-none focus-visible:bg-[rgba(95,99,104,0.039)]' handleClick={handleUpdate} />
            </Modal>
            }
        </AnimatePresence>
    )
}

export default Updatenote