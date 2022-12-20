import React from 'react';
import NotesItem from './notesItem';

function NotesList({ notes, onArchive, onDelete }) {
    if (notes.length === 0) {
        return (
            <div className="notes-empty">
                <div className="notes-empty__image"></div>
                <div className="notes-empty__text">Tidak ada catatan.</div>
            </div>
        );
    } else {
        return (
            <div className="notes-list">
                {notes.map((note) => (
                    <NotesItem
                        key={note.id}
                        id={note.id}
                        onArchive={onArchive}
                        onDelete={onDelete}
                        {...note}
                    />
                ))}
            </div>
        );
    }
}

export default NotesList;