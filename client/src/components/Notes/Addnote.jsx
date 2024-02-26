import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import NotesContext from '../../context/Notes/NotesContext';
import Input from '../UI/Input';
import Button from '../UI/Button';

export const resizeTextarea = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
};

const Addnote = ({ classes }) => {
    const { addNote } = useContext(NotesContext);
    const formRef = useRef(null);
    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const tagInputRef = useRef(null);

    const resetInputs = () => {
        titleInputRef.current.value = '';
        descriptionInputRef.current.value = '';
        tagInputRef.current.value = '';
    };

    const handleAdd = (e) => {
        e?.preventDefault();
        e?.target.blur();

        const title = titleInputRef.current;
        const description = descriptionInputRef.current;
        const tag = tagInputRef.current;

        descriptionInputRef.current.removeAttribute('style');
        formRef.current.removeAttribute('form-clicked');
        if (!description.value && !title.value) return;
        addNote(title.value, description.value, tag.value);
        resetInputs();
    };

    const documentListener = (e) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
            handleAdd();
            document.removeEventListener('mousedown', documentListener);
        }
    };

    const formClickHandler = () => {
        if (!formRef.current.getAttribute('form-clicked')) {
            document.addEventListener('mousedown', documentListener);
            formRef.current.setAttribute('form-clicked', 'true');
        }
    };

    useEffect(() => {
        formRef.current.addEventListener('click', formClickHandler);

        return () => {
            formRef.current?.removeEventListener('click', formClickHandler);
            document.removeEventListener('mousedown', documentListener);
        };
    }, []);

    console.log("Add note component");

    return (
        <div className={classes}>
            <form ref={formRef} className='my-3 group rounded-lg shadow-custom overflow-hidden bg-white z-20 relative'>
                <div className='hidden group-focus-within:block'>
                    <Input inputRef={titleInputRef} placeholder="Title" name="title" styleType='notes' />
                </div>
                <Input inputRef={descriptionInputRef} placeholder='Take a note...' name='description' inputType='textarea' handleChange={resizeTextarea} />
                <div className='hidden group-focus-within:block'>
                    <Input inputRef={tagInputRef} placeholder='Tag' name='tag' styleType='notes' />
                </div>
                <Button text="Close" className='hidden rounded group-focus-within:block float-right mr-3 mb-2 px-4 py-2 hover:bg-[rgba(95,99,104,0.039)] active:bg-[rgba(95,99,104,0.161)] focus-visible:outline-none focus-visible:bg-[rgba(95,99,104,0.039)]' handleClick={handleAdd} />
            </form>
        </div>
    );
};

export default Addnote;
