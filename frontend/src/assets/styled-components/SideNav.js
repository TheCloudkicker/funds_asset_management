import styled, { keyframes, css } from 'styled-components'

export const SideNavSection = styled.div`
    flex:1;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: flex-end;
`

export const SideNavSectionTop = styled.div`
    flex:1;
    width: 100%;
`
export const SideNavHover = styled.div`
    position: fixed;
    top:0;
    left: 0;
    right: auto;
    bottom:auto;
    height: 100%;
    z-index: 350;
    width: 5rem;
`
export const NavListItem = styled.li`
    list-style: none;
    width: 100%;
    padding-left:8px;
`
export const SideNavContainer = styled.div`
    position: fixed;
    top:0;
    height: 100vh;
    bottom:auto;
    left: 0;
    right: auto;
    z-index: 100;
    padding-bottom: 1rem;
    background-color: var(--bg-sidenav);
    width: ${props => props.isExpanded ? '20rem' : '5rem'};
    transition: 250ms;
    list-style: none;
    padding-left: 0;
    padding-right: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    box-shadow: 1px 1px 3px 0 rgba(0,0,0,.1);
    transition: 250ms;
`
export const LogoIcon = styled.i`
    color: var(--waibe-blue-primary) !important;
    
`
export const LogoWrapper = styled.div`
    display:flex;
    padding-left: ${props => props.isExpanded ? '1.8rem' : '3px'} ;
    justify-content: ${props => props.isExpanded ? 'flex-start' : 'center'};
    align-items: center;
    cursor: pointer;
    height: 4rem;
`