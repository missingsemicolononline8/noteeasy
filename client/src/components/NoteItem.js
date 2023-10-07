import React,{useContext} from 'react'
import NotesContext from '../context/Notes/NotesContext';



const NoteItem = (props) => {
    const { note,openEditNoteModal } = props;
    const {deleteNote} = useContext(NotesContext);

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p>Tag: <span class="badge rounded-pill text-bg-info">{note.tag}</span></p>
                    <i className="far fa-trash-alt mx-2" onClick={() =>deleteNote(note._id)}></i>
                    <i className="far fa-edit mx-2" onClick={openEditNoteModal}></i>
                </div>
            </div>
        </div>
    )
}


export default NoteItem
