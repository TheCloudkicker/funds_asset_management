import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { NavSection } from '../../../assets/styled-components/Containers'


const NavigatorHeader = ({ dispatch, isDark }) => {

    return (
        <>

            <NavSection>

            </NavSection>

            <NavSection>

                <NavLink to="/navigator/tabular"
                    style={{ width: '12rem', marginRight: '5px' }}
                    className={"ui icon button " + (isDark ? "inverted violet" : "")}
                    activeClassName="active">
                    Tabular
                </NavLink>

                <NavLink to="/navigator/visual"
                    style={{ width: '12rem', marginRight: '5px' }}
                    className={"ui icon button " + (isDark ? "inverted violet" : "")}
                    activeClassName="active">
                    Visual
                </NavLink>

            </NavSection>

        </>
    )
}

export default NavigatorHeader
