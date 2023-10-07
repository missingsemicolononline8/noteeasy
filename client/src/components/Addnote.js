import React,{useContext,useState} from 'react'
import NotesContext from '../context/Notes/NotesContext';


const Addnote = () => {
    const {addNote} = useContext(NotesContext);
    const initialState = {title:"",description:"",tag:"default"};
    const [note,setNote] = useState(initialState);
    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote(initialState)
    }

    return (
        <div className="container my-3">
            <h1>Add a note</h1>
            <form action="" className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={note.description} rows="3" onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleAdd}>Add</button>
            </form>
        </div>
    )
}

export default Addnote
