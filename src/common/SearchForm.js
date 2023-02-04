import React, { useState } from 'react'

// form to find companies or jobs depending on what props it is passed
function SearchForm({ search }) {
    const [searchTerm, setSearchTerm] = useState("")


    function handleSubmit(e) {
        e.preventDefault()
        console.log(searchTerm.trim())
        search(searchTerm.trim() || undefined)
        setSearchTerm(searchTerm.trim())
    }

    // make the form change when you type in it
    function handleChange(e) {
        setSearchTerm(e.target.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="searchTerm"
                    placeholder="Enter what you'd like to search for..."
                    value={searchTerm}
                    onChange={handleChange} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchForm;