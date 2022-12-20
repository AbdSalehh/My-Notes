import React from "react";

function SearchBar ({ onSearch }) {

    const onSearchBarChangeEventHandler = (event) => {
        onSearch(event.target.value);
    } 

    return (
        <div className="search-bar">
            <div className="search-icon">
                <i className="bi bi-search"></i>
            </div>
            <input 
                type="text" 
                placeholder="Cari Catatan Disini..."
                onChange={onSearchBarChangeEventHandler}
            />
        </div>
    )
}

export default SearchBar;