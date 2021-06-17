import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import { NavContainer, NavSection, DateWrapper } from '../../../assets/styled-components/Containers'
import { ButtonWrapper } from '../../../assets/styled-components/General'
import { Dropdown, Menu, Select } from 'semantic-ui-react'


import { setSelectedPeriod } from '../../../store/actions/periods'
import { changeSelectedFund } from '../../../store/actions/funds/funds'
import { useSelector } from 'react-redux'
import HeaderButton from './HeaderButton'

import { exportRouter } from './exportRouter'
import { addRouter } from './addRouter'
import { editRouter } from './editRouter'
import { viewRouter } from './viewRouter'
import { uploadRouter } from './uploadRouter'
import { useHistory } from 'react-router-dom'

const SetupHeaderRight = () => {

    const history = useHistory()

    const handleClick = subSection => {
        history.push(`/setup/${subSection}`)
    }

    return (
        <Menu inverted secondary style={{ marginTop: 8 }}>

            <Menu.Item
                name='Funds'
                style={{ minWidth: '8rem' }}
                active={false}
                onClick={() => handleClick('funds')}
            />
            <Menu.Item
                name='Team'
                style={{ minWidth: '8rem' }}
                active={false}
                onClick={() => handleClick('team')}
            />
            <Menu.Item
                name='Allocations'
                style={{ minWidth: '8rem' }}
                active={false}
                onClick={() => handleClick('allocations')}
            />
            <Menu.Item
                name='Database'
                style={{ minWidth: '8rem' }}
                active={false}
                onClick={() => handleClick('database')}
            />
            <Menu.Item
                name='Repository'
                style={{ minWidth: '8rem' }}
                active={false}
                onClick={() => handleClick('repository')}
            />
            <Menu.Item
                name='Settings'
                style={{ minWidth: '8rem' }}
                active={false}
                onClick={() => handleClick('secondary')}
            />

        </Menu>
    )
}



const MainHeader = ({ dispatch, isDark }) => {

    const [all, setAll] = useState(true)

    const { periods, selectedPeriod } = useSelector(state => state.periods)
    const testing = useSelector(state => state.testing)
    const { currentUser } = useSelector(state => state.user)
    const funds = useSelector(state => state.funds)
    const layout = useSelector(state => state.layout)
    const capital = useSelector(state => state.capital)
    const uploads = useSelector(state => state.uploads)
    const carry = useSelector(state => state.carry)

    const renderFundSelector = () => {
        if (layout.app === 'Testing' || layout.app === 'Setup') {
            return (
                <Dropdown search text={funds.selectedFund ? funds.selectedFund.label : 'Fund'} style={{ color: 'white', maxWidth: '30rem', marginLeft: '2rem', cursor: 'pointer' }}  >
                    <Dropdown.Menu >
                        {funds.funds.map((fund, index) =>
                            <Dropdown.Item key={index} onClick={() => dispatch(changeSelectedFund(fund))} text={fund.label} />
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            )
        } else {
            return null
        }


    }


    return (
        <NavContainer>

            <NavSection style={{ width: '35%', borderRight: '1px solid rgba(255,255,255, .3)' }}>
                <ButtonWrapper className="ui vertical button" tabIndex="0" style={{ cursor: 'default' }} >
                    <div className={"ui checkbox inverted"}>
                        <input type="checkbox" name="example" />
                        <label></label>
                    </div>
                </ButtonWrapper>
                <HeaderButton options={addRouter(layout, dispatch, selectedPeriod, carry, currentUser, funds, capital)} btnText='Add' />
                <HeaderButton options={viewRouter(layout, dispatch)} btnText='Settings' />
                {layout.app === 'Uploads' ?
                    <HeaderButton options={uploadRouter(layout, dispatch, selectedPeriod, currentUser, funds, uploads)} btnText='Upload' />
                    :
                    <HeaderButton options={editRouter(layout, dispatch, selectedPeriod, carry, currentUser, funds, capital)} btnText='Unlock/Lock' />
                }
                <HeaderButton styles={{ marginLeft: '3rem' }} options={exportRouter(layout, dispatch, selectedPeriod, testing, currentUser, funds)} btnText='Export' />

            </NavSection>

            <NavSection style={{ alignItems: 'center', width: '65%' }}>

                {/* <Select style={{ minWidth: '30rem' }} placeholder='Fund' onChange={(e, data) => console.log('e', e, data)} options={funds.funds.map(fund => {
                    return { ...fund, key: fund.value, text: fund.label, label: null }
                })} /> */}
                {renderFundSelector()}


                <Dropdown text={selectedPeriod ? selectedPeriod.label : 'Period'} style={{ color: 'white', marginRight: '2rem', marginLeft: 'auto' }} >
                    <Dropdown.Menu  >
                        {periods.map((period, index) =>
                            <Dropdown.Item key={index} onClick={() => dispatch(setSelectedPeriod(period))} text={period.label} />
                        )}
                    </Dropdown.Menu>
                </Dropdown>

            </NavSection>

        </NavContainer>

    )
}

export default MainHeader


