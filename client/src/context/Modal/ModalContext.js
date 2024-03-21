import { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalState = ({children}) => {

    const [modifyComponent,setModifyComponent] = useState('update')

    return <ModalContext.Provider value={{modifyComponent,setModifyComponent}}>
        {children}
    </ModalContext.Provider>
}

export default ModalState