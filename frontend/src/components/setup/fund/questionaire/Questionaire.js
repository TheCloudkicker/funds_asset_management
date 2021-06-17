import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled, { keyframes, css } from 'styled-components'
import { getPosition } from '../../../common/helpers'
import { getQuestionaire, updateQuestionaire } from '../../../../store/actions/testing/testing'
import { useSelector, useDispatch } from 'react-redux'
import Question from './Question'



const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;

    justify-content: center;
    align-items: center;
    height: 4rem;
`
const HeaderLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
const HeaderRight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 1rem;
`
const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    height: 2.5rem;
`
const Button = styled.button`
    &:hover{
        background-color: var(--waibe-blue-primary-hover);
    }
    &:active{
        background-color: var(--waibe-blue-primary);
    }
`
const HeaderText = styled.div`
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    color: var(--text-secondary)
`
const QuestionaireContainer = styled.div`
    border-radius: 3px;
    display: flex;
    flex-direction: column;
`


const QuestionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex:1;
    overflow-y:scroll;
`


const Questionaire = ({ isDark }) => {

    const [lpaVisible, setLpaVisible] = useState(false)
    const dispatch = useDispatch()
    const footerRef = useRef(null)
    const history = useHistory()
    const isEditable = true

    const onBtnClick = () => {
        // getDistanceFromBody()
        setLpaVisible(!lpaVisible)
    }

    const [footerDims, setFooterDims] = useState({
        offsetWidth: 0,
        offsetHeight: 0,
        left: 0,
        top: 0,
        finalHeight: 0
    })

    useEffect(() => {
        dispatch(getQuestionaire(1))
    }, [])

    const getDistanceFromBody = () => {
        let dist = getPosition(footerRef.current)

        setFooterDims({
            width: footerRef.current.offsetWidth,
            height: footerRef.current.offsetHeight,
            left: dist.x,
            top: dist.y,
            finalHeight: footerRef.current.offsetHeight + dist.y - 150
        })
    }

    // useEffect(() => {
    //     getDistanceFromBody()
    // }, [])

    const pulse = keyframes`
        0% {
            top: ${footerDims.top}px;
            height: ${footerDims.height}px;
            width: ${footerDims.width}px;
        }
        70% {
            top: 135px;
            height: ${footerDims.finalHeight + 15}px;
            width: ${footerDims.width + 215}px;
        }

        100% {
            top: 150px;
            height: ${footerDims.finalHeight}px;
            width: ${footerDims.width + 200}px;
        }
    `

    const animation = props =>
        css`
    ${pulse} 750ms 200ms forwards;
  `
    const ExpandingFooter = styled.div`
        position: fixed;
        background-color: var(--bg-tertiary);
        border: 1px solid var(--waibe-blue-primary);
        height:  ${props => props.footerDims.height}px;
        width: ${props => props.footerDims.width}px;
        top: ${props => props.footerDims.top}px;
        left: ${props => props.footerDims.left}px;
        z-index: 500;
        animation: ${animation};
    }`



    const { questionaire, allExpanded, allColapased } = useSelector(state => state.testing)

    const handleExpandColapseAll = bool => {
        for (var i = 0; i < questionaire.questions.length; i++) {
            if (questionaire.questions[i].subquestions.length > 0) {
                dispatch(updateQuestionaire(questionaire.questions[i].questionNo, 'isOpen', bool))
            }

        }
    }

    const handleNavigate = fundID => {
        history.push(`/setup/funds/${fundID}/carry`)
    }



    return (
        <QuestionaireContainer style={{ height: '100%' }}>
            <Header>
                <HeaderLeft >
                    <ButtonsWrapper style={{ margin: '1rem' }}>

                        <Button
                            style={{ width: '8rem', boxShadow: '0px 2px 5px 0 rgba(0,0,0,.3)' }}
                            className={"ui icon button secondary " + (allExpanded ? "disabled" : "")}
                            onClick={() => handleExpandColapseAll(true)} >Expand All</Button>

                        <Button
                            style={{ marginLeft: 5, width: '8rem', boxShadow: '0px 2px 5px 0 rgba(0,0,0,.3)' }}
                            className={"ui icon button secondary " + (allColapased ? "disabled" : "")}
                            onClick={() => handleExpandColapseAll(false)} >Colapse All</Button>

                    </ButtonsWrapper>

                </HeaderLeft>

                <HeaderText>Carried Interest Questionaire</HeaderText>

                <HeaderRight>
                    <ButtonsWrapper style={{ margin: '1rem' }}>
                        {isEditable ? null :
                            <Button
                                style={{ marginLeft: 5, boxShadow: '0px 2px 5px 0 rgba(0,0,0,.3)' }}
                                className={"ui icon button secondary "}
                                onClick={() => handleNavigate(1)} >To Setup</Button>

                        }
                    </ButtonsWrapper>
                </HeaderRight>

            </Header>

            <QuestionsContainer style={{ maxHeight: '82vh' }}>

                {questionaire.questions.map(question =>

                    <Question dispatch={dispatch} question={question} key={question.id} isDark={isDark} />

                )}

            </QuestionsContainer>


        </QuestionaireContainer>
    )
}

export default Questionaire
