import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NotesInput extends React.Component {
    constructor(props) {
        super(props);

        // inisialisasi state
        this.state = {
            title: '',
            body: '',
            titleLength: 0,
        };

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        this.setState(() => {
            if (event.target.value.length <= 50) {
                return {
                    title: event.target.value,
                    titleLength: event.target.value.length,
                };
            } else {
                toast.error('Jumlah Karakter Lebih Dari 50', {
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
                
                return {
                    title: event.target.value,
                };
            }
        });
    }

    onBodyChangeEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value,
            };
        });
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        if (this.state.title === '') {
            toast.error('Judul Catatan Kosong', {
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
        } else if (this.state.body === '') {
            toast.error('Isi Catatan Kosong', {
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
        } else {
            this.props.addNotes(this.state);
            this.setState(() => {
                return {
                    title: "",
                    body: "",
                    titleLength: 0,
                };
            });
            toast.success('Catatan Berhasil Ditambahkan', {
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
    }

    render() {
        return (
            <div className="notes-input-area">
                <div className="body-image"></div>
                <form className="notes-input" onSubmit={this.onSubmitEventHandler}>
                    <div className="add-notes">Tambah Catatan</div>
                    <label>
                        <h2>Title</h2>
                        <input type="text" placeholder="Isi Judul Catatan..." value={this.state.title} onChange={this.onTitleChangeEventHandler} />
                        {(() => {
                            if (this.state.titleLength >= 40) {
                                return (
                                    <p className="title-length red">Sisa Karakter : {50 - this.state.titleLength}</p>
                                )
                            } else {
                                return (
                                    <p className="title-length green">Sisa Karakter : {50 - this.state.titleLength}</p>
                                )
                            }
                        })()}
                    </label>
                    <label>
                        <h2>Isi Catatan</h2>
                        <textarea placeholder="Isi Catatan Disini..." cols="10" rows="10" name="text_body" charswidth="23" value={this.state.body} onChange={this.onBodyChangeEventHandler} />
                    </label>
                    <button type="submit" className="button">Tambah</button>
                </form>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        )
    }
}

export default NotesInput;