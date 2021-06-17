import styled, { keyframes, css } from 'styled-components'

export const TableRow = styled.div`
    width: 100%;
    height: 2.5rem;
    minHeight: 2.5rem;
    display: flex;
    justify-content: flex-start;
    cursor: ${props => props.isHoverable ? 'pointer' : 'default'};
    align-items: center;
    background-color: ${props => props.isSelected ? '#00695c' : 'none'};

    &:hover{
        ${props => {
        if (props.isHoverable) {
            let hoverState = 'var(--waibe-blue-primary-hover)'
            if (props.isSelected) {
                hoverState = 'var(--waibe-blue-primary)'
            }
            return `background-color: ${hoverState}`
        }
    }}
    }
`
export const RowItem = styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    float: left; 
    white-space: nowrap;

    font-weight: 600;
    font-size: 1rem;
    color: var(--text-secondary);

`
export const InputWrapper = styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    font-weight: 600;
    font-size: 1rem;
    float: left; 
    white-space: nowrap;
    color: var(--text-secondary);
    padding-right: ${props => props.isEditable ? '0px' : '2px'};
    border: ${props => props.isOverride ? '1px solid var(--fail-color)' : 'none'};
    border-radius: 2px;
`
export const CheckboxWrapper = styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;

    color: var(--text-secondary);
`

export const HeaderItem = styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    float: left; 
    white-space: nowrap;
    
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--text-secondary);
`
export const Caption = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items:center;
    color: var(--text-secondary);
    height: 100%;
    flex: 1;
    font-weight: 600;
    font-size: 1.3rem;
    padding-left:1rem;

    border: ${props => props.isOverride ? '1px solid var(--fail-color)' : 'none'};
    border-radius: 2px;
`





export const DetailContainer = styled.div`
`
export const Title = styled.div`
    height: 4rem;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left:1rem;
    font-size:1.5rem;
    font-weight: 700;
    color: var(--text-secondary);
`
export const Row = styled.div`
    width: 100%;
    height: 3.1rem;
    display:flex;
    cursor: ${props => props.isHoverable ? 'pointer' : 'default'};

    background-color: ${props => props.isSelected ? 'var(--text-secondary-light)' : 'none'};

    &:hover{
        background-color: ${props => props.isHoverable ? 'hsl(0,0%,95%)' : 'none'};
    }
    &:active{
        background-color: ${props => props.isHoverable ? 'var(--text-primary)' : 'none'};
    }
`
export const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    color: var(--text-secondary);
    font-size: 1.3rem;
    font-weight: ${props => props.isBold ? '700' : '500'};
    padding-top:3px;
    padding-bottom: 3px;
    height: 100%;
    flex: 1;
    text-align: center;

    background-color: ${props => {
        if (props.isError) {
            return 'var(--fail-color)'
        } else if (props.isSuccess) {
            return 'var(--success-color)'
        } else {
            return 'none'
        }
    }};
`