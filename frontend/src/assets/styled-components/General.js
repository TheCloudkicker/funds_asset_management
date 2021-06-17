import styled, { keyframes, css } from 'styled-components'

export const InputWrapper = styled.div`
    height: 100%;
    border: ${props => props.isError ? '2px solid crimson' : '2px solid white'}
`
export const Label = styled.div`
    color: crimson;
    font-size: 1rem;
    font-weight: 700;
`
export const Title = styled.div`
    height: 4rem;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left:1rem;
    font-size:1.8rem;
    font-weight: 700;
    color: var(--text-secondary);
`
export const DividerHorizontal = styled.div`
    width: 100%;
    height: 1px;
    opacity: .5;
    margin-bottom: 5px;
    background-color: var(--text-secondary);

    &:hover{
        background-color:  ${props => props.isHoverable ? 'hsl(0,0%,95%)' : 'none'};
    }
`
export const IconWrapper = styled.div`
    width: 5rem; 
    height: 100%;

    display: flex; 
    justify-content: center; 
    align-items: center;

    cursor: ${props => props.isHoverable ? 'pointer' : 'text'};
    
    &:hover{
        background-color:  ${props => props.isHoverable ? 'hsl(0,0%,95%)' : 'none'};
    }
`

// cursor: ${props => props.isHoverable ? 'pointer' : 'default'};

export const NoResultsContainer = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    color: black;
    align-items: center;
    justify-content: flex-start;
    padding-left: 1rem;
    font-size: 2rem;
    font-weight: 700;

`

export const EditWrapper = styled.div`
    flex: 1;
    display: flex; 
    justify-content: center; 
    align-items: center;
    
    cursor: ${props => props.isHoverable ? 'pointer' : 'default'};

    &:hover{
        background-color: ${props => props.isHoverable ? 'var(--waibe-blue-primary-hover)' : 'none'};
    }

`
export const ButtonWrapper = styled.div`
    background-color: ${props => props.toggles ? 'var(--bg-primary) !important' : 'var(--header-color) !important'};
    color: ${props => props.toggles ? 'var(--text-secondary) !important' : 'white !important'};
    transition:none  !important;
    &:hover{
        background-color: var(--waibe-blue-primary-hover);
    }
`
export const SpinnerWrapper = styled.div`
    height: 100% !important;
    width: 100% !important;
    border: none;
    z-index: 250;
    background-color: var(--bg-tertiary) !important;
`
export const DividerH = styled.div`
    width: 100%;
    height: 1px;
    opacity: .7;
    margin-bottom: 5px;
    background-color: var(--text-secondary);
`
export const Dimmer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 499;
    background-color: rgba(0,0,0,.2)
`