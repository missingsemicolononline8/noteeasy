import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import NotesContext from '../../context/Notes/NotesContext';


export const resizeTextarea = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
};

/**
 * Component for adding a note.
 * @returns {JSX.Element} The Addnote component.
 */
const Addnote = ({ classes }) => {
    const { addNote } = useContext(NotesContext);
    const initialState = { title: '', description: '', tag: '' };
    const [note, setNote] = useState(initialState);
    const formRef = useRef(null);
    const textAreaRef = useRef(null);

    /**
     * Event handler for input changes.
     * @param {Event} e - The input change event.
     */
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    /**
     * Event handler for adding a note.
     * @param {Event} e - The click event.
     */
    const handleAdd = (e) => {
        e?.preventDefault();
        e?.target.blur();
        textAreaRef.current.removeAttribute('style');
        formRef.current.removeAttribute('form-clicked');
        if (!note.description && !note.title) return;
        addNote(note.title, note.description, note.tag);
        setNote(initialState);
    };

    /**
     * Resizes the textarea to fit the content.
     * @param {Event} e - The input change event.
     */

    /**
     * Event listener for document mousedown events.
     * @param {Event} e - The mousedown event.
     */
    const documentListener = (e) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
            handleAdd();
            document.removeEventListener('mousedown', documentListener);
        }
    };

    /**
     * Event handler for form click events.
     */
    const formClickHandler = () => {
        if (!(formRef.current.getAttribute('form-clicked') === 'true')) {
            document.addEventListener('mousedown', documentListener);
            formRef.current.setAttribute('form-clicked', 'true');
        }
    };

    useEffect(() => {
        formRef.current.addEventListener('click', formClickHandler);
        if (formRef.current.getAttribute('form-clicked') === 'true') {
            document.addEventListener('mousedown', documentListener);
        }

        return () => {
            formRef.current?.removeEventListener('click', formClickHandler);
            document.removeEventListener('mousedown', documentListener);
        };
    }, [note]);

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
                        value={note.title}
                        onChange={onChange}
                    />
                </div>
                <textarea
                    placeholder='Take a note...'
                    ref={textAreaRef}
                    className='form-control w-full px-3 py-2 outline-none resize-none text-lg group-focus-within:text-base overflow-hidden -mb-[7px]'
                    id='description'
                    name='description'
                    rows="1"
                    value={note.description}
                    onChange={(e) => {
                        onChange(e);
                        resizeTextarea(e);
                    }}
                ></textarea>
                <div className='hidden group-focus-within:block'>
                    <input
                        type='text'
                        placeholder='Tag'
                        className='form-control w-full px-3 py-2 outline-none'
                        id='tag'
                        name='tag'
                        value={note.tag}
                        onChange={onChange}
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
