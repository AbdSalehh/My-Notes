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
            lettersCount: 0,
            inputValue: '',
            countLimit: 50,
            loaderCompleted: 0,
            errorLimit: false
        };

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        const inputLength = event.target.value;
        if (inputLength.length <= this.state.countLimit) {
            this.setState((prev) => {
                return {
                    title: event.target.value,
                    lettersCount: inputLength.length,
                    inputValue: inputLength,
                    errorLimit: false,
                    loaderCompleted: Math.floor(inputLength.length / prev.countLimit * 100, 2)
                }
            });
        }
        else {
            this.setState((prev) => {
                return {
                    inputValue: prev.inputValue,
                    errorLimit: true
                }
            })
            toast.error('Karakter Tidak Boleh Lebih Dari 50', {
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
                    body: "",
                    inputValue: "",
                    lettersCount: 0,
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
                        <input type="text" placeholder="Isi Judul Catatan..." value={this.state.inputValue} onChange={this.onTitleChangeEventHandler} />
                        {(() => {
                            if (this.state.lettersCount >= 40) {
                                return (
                                    <p className="title-length red">Sisa Karakter : {50 - this.state.lettersCount}</p>
                                )
                            } else {
                                return (
                                    <p className="title-length green">Sisa Karakter : {50 - this.state.lettersCount}</p>
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