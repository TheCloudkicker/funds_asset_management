import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TableWrapper, TableMain, TableRow, RowWrapper, LeftRow, RightRow } from '../../../../assets/styled-components/Table'
import { capitalizeFirstLetter, numberWithCommas, formatName } from '../../../common/helpers'
import Header from '../../../table/Header'
import Footer from '../../../table/Footer'
import { NestededContainer } from '../../../table/ExpandableRow'

const Investments = ({ supportIndex, name, onChange }) => {

    const { supportDetails } = useSelector(state => state.carry)

    return (
        <TableWrapper style={{ height: '100%' }} >
            <Header hasShadow={false} description={`${capitalizeFirstLetter(name)} investment activity breakout`} />

            <TableMain>

                {supportDetails[supportIndex].activity_types.map((activity_type, typeIndex) => {

                    return (
                        <NestededContainer
                            obj={activity_type}
                            key={typeIndex}
                            sourceType='hld'
                            onChange={(indexArry, key, value) => onChange([supportIndex, ...indexArry, typeIndex, 'activity_types'], key, value)} />
                    )
                })}

                <Footer
                    description={`Total ${capitalizeFirstLetter(name)} Investment Activity`}
                    value={supportDetails[supportIndex].total} />

            </TableMain>

        </TableWrapper>
    )
}

export default Investments

