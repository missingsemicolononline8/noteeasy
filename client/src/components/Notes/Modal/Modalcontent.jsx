import React, { useContext, useEffect, useRef } from 'react'
import { ModalContext } from '../../../context/Modal/ModalContext'
import Updatenote from '../Updatenote'
import Addcollaborator from '../Addcollaborator'
import { useAnimationControls, motion } from 'framer-motion'

const Modalcontent = ({ resetPositions }) => {

    const { modifyComponent } = useContext(ModalContext)
    const controls = useAnimationControls()
    const divRef = useRef(null)
    const heightRef = useRef(0)

    useEffect(() => {
        queueMicrotask(() => {
            if (heightRef.current) {
                controls.set({ scaleY: heightRef.current / divRef.current.offsetHeight })
                controls.start({ scaleY: 1 })
            }
            heightRef.current = divRef.current.offsetHeight
        });
    }, [modifyComponent])

    console.log("Modal content")
    return (
        <motion.div ref={divRef} className="rounded-lg bg-white w-[600px] relative" style={{ transformOrigin: "top left" }} animate={controls}>
            {modifyComponent === 'update' && <Updatenote resetPositions={resetPositions} />}
            {modifyComponent === 'addCollaborator' && <Addcollaborator />}
        </motion.div>
    )
}

export default Modalcontent