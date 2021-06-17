import React, { useRef, useState, useEffect } from 'react'
import { FixedSizeGrid } from "react-window";
import { numberWithCommas } from '../../../common/helpers'
import { RowItem, HeaderItem } from '../../../../assets/styled-components/Table'

const DataTable = ({ selectedIndex, fundObject, dataTypes, dims }) => {

    const headerGrid = useRef(null)
    const columnWidth = 100;

    const HeaderCell = ({ columnIndex, rowIndex, style }) => {
        return (
            <HeaderItem style={style}>
                {selectedIndex && fundObject.uploaded_reports[selectedIndex - 1].data.headers[columnIndex].original}
            </HeaderItem>
        )
    }


    const Cell = ({ columnIndex, rowIndex, style }) => {

        if (!selectedIndex) {
            return null
        }

        let isNumber = dataTypes[Object.keys(dataTypes)[columnIndex]]


        const myStyles = {
            ...style,
            justifyContent: `${isNumber ? 'flex-end' : 'flex-start'}`
        }



        return (
            <RowItem style={myStyles}>
                {isNumber ? `${numberWithCommas(selectedIndex && fundObject.uploaded_reports[selectedIndex - 1].data.items[rowIndex][Object.keys(fundObject.uploaded_reports[selectedIndex - 1].data.items[rowIndex])[columnIndex]])}` : `${selectedIndex && fundObject.uploaded_reports[selectedIndex - 1].data.items[rowIndex][Object.keys(fundObject.uploaded_reports[selectedIndex - 1].data.items[rowIndex])[columnIndex]]}`}
            </RowItem>
        )
    }
    return (
        <>
            <FixedSizeGrid
                columnCount={selectedIndex ? fundObject.uploaded_reports[selectedIndex - 1].data.headers.length : 0}
                rowCount={1}
                columnWidth={columnWidth}
                rowHeight={38}
                height={38}
                width={dims.tableWidth}
                ref={headerGrid}
                style={{
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    zIndex: 15,
                    backgroundColor: 'var(--bg-tertiary)',
                    boxShadow: '0 2px 5px 2px rgba(0,0,0,.1)',
                }}
            >
                {HeaderCell}
            </FixedSizeGrid>

            <FixedSizeGrid
                columnCount={selectedIndex ? fundObject.uploaded_reports[selectedIndex - 1].data.headers.length : 0}
                rowCount={selectedIndex ? fundObject.uploaded_reports[selectedIndex - 1].data.items.length : 0}
                columnWidth={columnWidth}
                rowHeight={40}
                height={dims.tableHeight}
                width={dims.tableWidth}
                onScroll={({ scrollLeft }) =>
                    headerGrid.current.scrollTo({ scrollLeft })
                }
            >
                {Cell}
            </FixedSizeGrid>
        </>

    )
}

export default DataTable
