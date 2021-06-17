import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Dimmer } from '../../../assets/styled-components/General'
import { Dropdown } from 'semantic-ui-react'


const HeaderButton = ({ options, btnText, value, styles }) => {

    const [isOpen, setIsOpen] = useState(false)

    return (

        <Dropdown text={btnText} value={value} style={{ color: 'white', minWidth: '10rem', marginLeft: '1rem', ...styles }}>
            <Dropdown.Menu>
                {options.map((option, index) =>

                    <Dropdown.Item key={index} text={option.name} description='ctrl + o' onClick={option.onClick} icon={option.icon} />
                )}

            </Dropdown.Menu>
        </Dropdown>


    )
}

export default HeaderButton;
