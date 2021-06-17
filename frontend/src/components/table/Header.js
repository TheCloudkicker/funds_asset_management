import React from 'react'
import { Caption } from '../../assets/styled-components/Carry'
import { TableHeader, LeftRow, RightRow, HeaderItem } from '../../assets/styled-components/Table'


const headerStyle = {
    width: '100%',
    height: '2.5rem',
    backgroundColor: 'var(--header-color)',
    display: 'flex',
    paddingRight: 10
}
const maxWidthStyle = {
    width: '8rem',
    maxWidth: '8rem'
}


const Header = ({ description = '', isAllocated = false, unique = null, sourceType, prefRate = null, details = true, hasShadow = true, indexName = '', subIndexName = '' }) => {

    if (!details) {
        return (
            <TableHeader hasShadow={hasShadow} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <Caption style={{ flex: 3, display: 'flex', justifyContent: 'flex-start', paddingLeft: '1rem' }}>{description}</Caption>
                <Caption style={{ flex: 2, display: 'flex', justifyContent: 'flex-end' }}></Caption>
                <Caption style={{ maxWidth: '8rem', display: 'flex', justifyContent: 'center' }}></Caption>
                <Caption style={{ maxWidth: '8rem', display: 'flex', justifyContent: 'center' }}></Caption>
            </TableHeader>
        )
    } else if (unique) {
        if (unique === 'cashFlows') {
            return (
                <TableHeader hasShadow={hasShadow} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <Caption style={{ flex: 3, display: 'flex', justifyContent: 'flex-start' }}>Cash Flow Type</Caption>
                    <Caption style={{ flex: 2, display: 'flex', justifyContent: 'flex-end' }}>Total Cash Flows</Caption>
                    <Caption style={{ width: '8rem', maxWidth: '8rem', display: 'flex', justifyContent: 'flex-end' }}>Carry Rate</Caption>
                    <Caption style={{ display: 'flex', justifyContent: 'flex-end' }}>Carry Flows</Caption>
                    <Caption style={{ width: '8rem', maxWidth: '8rem', display: 'flex', justifyContent: 'center' }}>Actions</Caption>
                </TableHeader>
            )
        } else if (unique === 'materiality') {
            return (
                <TableHeader hasShadow={hasShadow} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <Caption style={{ flex: 3, display: 'flex', justifyContent: 'flex-start', }}>Materiality</Caption>
                    <Caption style={{ flex: 2, display: 'flex', justifyContent: 'flex-start' }}>Details</Caption>
                    <Caption style={{ flex: 2, display: 'flex', justifyContent: 'flex-end' }}>Amount</Caption>
                    <Caption style={{ maxWidth: '8rem', display: 'flex', justifyContent: 'center' }}>Actions</Caption>
                </TableHeader>
            )
        } else if (unique === 'capital') {
            return (
                <TableHeader hasShadow={false} style={{ backgroundColor: 'var(--bg-tertiary)' }} >

                    <LeftRow style={{ flex: 1 }}>
                        <Caption style={{ justifyContent: 'flex-start', flex: 1, width: '20%' }}>Date</Caption>
                        <Caption style={{ justifyContent: 'center', flex: 1, width: '20%' }}>Type</Caption>
                        <Caption style={{ justifyContent: 'center', flex: 1, width: '20%' }}>Amount</Caption>
                        <Caption style={{ justifyContent: 'center', flex: 1 }}>Pref Return</Caption>
                        <Caption style={{ width: 20, flex: 'none', paddingBottom: 5, marginLeft: 5 }}></Caption>
                    </LeftRow>

                    <RightRow style={{ width: 100, maxWidth: 100, minWidth: 100 }}>
                        <Caption style={{ justifyContent: 'center', flex: 1 }}>Actions</Caption>
                    </RightRow>

                </TableHeader>
            )
        } else if (unique === 'selector') {
            return (
                <TableHeader style={headerStyle}>

                    <LeftRow style={{ flex: 1, alignItems: 'center' }}>
                        <Caption style={{ paddingLeft: '1rem', justifyContent: 'flex-start', color: '#fff' }}>{indexName}</Caption>
                        <Caption style={{ paddingLeft: '1rem', justifyContent: 'flex-start', color: '#fff' }}>{subIndexName}</Caption>
                        <Caption style={{ paddingLeft: '1rem', justifyContent: 'flex-end', color: '#fff' }}>Balance</Caption>
                    </LeftRow>

                    <RightRow style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingBottom: 5, width: 100, maxWidth: 100, minWidth: 100 }}>
                        <Caption style={{ display: 'flex', justifyContent: 'center', color: '#fff' }}>Actions</Caption>
                    </RightRow>

                </TableHeader>
            )
        }
    } else if (isAllocated) {
        return (
            <TableHeader hasShadow={hasShadow} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <Caption style={{ flex: 3, display: 'flex', justifyContent: 'flex-start' }}>{description}</Caption>
                <Caption style={{ flex: 2, display: 'flex', justifyContent: 'flex-end' }}>Total Amount</Caption>
                <Caption style={{ flex: 2, display: 'flex', justifyContent: 'flex-end' }}>Allocated Amount</Caption>
                <Caption style={{ maxWidth: '8rem', display: 'flex', justifyContent: 'center' }}>Source</Caption>
                <Caption style={{ maxWidth: '8rem', display: 'flex', justifyContent: 'center' }}>Actions</Caption>
            </TableHeader>
        )
    } else {
        return (
            <TableHeader hasShadow={hasShadow} style={{ backgroundColor: 'var(--bg-tertiary)' }}>

                <LeftRow style={{ flex: 1, alignItems: 'center' }}>
                    <Caption style={{ flex: 2, paddingLeft: '1rem', justifyContent: 'flex-start' }}>{description}</Caption>
                    <Caption style={{ paddingLeft: '1rem', justifyContent: 'center' }}>Source</Caption>
                    <Caption style={{ paddingLeft: '1rem', justifyContent: 'flex-end' }}>Amount</Caption>
                    <Caption style={{ cursor: 'pointer', width: 20, flex: 'none', paddingBottom: 5, marginLeft: 5 }}></Caption>
                </LeftRow>

                <RightRow style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingBottom: 5, width: 100, maxWidth: 100, minWidth: 100 }}>
                    <Caption style={{ display: 'flex', justifyContent: 'center', }}>Actions</Caption>
                </RightRow>
            </TableHeader>
        )
    }
}

export default Header
