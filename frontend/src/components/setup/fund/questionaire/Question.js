import React, { useState, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { updateQuestionaire } from '../../../../store/actions/testing/testing'

import FormInput from '../../../common/FormInput'
import Select from 'react-select'
import { customStyles3 } from '../../../../assets/styles/select'

const QuestionWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid var(--bg-tertiary-hover);
    display: flex;
    flex-direction: column;
`
const QuestionMain = styled.div`
    width: 100%;
    height: 8rem;
    display: grid;
    grid-template-columns: 8rem auto 32rem;
    border-bottom: ${props => props.open ? '1px solid var(--bg-tertiary-hover)' : 'none'};
    box-shadow: ${props => props.open ? '0 2px 5px 0px rgba(0,0,0,.2)' : 'none'};
    z-index: 50;
`
const SubQuestionContainer = styled.div`
    width: 100%;
    height: 8rem;
    display: grid;
    grid-template-columns: 5rem auto 32rem;
    background-color: var(--bg-tertiary-hover);
    z-index: 49;
`
const ToggleContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    cursor: ${props => props.isHoverable ? 'pointer' : 'default'};
    &:hover{
        background-color: ${props => props.isHoverable ? 'var(--bg-tertiary-hover)' : 'none'};
    }
`
const TextContainer = styled.div`
    flex: 1;
    height: 100%;
    color:var(--text-secondary);
    display:flex;
    align-items: center;
    padding-left: 1rem;
    font-weight: 600;
    font-size: 1.2rem;
    padding-right: 1rem;
`
const SubTextContainer = styled.div`
    flex: 1;
    height: 100%;
    color:var(--text-secondary);
    display:flex;
    grid-area: 1 / 2 / span 1 / span 1;
    align-items: center;
    font-weight: 600;
    font-size: 1.2rem;
    padding-left: 3rem;
    padding-right: 1rem;
`
const AnswerContainer = styled.div`
    display: flex;
    grid-area: 1 / 3 / span 1 / span 1;
`
const ChoiceWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:center;
`
const RadioWrapper = styled.div`
    flex:1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--text-secondary);
    font-size: 1.2rem;
    font-weight: 600;

    background-color: ${props => props.isSelected ? 'var(--bg-tertiary-hover)' : 'none'};

    &:hover{
        background-color: ${props => props.isSelected ? 'var(--bg-tertiary-hover)' : 'var(--bg-secondary)'};
    }
`


const BooleanForm = ({ question, onBoolChange }) => {


    return (
        <>
            <RadioWrapper isSelected={question.current} onClick={() => onBoolChange(question.questionNo, true)} >
                Yes
            </RadioWrapper>
            <RadioWrapper isSelected={!question.current} onClick={() => onBoolChange(question.questionNo, false)}>
                No
            </RadioWrapper>
            <RadioWrapper style={{ width: '16rem', flex: 'none' }} isSelected={false}>
                Confirm
            </RadioWrapper>
        </>
    )
}
const ChoiceForm = ({ question, options, onChoiceChange }) => {

    return (
        <ChoiceWrapper style={{ paddingRight: 10 }} >
            <Select
                options={options} isMulti={question.isMulti} styles={customStyles3}
                onChange={choice => onChoiceChange(question.questionNo, choice)} value={question.current}
                placeholder='select...' />
        </ChoiceWrapper>
    )
}
const InputForm = ({ question, onInputChange }) => {

    return (
        <ChoiceWrapper style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }} >
            <FormInput
                styles={{ height: '100%' }}
                value={question.current}
                unsaved_changes={question.unsaved_changes}
                onChange={value => onInputChange(question.questionNo, value)} />
        </ChoiceWrapper>
    )
}

const Question = ({ question, isDark, dispatch }) => {

    const [open, setOpen] = useState(false)
    const [answers, setAnswers] = useState({
        main: false
    })
    const onRadioClick = bool => {
        setAnswers(prevState => {
            return { ...prevState, main: bool }
        })
    }

    const handleClick = () => {
        if (question.subquestions.length > 0) {
            dispatch(updateQuestionaire(question.questionNo, 'isOpen', !question.isOpen))
        }
    }

    const renderIcon = () => {
        if (question.isOpen) {
            return <i className={"minus square outline icon large " + (isDark ? "inverted" : "")}></i>
        } else {
            return <i className={"plus square outline icon large " + (isDark ? "inverted" : "")}></i>
        }
    }
    const handleChange = (q, value) => {
        dispatch(updateQuestionaire(question.questionNo, 'isOpen', !question.isOpen))
    }

    const onBoolChange = (questionsNo, isTrue) => {
        dispatch(updateQuestionaire(questionsNo, null, isTrue))
    }

    const onChoiceChange = (questionsNo, choice) => {
        dispatch(updateQuestionaire(questionsNo, null, choice))
    }

    const onInputChange = (questionsNo, value) => {
        dispatch(updateQuestionaire(questionsNo, null, value))
    }

    const renderForm = (questionObj, questionLevel) => {

        switch (questionObj.type) {
            case 'BOOL':
                return <BooleanForm question={questionObj} questionLevel={questionLevel} onBoolChange={onBoolChange} />
            case 'CHOICES':
                return <ChoiceForm question={questionObj} options={questionObj.options} questionLevel={questionLevel} onChoiceChange={onChoiceChange} />
            case 'INPUT':
                return <InputForm question={questionObj} questionLevel={questionLevel} onInputChange={onInputChange} />
            default:
                return null
        }
    }

    const subquestions = question.subquestions.map(subQuestion =>

        <SubQuestionContainer>
            <SubTextContainer>
                {subQuestion.questionNo}: {subQuestion.text}
            </SubTextContainer>
            <AnswerContainer>
                {renderForm(subQuestion, 'sub')}
            </AnswerContainer>
        </SubQuestionContainer>

    )

    return (
        <QuestionWrapper>
            <QuestionMain open={question.isOpen}>

                <ToggleContainer isHoverable={question.subquestions.length > 0} onClick={() => handleClick()}>
                    {question.subquestions.length > 0 ? renderIcon() : null}
                </ToggleContainer>

                <TextContainer>
                    {question.questionNo}: {question.text}
                </TextContainer>

                <AnswerContainer>
                    {renderForm(question, 'main')}
                </AnswerContainer>

            </QuestionMain>

            {question.isOpen ? subquestions : null}


        </QuestionWrapper>
    )
}



export default Question
