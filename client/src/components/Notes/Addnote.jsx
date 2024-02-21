import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import NotesContext from '../../context/Notes/NotesContext';

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
                    <input
                        type='text'
                        placeholder='Title'
                        className='form-control w-full p-3 pb-2 outline-none'
                        id='title'
                        name='title'
                        ref={titleInputRef}
                    />
                </div>
                <textarea
                    placeholder='Take a note...'
                    className='form-control w-full px-3 py-2 outline-none resize-none text-lg group-focus-within:text-base overflow-hidden -mb-[7px]'
                    id='description'
                    name='description'
                    rows="1"
                    onChange={resizeTextarea}
                    ref={descriptionInputRef}
                ></textarea>
                <div className='hidden group-focus-within:block'>
                    <input
                        type='text'
                        placeholder='Tag'
                        className='form-control w-full px-3 py-2 outline-none'
                        id='tag'
                        name='tag'
                        ref={tagInputRef}
                    />
                </div>
                <button
                    className='hidden rounded group-focus-within:block float-right mr-3 mb-2 px-4 py-2 hover:bg-[rgba(95,99,104,0.039)] active:bg-[rgba(95,99,104,0.161)] focus-visible:outline-none focus-visible:bg-[rgba(95,99,104,0.039)]'
                    onClick={handleAdd}
                >
                    Close
                </button>
            </form>
        </div>
    );
};

export default Addnote;
