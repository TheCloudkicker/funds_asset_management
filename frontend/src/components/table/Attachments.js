import React from 'react'
import { Caption } from '../../assets/styled-components/Carry'
import { IconWrapper } from '../../assets/styled-components/General'
import { numberWithCommas } from '../common/helpers'
import { InputForm } from '../common/FormInput'
import styled, { keyframes, css } from 'styled-components'
import Header from './Header'
import { TableMain, TableWrapper } from '../../assets/styled-components/Table'



const Attachments = ({ attachments, onChange }) => {

    return (
        <TableWrapper>
            <Header description={'File Name'} unique="selector" />
            <TableMain>
                {attachments.map((attachment, attachIndex) =>

                    <div style={{ width: '100%', minHeight: '2.5rem', display: 'flex' }}>

                        <Caption style={{ minWidth: '25%', maxWidth: '25%' }}>
                            {attachment.editable ?
                                <input type="file" onChange={e => onChange(attachment.id, 'name', e.target.value)} /> :
                                <a target="_blank" href={attachment.url}>{attachment.name}</a>
                            }
                        </Caption>

                        <InputForm obj={attachment} onChange={OnChange} />

                        <Caption>{attachment.dateUploaded}</Caption>

                        <Caption>{attachment.uploadedBy}</Caption>

                        <div style={{ width: '20%', display: 'flex' }}>

                            <IconWrapper style={{ minHeight: '2.5rem', flex: 1, marginRight: '5rem' }} isHoverable={true} onClick={() => onChange(null, 'save', attachment)}>
                                <i className="save icon"></i>
                            </IconWrapper>

                            <IconWrapper style={{ minHeight: '2.5rem', flex: 1, marginRight: '5rem' }} isHoverable={true} onClick={() => onChange(attachment.id, 'delete', null)}>
                                <i className="trash icon"></i>
                            </IconWrapper>

                            <IconWrapper style={{ minHeight: '2.5rem', flex: 1, marginRight: '5rem' }} isHoverable={true} onClick={() => onChange(attachment.id, 'editable', !attachment.editable)}>
                                <i className="edit icon"></i>
                            </IconWrapper>

                        </div>

                    </div>

                )}
            </TableMain>

        </TableWrapper>

    )
}


export default Attachments
