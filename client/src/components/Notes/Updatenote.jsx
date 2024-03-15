import React, { useContext, useRef, useEffect, } from 'react';
import NotesContext from '../../context/Notes/NotesContext';
import { resizeTextarea } from './Addnote';
import Input from '../UI/Input';

const Updatenote = () => {
    const titleInput = useRef(null);
    const descriptionInput = useRef(null);
    const tagInput = useRef(null);

    const { updateNote, modalCallbackRef, toModify } = useContext(NotesContext);

    useEffect(() => {

        titleInput.current.value = toModify.title;
        descriptionInput.current.value = toModify.description;
        tagInput.current.value = toModify.tag;
        modalCallbackRef.current = handleUpdate
        setTimeout(() => resizeTextarea({ target: descriptionInput.current }))

        return () => modalCallbackRef.current = () => { }
    }, [])

    const handleUpdate = () => {
        updateNote(toModify._id, titleInput.current, descriptionInput.current, tagInput.current);
    }

    return (

        <form>
            <Input inputRef={titleInput} placeholder='Title' name='title' styleType='notes' />
            <Input inputRef={descriptionInput} placeholder='note' name='description' inputType='textarea' handleChange={resizeTextarea} />
            <Input inputRef={tagInput} placeholder='Tag' name='tag' styleType='notes' />
        </form>

    )
}

export default Updatenote