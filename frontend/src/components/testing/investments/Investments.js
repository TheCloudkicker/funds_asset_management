import React from 'react'
import { Container, Side, MainContainer } from './components'
import Table from './table/Table'
import { useSelector } from 'react-redux'

const Investments = ({ dispatch, isDark }) => {

    const { invSidePanel, isLoading } = useSelector(state => state.investments)

    const renderSide = () => {
        switch (invSidePanel) {
            case 'comments':
                return <h1 style={{ color: 'white' }}>Comments</h1>
            case 'supports':
                return <h1 style={{ color: 'white' }}>Supports</h1>
            case 'charts':
                return <h1 style={{ color: 'white' }}>Charts</h1>
            default:
                return <h1 style={{ color: 'white' }}>Nothing Selected</h1>
        }
    }

    return (


        <MainContainer>
            <Table dispatch={dispatch} isDark={isDark} />
            <Side>{renderSide()}</Side>
        </MainContainer>

    )
}

export default Investments
