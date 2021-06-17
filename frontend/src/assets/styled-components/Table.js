import styled, { keyframes, css } from 'styled-components'

export const RowWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
export const TableWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 4rem auto;
`
export const TableHeader = styled.div`
    width: 100%;
    display:flex;
    align-items:center;
    z-index: 5;
    box-shadow: ${props => props.hasShadow ? '-1px 2px 5px 2px rgba(0,0,0,.1)' : 'none'};
`
export const TableMain = styled.div`
    display:flex;
    flex-direction: column;
`
export const TableRow = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    cursor: ${props => props.isHoverable ? 'pointer' : 'text'};
    align-items: center;
    background-color: ${props => props.isSelected ? 'hsl(0,0%,80%)' : 'none'};

    &:hover{
        background-color:  ${props => props.isHoverable ? 'hsl(0,0%,95%)' : 'none'};
    }
`
export const RowItem = styled.div`
    height: 100%;
    width: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 1.5rem;
    color: var(--text-secondary);
`
export const HeaderItem = styled.div`
    height: 100%;
    width: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1.3rem;
    color: var(--text-secondary);
`

export const LeftRow = styled.div`
    height: 100%;
    width: 85%;
    display: flex;

    border:${props => props.isOverride ? '2px solid red' : 'none'};
    border-radius:${props => props.isOverride ? '2px' : '0px'};

`
export const RightRow = styled.div`
    height: 100%;
    width: 15%;
    display: flex;

    `