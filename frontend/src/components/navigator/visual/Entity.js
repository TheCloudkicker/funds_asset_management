import React, { useRef, useEffect } from 'react'
import { Partnership, Limited, Corp, Company } from './Entities'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setEntityPosition } from '../../../store/actions/navigator'
import { EntityWrapper } from './components'

const Entity = ({ entity, level }) => {

    const entityRef = useRef()
    const dispatch = useDispatch()
    const history = useHistory()

    const renderEntityType = () => {
        switch (entity.legal_type) {
            case 'LP':
                return <Partnership entity_name={entity.name} no_investments={entity.no_investments} id={entity.id} />
            case 'LTD':
                return <Limited entity_name={entity.name} no_investments={entity.no_investments} id={entity.id} />
            case 'CORP':
                return <Corp entity_name={entity.name} no_investments={entity.no_investments} id={entity.id} />
            case 'LLC':
                return <Company entity_name={entity.name} no_investments={entity.no_investments} id={entity.id} />
            default:
                return null
        }
    }


    useEffect(() => {

        if (entityRef.current) {

            let coordinates = [
                entityRef.current.offsetTop,
                entityRef.current.offsetHeight,
                entityRef.current.offsetLeft,
                entityRef.current.offsetWidth
            ]

            dispatch(setEntityPosition(
                level,
                entity.id,
                coordinates,
            ))
        }

    }, [entityRef.current])

    const handleClick = () => {
        console.log('LOC', entityRef.current.offsetTop,
            entityRef.current.offsetHeight,
            entityRef.current.offsetLeft,
            entityRef.current.offsetWidth)
    }

    const handleDoubleClick = () => {
        history.push('/setup/funds/1')
    }


    return (
        <EntityWrapper
            ref={entityRef}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            style={{ alignSelf: entity.audited ? "flex-start" : "center" }}>

            {renderEntityType()}

        </EntityWrapper>
    )


}

export default Entity
