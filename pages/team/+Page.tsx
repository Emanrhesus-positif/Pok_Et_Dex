// import React from "react";
// import { useState } from "react";
// import { onCreateNote } from "./Page.telefunc.js";
// import { useData } from "vike-react/useData";
// import type { Data } from "./+data.ts";
// import type { Note } from "@prisma/client";
// import { memo } from "react";
// import  NoteList from "./NoteList.tsx";
// import {reload} from "vike/client/router";

// export default function Page() {
//     const data = useData<Data>();

//     const [noteTitle, setNoteTitle] = useState("");
//     const [notes, setNotes] = useState<Note[]>(data.notes);


//     const handleCreateNote = async (event: React.FormEvent) => {
//         event.preventDefault();
        
//         const note = await onCreateNote(noteTitle);
//         console.log("note", note);
//         setNotes([...notes, note]);
//         setNoteTitle("");
//         reload();
//     }

//     return (
//         <>
//             <h1 className={"font-bold text-3xl pb-4"}>Notes</h1>

//             <form onSubmit={handleCreateNote}>
//                 <input
//                     type="text"
//                     value={noteTitle}
//                     onChange={(event) => setNoteTitle(event.target.value)}
//                 />
//                 <button type="submit">Ajouter</button>
//             </form>
//             <NoteList />
//         </>
//     );
// }
