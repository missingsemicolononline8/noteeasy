import React, { useContext, useEffect, useLayoutEffect, } from 'react';
import NotesContext from '../../../context/Notes/NotesContext';
import { AnimatePresence } from 'framer-motion';
import useModifyModal from '../../../Hooks/useModifyModal';
import useModal from '../../../Hooks/useModal';

const ModifyNote = ({ children }) => {

    const { toModify, editModal } = useContext(NotesContext);
    const [Modal, showModal] = useModal(editModal)

    useEffect(() => {
        if (toModify) {
            showModal()
        }
    }, [toModify])

    const [controls, exitState, resetPositions] = useModifyModal();

    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                resetPositions,
            });
        });
    };

    return (
        <AnimatePresence>
            {toModify &&
                <Modal className="overflow-visible rounded-lg opacity-0 mt-[20vh] bg-transparent group" animate={controls} exit={exitState} >
                    {renderChildren()}
                </Modal>
            }
        </AnimatePresence>
    )
}

export default ModifyNote