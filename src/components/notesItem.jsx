import React from 'react';
import { showFormattedDate } from '../utils/data';

function NotesItem({
    id, 
    title,
    body,
    archived,
    onArchive,
    onDelete,
    createdAt,
}) {
    if (archived) {
        return (
            <div className="notes-item">
                <h3 className="notes-title">{title}</h3>
                <p className="notes-date">{showFormattedDate(createdAt)}</p>
                <p className="notes-body">{body}</p>
                <div className="notes-button">
                    <button className="unarchive-button" onClick={() => onArchive(id)}>
                        <i className="bi bi-arrow-counterclockwise"></i>
                    </button>
                    <button className="delete-button" onClick={() => onDelete(id)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="notes-item">
                <h3 className="notes-title">{title}</h3>
                <p className="notes-date">{showFormattedDate(createdAt)}</p>
                <p className="notes-body">{body}</p>
                <div className="notes-button">
                    <button className="archive-button" onClick={() => onArchive(id)}>
                        <i className="bi bi-file-earmark-zip"></i>
                    </button>
                    <button className="delete-button" onClick={() => onDelete(id)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default NotesItem;