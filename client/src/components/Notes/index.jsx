import Addnote from './Addnote';
import NotesList from './NotesList';
import ModifyNote from './Modal/Modifynote';
import NotesState from '../../context/Notes/NotesState';
import Modalcontent from './Modal/Modalcontent';
import ModalState from '../../context/Modal/ModalContext';


const Notes = () => {

    console.log("Notes Component")
    return (
        <NotesState>
            <Addnote className="w-4/5 md:w-2/5 mt-10 mx-auto pb-5" />
            <ModalState>
                <NotesList />
                <ModifyNote>
                    <Modalcontent />
                </ModifyNote>
            </ModalState>
        </NotesState>
    )
}

export default Notes

