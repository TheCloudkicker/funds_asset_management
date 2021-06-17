import styled, { keyframes, css } from 'styled-components'

export const DropzoneContainer = styled.div`
    position: relative;
    height:100%;
    width: 100%;
    background-color: ${ props => props.isDragActive ? 'rgb(0, 0, 0,.3)' : 'var(--bg-tertiary)'} ;
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border: ${props => props.isDragActive ? '2px dashed white' : 'none'}
`
export const DzContainer = styled.div`
`
export const DropzoneTextContainer = styled.div`
    opacity: .85;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`
export const Text = styled.div`
    width: 100%;
    text-align:center;
    font-size: 3rem;
    font-weight: 600;
    color: var(--text-secondary);
`

export const DzToggle = styled.div`
    height: 5rem;
    width: 5rem;
    background-color:var(--header-color);
    position: absolute;
    right: 1.5rem;
    bottom: 1rem;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 800;
    font-size: 2.2rem;
    box-shadow: 0px 3px 6px 0 rgba(0,0,0,0.2);
    z-index: 500;
    cursor: pointer;

    &:hover{
        background-color:  #373738;
        box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.1);
    }
    &:active{
        background-color:  var(--bg-primary-active);
        box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.05);
    }

`

export const DropzoneBtn = styled.div`
    position: absolute;
    bottom: 2rem;
    margin-top: 0;
    border-radius: 3px;
    height: 5rem;
    width: 50%;
    background-color:  var(--header-color);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 3px 6px 0 rgba(0,0,0,0.2);
    font-size: 3rem;
    font-weight: 600;
    color: white;

    &:hover{
        background-color:  #373738;
        box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.1);
    }
    &:active{
        background-color:  var(--bg-primary-active);
        box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.05);
    }
`
// export const IconWrapper = styled.div`

// `
export const CloudIcon = styled.i`
    opacity: .85;
    color: white;
`

export const HiddenInput = styled.input`
    display: none
`
