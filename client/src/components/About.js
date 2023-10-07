import React, { useContext, useEffect } from 'react';
import NotesContext from '../context/Notes/NotesContext';


const About = () => {
    const a = useContext(NotesContext)
    useEffect(() => {
        //a.modifyState()
        return () => {
            
        }
    }, [])
    return (
        <div>
            This is About
        </div>
    )
}

export default About;