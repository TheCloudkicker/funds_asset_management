import styled, { keyframes, css } from 'styled-components'


export const AppContainer = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: auto;
    gap: 1px;
    margin-left: 5.1rem;
    transition: 250ms;
    padding-left: ${props => props.isExpanded ? '15rem' : '1px'}
`
export const PrimaryContainer = styled.div`
    width: 100%;
    height: 100%;
    z-index: 5;
    margin: 0;
    padding-bottom: .5rem;
    padding-top: .5rem;
    display: flex;
    flex-direction: column;
    gap: 2px;
`


export const NavigatorContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-rows: auto;
    gap: 2px;
`
export const NavContainer = styled.div`
    height: 100%;
    width: 100%;

    background-color: var(--header-color);
    box-shadow: 0px 1px 3px 0 rgba(0,0,0,.1);
    z-index: 20;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`
export const NavSection = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`


export const TableDetailContainer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 5px;
`
