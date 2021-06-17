import React, { useState, useRef, useEffect } from 'react'
import Entity from './Entity'
import { useSelector, useDispatch } from 'react-redux'
import { calculateNavigatorLines, adjustNavigatorLines, getStructure } from '../../../store/actions/navigator'
import FundSelector from './FundSelector'
import {
    LevelContainer, MainVisualContainer, SvgContainer,
    LevelText, LevelMain, LevelNameContainer
} from './components'
import SVGContainer from './SVGContainer'


const Level = ({ structure, level, levelName }) => {
    return (
        <LevelContainer>
            <LevelNameContainer>
                <LevelText>
                    {levelName}
                </LevelText>
            </LevelNameContainer>

            <LevelMain>

                {structure && structure[level].map(entity =>

                    <Entity key={entity.id} level={level} entity={entity} />

                )}

            </LevelMain>

        </LevelContainer>
    )
}






const VisualContainer = () => {

    const { structure, ownership_lines, ownership_texts } = useSelector(state => state.navigator)
    const { leftNavExpanded } = useSelector(state => state.layout)
    const dispatch = useDispatch()

    useEffect(() => {
        if (structure) {
            setTimeout(() => {
                dispatch(calculateNavigatorLines({ ...structure }))
                console.log("calculating lines")
            }, 500)
        }

    }, [structure])



    return (
        <MainVisualContainer>

            <FundSelector dispatch={dispatch} />
            <SVGContainer ownership_lines={ownership_lines} ownership_texts={ownership_texts} />
            <Level structure={structure} level={'level_1_entities'} levelName="Fund Level" />
            <Level structure={structure} level={'level_2_entities'} levelName="Level 2" />
            <Level structure={structure} level={'level_3_entities'} levelName="Level 3" />

        </MainVisualContainer>
    )
}

export default VisualContainer
