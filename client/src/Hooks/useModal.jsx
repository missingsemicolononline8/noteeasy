import { motion } from "framer-motion"
import { useRef } from "react"
const useModal = (initRef = null) => {
    const modalRef = useRef(null)

    const showModal = () => {
        if (initRef)
            initRef.current?.showModal()
        else
            modalRef.current?.showModal()
    }

    const closeModal = () => {
        if (initRef)
            initRef.current?.close()
        else
            modalRef.current?.close()
    }

    const modalDialog = ({ children, ...props }) => {
        return <motion.dialog ref={initRef || modalRef} {...props} layout >{children}</motion.dialog>
    }

    return [modalDialog, showModal, closeModal]
}

export default useModal;