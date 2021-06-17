import React, { useRef, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { DropzoneBtn, DropzoneContainer, DropzoneTextContainer, Text, HiddenInput } from '../../assets/styled-components/Dropzone'
import { Icon } from 'semantic-ui-react'

const Dropzone = ({ onDrop, containerStyles }) => {

    const inputEl = useRef(null);

    const onOpenClick = e => {
        e.stopPropagation()
        inputEl.current.click()
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <DropzoneContainer isDragActive={isDragActive} {...getRootProps()} style={{ ...containerStyles }} >

            <input {...getInputProps()} />

            <DropzoneTextContainer>
                <Text style={{ marginBottom: '3rem' }} >{isDragActive ? 'Upload to Waibe' : 'Drag and Drop to Upload'}</Text>
                <Icon name='cloud upload' size='massive' />
            </DropzoneTextContainer>

            <HiddenInput type='file' onChange={e => onDrop(e.target.files)} ref={inputEl} multiple />

            <DropzoneBtn onClick={onOpenClick}>Browse Files</DropzoneBtn>

        </DropzoneContainer>
    )
}

export default Dropzone