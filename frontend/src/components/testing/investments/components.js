import styled, { keyframes, css } from 'styled-components'

export const Container = styled.div`
    height: 100%;
    width: 100%;
`
export const SubNavContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
export const NavSection = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`
export const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2px;
    padding-right: .5rem;
    padding-bottom: 1rem;
`
export const MainTable = styled.div`
    border: 1px solid var(--waibe-blue-primary);
    display: grid;
    grid-template-rows: 4rem auto;
`
export const TableHeader = styled.div`
    display: flex;
    border-bottom: 1px solid var(--waibe-blue-primary);
`
export const HeaderItem = styled.div`
    height: 100%;
    flex:1;
    display:flex;
    justify-content: center;
    align-items: center;
    color: var(--text-secondary);
    font-size: 1.3rem;
    font-weight: 700;
`
export const TableMain = styled.div`
    display: flex;
    flex-direction: column;
`

export const Side = styled.div`
    border: 1px solid var(--waibe-blue-primary);
`
export const SelectWrapper = styled.div`
    height: 100%;
    width: 50rem;
    display: flex;
    justify-content: flex-start;
    align-items:center;
    font-size: 1.3rem;
    padding-left: 1rem;
    color: var(--text-secondary);
`
export const Text = styled.div`
    width: 25rem;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    padding-left: 1rem;
    align-items: center;
    color: var(--text-secondary);
    font-size:1.5rem;
    font-weight: 700;
`
export const Item = styled.div`
    height: 100%;
    width: 25rem;
    display: flex;
    justify-content: flex-start;
    align-items:center;
    font-size: 1.3rem;
    font-weight: 700;
    padding-left: 1rem;
    color: var(--text-secondary);
`
export const NavButton = styled.div`
    width: 10rem;
    marginRight: 5px;

`

export const TableRow = styled.div`
    width: 100%;
    border-bottom: 1px solid var(--bg-tertiary-hover);
    height: 4rem;
    cursor: pointer;
    display: flex;
    &:hover{
        background-color: var(--waibe-blue-primary);
    }
    &:active{
        background-color: var(--waibe-blue-primary-active);
    }
`

export const RowItem = styled.div`
    height: 100%;
    flex:1;
    display:flex;
    justify-content: center;
    align-items: center;
    color: var(--text-secondary);
    font-size: 1.1rem;
    font-weight: 600;
`

export const IconWrapper = styled.div`
    height:100%;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    padding-bottom: 5px;
    padding-left: 2px;

    &:hover{
        background-color: var(--waibe-blue-primary);
    }
    &:active{
        background-color: var(--waibe-blue-primary-active);
    }
`

