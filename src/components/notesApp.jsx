import React from 'react';
import Header from './header';
import Modal from './modal';
import NotesInput from './notesInput';
import NotesContainer from './notesContainer';
import Footer from './footer';
import { getInitialData } from '../utils/data';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            notes: getInitialData(),
            unfilteredNotes: getInitialData(),
            showModal: false,
            confirmDelete: null,
            message:'',
        };

        this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.onConfirmDeleteHandler = this.onConfirmDeleteHandler.bind(this);
        this.onCancelDeleteHandler = this.onCancelDeleteHandler.bind(this);
    }

    onAddNotesHandler({ title, body }) {
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        createdAt: +new Date(),
                        body,
                        archived: false,
                    },
                ],

                unfilteredNotes: [
                    ...prevState.unfilteredNotes,
                    {
                        id: +new Date(),
                        title,
                        createdAt: +new Date(),
                        body,
                        archived: false,
                    },
                ],
            };
        });
    }

    onArchiveHandler(id) {
        this.setState((prevState) => {
            return {
                notes: prevState.notes.map((note) => {
                    if (note.id === id) {
                        return {
                            ...note,
                            archived: !note.archived,
                        };
                    } else {
                        return note;
                    }
                }),

                unfilteredNotes: prevState.unfilteredNotes.map((note) => {
                    if (note.id === id) {
                        return {
                            ...note,
                            archived: !note.archived,
                        };
                    } else {
                        return note;
                    }
                }),
            };
        });
    }

    onSearchHandler(keyword) {
        if (keyword.length > 0) {
            this.setState({
                notes: this.state.unfilteredNotes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase())),
            });
        } else {
            this.setState({
                notes: this.state.unfilteredNotes,
            });
        }
    }

    onConfirmDeleteHandler(id) {
        const index = this.state.notes.findIndex((note) => note.id === id);
        const message = this.state.notes[index].title;
        this.setState(() => {
            return {
                showModal: true,
                confirmDelete: id,
                message: message,
            };
        });
    }

    onDeleteHandler() {
        this.setState((prevState) => {
            return {
                notes: prevState.notes.filter((note) => note.id !== prevState.confirmDelete),
                unfilteredNotes: prevState.unfilteredNotes.filter((note) => note.id !== prevState.confirmDelete),
                showModal: false,
            };
        });

        toast.success('Catatan Berhasil Dihapus', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: "toast",
        });
    }

    onCancelDeleteHandler() {
        this.setState({
            showModal: false,
            confirmDelete: null,
        });
    }

    render() {
        return (
            <div className="notes-app">
                <Header onSearch={(searchText) => this.onSearchHandler(searchText)} />
                <NotesInput addNotes={this.onAddNotesHandler} />
                <NotesContainer notes={this.state.notes} onArchive={this.onArchiveHandler} onDelete={this.onConfirmDeleteHandler} />
                <Footer />
                
                {this.state.showModal && (
                    <Modal
                        onConfirm={this.onDeleteHandler}
                        onCancel={this.onCancelDeleteHandler}
                        message={this.state.message}
                    />
                )}
            </div>
        );
    }
}

export default NotesApp;