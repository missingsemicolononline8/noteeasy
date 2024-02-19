import { useState, useRef } from 'react';
import Addnote from './Addnote';
import Updatenote from './Updatenote';
import NotesList from './NotesList';
import NotesState from '../../context/Notes/NotesState';


const Notes = () => {

    console.log("Notes.jsx rendered");


    return (
        <NotesState>
            <Addnote classes={"w-2/5 mt-10 mx-auto pb-5"} />
            <NotesList />
            <Updatenote />
        </NotesState>
    )
}

export default Notes

