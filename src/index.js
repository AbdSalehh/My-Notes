import React from 'react';
import { createRoot } from 'react-dom/client';
import NotesApp from './components/notesApp';

// import style
import './styles/style.css';
import './styles/responsive.css';

const root = createRoot(document.getElementById('root'));
root.render(<NotesApp />);