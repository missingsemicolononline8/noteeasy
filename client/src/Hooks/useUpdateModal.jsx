import { useContext, useEffect, useRef } from 'react';
import NotesContext from '../context/Notes/NotesContext';
import { useAnimationControls } from 'framer-motion';

const useUpdateModal = (initAndExitState) => {

    const controls = useAnimationControls()
    const { current: modalMargins } = useRef({ yMargin: null, xMargin: null });

    const { toUpdate, editModal } = useContext(NotesContext);

    const resetPositions = () => {
        toUpdate.animate(toUpdate.noteEl, {
            scaleX: 1,
            scaleY: 1,
            x: toUpdate.notePositions.translatedX,
            y: toUpdate.notePositions.translatedY,
            opacity: 1,
        }, { type: "keyframes" })
    }

    useEffect(() => {
        if (toUpdate) {
            const initialX = toUpdate.noteEl.getBoundingClientRect().left - toUpdate.notePositions.translatedX
            const initialY = toUpdate.noteEl.getBoundingClientRect().top - toUpdate.notePositions.translatedY

            modalMargins.xMargin = (window.innerWidth - editModal.current.offsetWidth) / 2;
            modalMargins.yMargin = (window.innerHeight - editModal.current.offsetHeight) / 2;

            const widthRatio = editModal.current.offsetWidth / toUpdate.noteEl.offsetWidth;
            const heightRatio = editModal.current.offsetHeight / toUpdate.noteEl.offsetHeight;

            const leftDifference = editModal.current.getBoundingClientRect().left - initialX;
            const topDifference = editModal.current.getBoundingClientRect().top - initialY;

            controls.set(initAndExitState)

            toUpdate.animate(toUpdate.noteEl, {
                scaleX: widthRatio,
                scaleY: heightRatio,
                x: leftDifference,
                y: topDifference,
                opacity: 0,
                transformOrigin: "top left"
            }, { type: "keyframes" })

            controls.start({
                left: 0,
                top: 0,
                margin: `${modalMargins.yMargin}px ${modalMargins.xMargin}px`,
                opacity: 1,
                width: editModal.current.offsetWidth + 'px',
                height: editModal.current.offsetHeight + 'px',
            });
        }

    }, [toUpdate])

    return [controls, resetPositions]
}

export default useUpdateModal