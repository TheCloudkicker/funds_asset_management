import React from 'react'

function EntityIcon({ type }) {

    switch (type) {
        case 'LP':
            return <h1>Partnership</h1>
        case 'LLC':
            return <h1>Company</h1>
        case 'Corp':
            return <h1>Corporatiom</h1>
    }
}

export default EntityIcon
