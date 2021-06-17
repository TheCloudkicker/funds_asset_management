import React, { useEffect } from 'react'

const TeamContainer = () => {

    useEffect(() => {
        localStorage.setItem('waibeUrl', '/setup/team')
    }, [])

    return (
        <div className="team-container">

            <div className="team-container-header">

            </div>

            <div className="team-container-list">

            </div>

        </div>
    )
}

export default TeamContainer
