import Addnote from './Addnote';
import Updatenote from './Updatenote';
import NotesList from './NotesList';
import NotesState from '../../context/Notes/NotesState';
import ModifyNote from './Modifynote';


const Notes = () => {

    console.log("Notes Component")
    return (
        <NotesState>
            <Addnote className="w-4/5 md:w-2/5 mt-10 mx-auto pb-5" />
            <NotesList />
            <ModifyNote>
                <Updatenote />
            </ModifyNote>
        </NotesState>
    )
}

export default Notes

