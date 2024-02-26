import { useContext, useMemo, useState } from "react";
import { BsPin, BsFillPinFill } from "react-icons/bs";
import NotesContext from "../../context/Notes/NotesContext";

const ToggleNotePinned = ({ noteId, className, isPinned }) => {
    const [pinned, setPinned] = useState(isPinned);

    const icon = useMemo(() => pinned ? <BsFillPinFill /> : <BsPin />, [pinned])
    const { toggleNotePin } = useContext(NotesContext)

    const handleClick = async () => {
        const prevPinned = pinned;
        setPinned(!pinned)
        toggleNotePin(noteId, !pinned, () => setPinned(prevPinned))
    }

    return (
        <button onClick={handleClick} className={`hidden absolute ${className} right-3 top-2 p-2 rounded-full hover:bg-gray-200 text-xl text-gray-500 hover:text-black`}>{icon}</button>
    )
}

export default ToggleNotePinned