import React, { useContext, useRef, useEffect, useLayoutEffect, } from 'react';
import NotesContext from '../../context/Notes/NotesContext';
import { resizeTextarea } from './Addnote';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { motion } from 'framer-motion';

const Updatenote = ({ resetPositions }) => {
    const titleInput = useRef(null);
    const descriptionInput = useRef(null);
    const tagInput = useRef(null);

    const { updateNote, toModify, setToModify } = useContext(NotesContext);

    useEffect(() => {
        titleInput.current.value = toModify.title;
        descriptionInput.current.value = toModify.description;
        tagInput.current.value = toModify.tag;
        setTimeout(() => resizeTextarea({ target: descriptionInput.current }))
    }, [])

    const handleUpdate = () => {
        updateNote(toModify._id, titleInput.current, descriptionInput.current, tagInput.current);
        setToModify(null)
        resetPositions()
    }

    const handleClose = () => {
        setToModify(null)
        resetPositions()
    }

    return (
        <motion.form className='pb-10 relative' >
            <Input inputRef={titleInput} placeholder='Title' name='title' styleType='notes' />
            <Input inputRef={descriptionInput} placeholder='note' name='description' inputType='textarea' handleChange={resizeTextarea} />
            <Input inputRef={tagInput} placeholder='Tag' name='tag' styleType='notes' />
            <Button text="Close" className='rounded absolute right-20 bottom-2 px-4 py-2 hover:bg-[rgba(95,99,104,0.039)] active:bg-[rgba(95,99,104,0.161)] focus-visible:outline-none focus-visible:bg-[rgba(95,99,104,0.039)]' handleClick={handleClose} />
            <Button text="Save" className='rounded absolute right-0 bottom-2 px-4 py-2 hover:bg-[rgba(95,99,104,0.039)] active:bg-[rgba(95,99,104,0.161)] focus-visible:outline-none focus-visible:bg-[rgba(95,99,104,0.039)]' handleClick={handleUpdate} />
        </motion.form>
    )
}

export default Updatenote