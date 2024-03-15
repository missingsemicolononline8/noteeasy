import React, { useContext, useEffect, } from 'react';
import NotesContext from '../../context/Notes/NotesContext';
import { AnimatePresence } from 'framer-motion';
import useModifyModal from '../../Hooks/useModifyModal';
import useModal from '../../Hooks/useModal';
import Button from '../UI/Button';

const ModifyNote = ({ children }) => {

    const { toModify, editModal, setToModify, modalCallbackRef } = useContext(NotesContext);
    const [Modal, showModal] = useModal(editModal)

    useEffect(() => {
        if (toModify) {
            showModal()
        }
    }, [toModify])

    const [controls, exitState, resetPositions] = useModifyModal();

    const handleUpdate = (e) => {
        modalCallbackRef.current()
        setToModify(null)
        resetPositions()
    }

    return (
        <AnimatePresence>
            {toModify &&
                <Modal className="rounded-lg bg-white w-[600px] p-5 pb-10 relative group overflow-clip" tabIndex="-1" animate={controls} exit={exitState}>
                    {children}
                    <Button text="Close" className='rounded absolute right-3 bottom-2 px-4 py-2 hover:bg-[rgba(95,99,104,0.039)] active:bg-[rgba(95,99,104,0.161)] focus-visible:outline-none focus-visible:bg-[rgba(95,99,104,0.039)]' handleClick={handleUpdate} />
                </Modal>
            }
        </AnimatePresence>
    )
}

export default ModifyNote