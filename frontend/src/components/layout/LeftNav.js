import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toggleSideNav, lockLeftNav, toggleDateVisible, updateAppView } from '../../store/actions/layout'
import { useHistory } from "react-router-dom";
import { SideNavSection, SideNavHover, SideNavContainer, NavListItem, SideNavSectionTop, LogoIcon, LogoWrapper } from '../../assets/styled-components/SideNav'
import styled, { keyframes, css } from 'styled-components'
import { Label } from 'semantic-ui-react'

const LinkContainer = styled.div`
    height:5rem;
    cursor: pointer;
    width: 100%;
    position: relative;
    display:flex;
    background-color: ${props => props.isActive ? 'var(--waibe-blue-primary)' : 'none'};

    &:hover{
        background-color:  ${props => props.isActive ? 'var(--waibe-blue-primary)' : '#3b3c3d'};
    }
`
const IconWrapper = styled.div`
    height:100%;
    max-width:4rem;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    padding-left:15px;
    padding-bottom: 3px;
    align-items: center;
    
`
const AppNameContainer = styled.div`
    height: 100%;
    flex: 1;
    display:flex;
    justify-content:flex-start;
    padding-left: 2rem;
    align-items:center;
    color: white;
    font-size: 1.4rem;
    font-weight: 600;
`

const NavItem = ({ title, onClick, mainIcon, isActive, isExpanded, label = null }) => {

    return (
        <LinkContainer isActive={isActive} onClick={() => onClick(title)}>
            {label ? <Label color='grey' floating>{label}</Label> : null}
            <IconWrapper>
                {mainIcon}
            </IconWrapper>

            {isExpanded ? <AppNameContainer>{title}</AppNameContainer> : null}


        </LinkContainer>
    )
}


const LeftNav = ({ dispatch }) => {

    const history = useHistory()
    const { app, leftNavLocked, leftNavExpanded, dateVisible } = useSelector(state => state.layout)
    const recycle = useSelector(state => state.recycle)
    const reports = useSelector(state => state.reports)
    const uploads = useSelector(state => state.uploads)
    const funds = useSelector(state => state.funds)

    const onNavClick = appName => {

        let appNameLower = appName.toLowerCase().replace(" ", "");

        if (appNameLower === 'setup') {
            history.push(`/${appNameLower}/funds`)
            dispatch(updateAppView(appName, 'funds'))
        } else {
            history.push(`/${appNameLower}`)
            dispatch(updateAppView(appName, null))
        }


    }

    const openSideNav = () => {
        if (!leftNavLocked) {
            dispatch(toggleSideNav(true))
        }
    }

    const closeSideNav = () => {
        if (!leftNavLocked) {
            dispatch(toggleSideNav(false))
            dispatch(toggleDateVisible(false))
        }
    }

    const onLock = isLocked => dispatch(lockLeftNav(isLocked))
    const onClientClick = () => dispatch(toggleDateVisible(!dateVisible))


    return (
        <>
            <SideNavHover style={leftNavExpanded ? { display: 'none' } : null} onMouseEnter={openSideNav} />
            <SideNavContainer isExpanded={leftNavLocked || leftNavExpanded} onMouseLeave={closeSideNav} >

                <SideNavSectionTop>
                    <LinkContainer isActive={false}>
                        <IconWrapper onClick={() => onLock(!leftNavLocked)}>
                            {leftNavLocked ? <i className={"lock icon icon large inverted"} ></i> : <i className={"bars icon icon large inverted"} ></i>}
                        </IconWrapper>

                        {leftNavExpanded ? <AppNameContainer onClick={() => onNavClick('Waibe')} style={{ color: 'var(--waibe-blue-primary)', fontSize: '2rem' }}>Waibe</AppNameContainer> : null}


                    </LinkContainer>


                    <NavItem onClick={onNavClick} isExpanded={leftNavExpanded} isActive={false} title="Client" mainIcon={<i className={"circle icon large inverted"} ></i>} />
                    <NavItem onClick={onNavClick} isExpanded={leftNavExpanded} isActive={app === "Calendar"} title="Calendar" mainIcon={<i className={"calendar alternate icon large inverted"}></i>} />
                    <NavItem onClick={onNavClick} label={uploads.fileTables[0].files.length} isExpanded={leftNavExpanded} isActive={app === "Uploads"} title="Uploads" mainIcon={<i className="cloud upload icon large inverted "></i>} />
                    <NavItem onClick={onNavClick} isExpanded={leftNavExpanded} isActive={app === "Repository"} title="Repository" mainIcon={<i className="folder open icon large inverted "></i>} />
                    <NavItem onClick={onNavClick} label={reports.reports.length} isExpanded={leftNavExpanded} isActive={app === "Reports"} title="Reports" mainIcon={<i className="table icon large inverted "></i>} />
                    <NavItem onClick={onNavClick} isExpanded={leftNavExpanded} isActive={app === "Testing"} title="Testing" mainIcon={<i className="briefcase icon large inverted "></i>} />
                    <NavItem onClick={onNavClick} isExpanded={leftNavExpanded} isActive={app === "FS"} title="FS" mainIcon={<i className="th list open icon large inverted "></i>} />
                    <NavItem onClick={onNavClick} isExpanded={leftNavExpanded} isActive={app === "Navigator"} title="Navigator" mainIcon={<i className="sitemap icon large inverted "></i>} />
                </SideNavSectionTop>

                <SideNavSection>
                    <NavItem onClick={onNavClick} label={`${funds.funds.length}`} isExpanded={leftNavExpanded} isActive={app === "Setup"} title="Setup" mainIcon={<i className="cogs icon large inverted "></i>} />


                    <NavItem onClick={onNavClick} label={recycle.recycled_items.length} isExpanded={leftNavExpanded} isActive={app === "Recycle Bin"} title="Recycle Bin" mainIcon={<i className="recycle icon large inverted "></i>} />
                </SideNavSection>

            </SideNavContainer>
        </>
    )
}

export default LeftNav
