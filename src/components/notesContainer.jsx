import React from "react";
import NotesList from "./notesList";

function NotesContainer({ notes, onArchive, onDelete }) {
    return (
        <div className="notes-container">
            <div className="notes-card">
                <h2>Daftar Catatan</h2>
                <div className="active-notes">
                    <NotesList
                        notes={notes.filter((note) => !note.archived)}
                        onArchive={onArchive}
                        onDelete={onDelete}
                    />
                </div>
            </div>
            <div className="notes-card">
                <h2>Arsip Catatan</h2>
                <div className="archived-notes">
                    <NotesList
                        notes={notes.filter((note) => note.archived)}
                        onArchive={onArchive}
                        onDelete={onDelete}
                    />
                </div>
            </div>
        </div>
    );
}

export default NotesContainer;