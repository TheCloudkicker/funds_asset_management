import React from 'react'
import { Icon, Loader } from 'semantic-ui-react'
import styled, { keyframes, css } from 'styled-components'

export const SuccessIcon = styled.div`
    height: 75%;
    width: 75%;
    background-color: var(--success-color);
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 50%;
    animation: statusEntrance 300ms ease-out;
    animation-fill-mode: backwards;
`
export const FailIcon = styled.div`
    height: 75%;
    width: 75%;
    background-color: var(--fail-color);
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 50%;
    animation: statusEntrance 300ms ease-out;
    animation-fill-mode: backwards;
`

export const UploadIcon = styled.i`
    flex: 1;
    color: var(--icon-color-primary);
    opacity: .75 !important ;
    height: 100%;
`



export const CloudIcon = styled.i`
    opacity: .85;
    position: absolute;
    top: 5rem;
    transform: translateX(-50%);
`

export const FileTypeIcon = ({ fileExtension, isDark }) => {
    switch (fileExtension) {
        case 'XLSX':
        case 'XLS':
            return <UploadIcon className="file excel icon large" />
        case 'WORD':
            return <UploadIcon className="file word icon large" />
        case 'TEXT':
            return <UploadIcon className="file outline icon large" />
        case 'XML':
            return <UploadIcon className="file outline icon large" />
        case 'PDF':
            return <UploadIcon className="file pdf icon large" />
        default:
            return <UploadIcon className="question icon large" />
    }
}
export const FileTypeIcon2 = ({ extension, isDark }) => {
    switch (extension) {
        case 'XLSX':
        case 'XLS':
            return <Icon name='file excel' size='big' />
        case 'WORD':
            return <Icon name='file word' size='big' />
        case 'TEXT':
            return <Icon name='file outline' size='big' />
        case 'XML':
            return <Icon name='file outline' size='big' />
        case 'PDF':
            return <Icon name='file pdf' size='big' />
        default:
            return <Icon name='question circle' size='big' />
    }
}
export const StatusIcon2 = ({ status }) => {
    switch (status) {
        case 'SUCCESS':
            return <Icon name='check circle' size='big' color='teal' />
        case 'FAIL':
            return <Icon name='circle' size='big' color='red' />
        case 'NEED INFO':
            return <Icon name='question circle' size='big' color='violet' />
        case 'PROCESSING':
            return <Loader active inline />
        default:
            return null
    }
}


export const StatusIcon = ({ status }) => {
    switch (status) {
        case 'SUCCESS':
            return <SuccessIcon />
        case 'FAIL':
            return <FailIcon />
        case 'PROCESSING':
            return (
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            )
        default:
            return null
    }
}

