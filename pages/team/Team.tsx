import { useState } from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import type { Note } from "@prisma/client";
import { memo } from "react";
import { onUpdate, onDelete } from "./Page.telefunc.js";


const NoteList = memo(() => {
    const data = useData<Data>();

    const [notes, setNotes] = useState<Note[]>(data.notes);
    const handleSuppression = async (id: number) => {
        await onDelete(id);
        setNotes(notes.filter((note) => note.id !== id));
    };
    const handleModification = async (id: number) => {
        await onUpdate(id,"Nouveau titre");
    };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
              <a>{note.title}</a>
              <button onClick={() => handleSuppression(note.id)}>Supprimer</button>
              <button onClick={() => handleModification(note.id)}>Modifier</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

NoteList.displayName = "NoteList";

export default NoteList;