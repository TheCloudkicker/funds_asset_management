import styled, { keyframes, css } from 'styled-components'

export const TextPrimary = styled.div`
    font-weight: 700;
    color: var(--text-secondary);
`

export const TextSecondary = styled.div`
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-secondary);
`

export const LpEntity = styled.div`
    width: 150px;
    height: 100px;
    cursor: pointer;
    background-color: #8888e8;
    clip-path: polygon(50% 0, 0 100%, 100% 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 4rem;

    &:hover{
        background-color: #5a5ac2
    }
`
export const CorpEntity = styled.div`
    width: 150px;
    height: 100px;
    border: 2px solid deepskyblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover{
        background-color: deepskyblue
    }
`

export const LtdEntity = styled.div`
    width: 150px;
    height: 100px;
    border: 2px dashed deeppink;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover{
        background - color: deeppink;
        border: 2px dashed black;
    }
`

export const LlcEntity = styled.div`
    width: 150px;
    height: 100px;
    border: 2px dotted teal;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover{
        background-color: teal;
        border: 2px dotted black;
    }
`
export const EntityWrapper = styled.div`
    height: 100px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`
export const LevelContainer = styled.div`
    height: 25rem;
    width: 100%;
    display: grid;
    grid-template-columns: 10rem auto;
    border-bottom: 1px solid rgba(169, 169, 169, 0.322);
`

export const MainVisualContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: calc(100vh - 10rem);
    position: relative;
`
export const SvgContainer = styled.div`
    position: absolute;
    height:200%;
    width: 100%;
`
export const LevelNameContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const LevelText = styled.div`
    font-size: 1.5rem;
    color: var(--text-secondary);
`


export const LevelMain = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 1rem;
`

export const OwnershipText = styled.svg`
    text {
        font-style: normal;
        font: bold 20px; 
        fill: white;
        stroke: white
    }    
 
`