import React, {useId,useContext} from 'react';
import NotesContext from '../context/Notes/NotesContext';


const Updatenote = (props) => {
    const {openEditModelRef,note,onChange} = props;
    const {updateNote} = useContext(NotesContext);
    const handleUpdate = () => {
        updateNote(note._id,note.title,note.description,note.tag);
    }

    const modalId = useId();
    return (
        <>
        <div id={modalId} className="modal fade" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note?.title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" name="description" value={note?.description} rows="3" onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={note?.tag} onChange={onChange} />
                                </div>
                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleUpdate} data-bs-dismiss="modal">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <button ref={openEditModelRef} type="button" className="d-none" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
            </button>
            </>
    )
}

export default Updatenote
