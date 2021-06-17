import React from 'react'
import { Loader, Dimmer } from 'semantic-ui-react'
import { SpinnerWrapper } from '../../assets/styled-components/General'

export const SpinnerFull = ({ inverted }) => (
    <Dimmer active inverted={inverted}>
        <Loader size="huge" content={"Accessing Waibe..."} />
    </Dimmer>
)

const Spinner = ({ loadingText, inverted }) => {
    return (
        <SpinnerWrapper className="ui segment" style={{ border: 'none', boxShadow: '0 0 0 0' }}>
            <div className={"ui active dimmer " + (inverted ? 'inverted' : '')}  >
                <div className="ui huge text loader">{loadingText}</div>
            </div>
        </SpinnerWrapper>
    )
}

export default Spinner
