import { useContext } from 'react'
import NotesContext from '../../../context/Notes/NotesContext';
import Skeleton from 'react-loading-skeleton'
import { LiaTrashAlt, LiaEdit } from "react-icons/lia";
import { HiOutlineDuplicate } from "react-icons/hi";

const Noteactions = ({ modifyObj, loading }) => {
    const { deleteNote, setToModify, duplicateNote } = useContext(NotesContext);

    return (
        <div className='w-full opacity-0 group-hover:opacity-100 hover:opacity-100 transition text-lg text-slate-800 flex justify-end py-2 pr-2'>
            {loading ? <Skeleton width={30} containerClassName="mx-2" /> : <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => setToModify(modifyObj())}><LiaEdit /></button>}
            {loading ? <Skeleton width={30} containerClassName="mx-2" /> : <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => duplicateNote(modifyObj()._id)}><HiOutlineDuplicate /></button>}
            {loading ? <Skeleton width={30} containerClassName="mx-2" /> : <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => deleteNote(modifyObj()._id)}><LiaTrashAlt /> </button>}
        </div>
    )
}

export default Noteactions