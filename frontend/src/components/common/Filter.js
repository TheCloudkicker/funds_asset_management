import React, { useState } from 'react'

function Filter({ onChange, filterClass, placeholder }) {

    const [filter, setFilter] = useState('')

    const handleChange = e => {
        setFilter(e.target.value)
        onChange(e.target.value)
    }
    return (
        <input type="text" id="filter"
            className={filterClass}
            placeholder={placeholder}
            value={filter}
            onChange={handleChange} />
    )
}

export default Filter

