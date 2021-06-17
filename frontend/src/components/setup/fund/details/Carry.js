import React, { useEffect, useState } from 'react'
import Questionaire from '../questionaire/Questionaire'
import Select from 'react-select'
import { customStyles3 } from '../../../../assets/styles/select'
import { useSelector, useDispatch } from 'react-redux'
import { setCarryReport } from '../../../../store/actions/admin'
import { getCarrySettings } from '../../../../store/actions/testing/testing'
import { TableMain, TableRow, TableWrapper, TableHeader } from '../../../../assets/styled-components/Table'
import { HeaderItem, Caption } from '../../../../assets/styled-components/Carry'

const Carry = () => {

    const dispatch = useDispatch()
    const { reportsHeaders } = useSelector(state => state.admin)
    const { carrySettings } = useSelector(state => state.testing)
    const { all_headers, all_reports } = useSelector(state => state.database)
    const onChange = (key, report) => dispatch(setCarryReport(key, report))

    const [capHeaderOptions, setCapHeaderOptions] = useState([])
    const [invHeaderOptions, setInvHeaderOptions] = useState([])


    useEffect(() => {
        dispatch(getCarrySettings())
    }, [])


    const headers = [
        { value: 1, label: 'Header 1' },
        { value: 2, label: 'Header 2' },
        { value: 3, label: 'Header 3' },
        { value: 4, label: 'Header 4' },
        { value: 5, label: 'Header 5' },
    ]

    const [mappedHeaders, setMappedHeaders] = useState({
        ytd_base_contributions: [],
        ytd_base_distributions: [],
        base_end_fmv: [],

        contributions_to_fund: [],
        distributions_to_fund: [],
        date_of_activity: [],
    })
    const onChange2 = (key, value) => {
        setMappedHeaders(prevState => {
            return { ...prevState, [key]: value }
        })
    }

    const setHeaderOptionsInvestment = () => {
        if (carrySettings.investmentActivity) {
            let index = all_headers.findIndex(h => h.id === carrySettings.investmentActivity.value)
            setInvHeaderOptions(all_headers[index].headers)
        }
    }
    const setHeaderOptionsInvestors = () => {
        if (carrySettings.investorActivity) {
            let index = all_headers.findIndex(h => h.id === carrySettings.investorActivity.value)
            setCapHeaderOptions(all_headers[index].headers)
        }
    }

    useEffect(() => {
        setHeaderOptionsInvestment()
    }, [carrySettings.investmentActivity])

    useEffect(() => {
        setHeaderOptionsInvestors()
    }, [carrySettings.investorActivity])


    return (
        <TableWrapper>
            <TableHeader hasShadow={false} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <HeaderItem>Carry Setup</HeaderItem>
            </TableHeader>

            <TableMain style={{ paddingRight: '2rem' }}>
                <h2 style={{ color: 'var(--text-secondary)', paddingLeft: '1rem', marginTop: '1rem' }}>Data sources needed to calculate carry</h2>
                <TableRow>
                    <Caption>Which Report Contains Investment Activity?</Caption>
                    <Select styles={customStyles3} value={carrySettings.investmentActivity} options={all_reports} placeholder={`Select Report...`} onChange={report => onChange('investmentActivity', report)} />
                </TableRow>

                <TableRow>
                    <Caption style={{ paddingLeft: '2rem' }}>YTD Base Contributions to Investments</Caption>
                    <Select styles={customStyles3} value={mappedHeaders.ytd_base_contributions} options={invHeaderOptions} isMulti placeholder={`Select headers...`} onChange={header => onChange2('ytd_base_contributions', header)} />
                </TableRow>

                <TableRow>
                    <Caption style={{ paddingLeft: '2rem' }}>YTD Base Distributions to Investments</Caption>
                    <Select styles={customStyles3} value={mappedHeaders.ytd_base_distributions} options={invHeaderOptions} isMulti placeholder={`Select headers...`} onChange={header => onChange2('ytd_base_distributions', header)} />
                </TableRow>

                <TableRow>
                    <Caption style={{ paddingLeft: '2rem' }}>Period End Base FMV</Caption>
                    <Select styles={customStyles3} value={mappedHeaders.base_end_fmv} options={invHeaderOptions} isMulti placeholder={`Select headers...`} onChange={header => onChange2('base_end_fmv', header)} />
                </TableRow>


                <TableRow>
                    <Caption>Which Report Contains Investor Activity?</Caption>
                    <Select styles={customStyles3} value={carrySettings.investorActivity} options={all_reports} placeholder={`Select Report...`} onChange={report => onChange('investorActivity', report)} />
                </TableRow>


                <TableRow>
                    <Caption style={{ paddingLeft: '2rem' }}>Investor Base Contributions to Fund</Caption>
                    <Select styles={customStyles3} value={mappedHeaders.contributions_to_fund} options={capHeaderOptions} isMulti placeholder={`Select headers...`} onChange={header => onChange2('contributions_to_fund', header)} />
                </TableRow>

                <TableRow>
                    <Caption style={{ paddingLeft: '2rem' }}>Investor Base Distributions from Fund</Caption>
                    <Select styles={customStyles3} value={mappedHeaders.distributions_to_fund} options={capHeaderOptions} isMulti placeholder={`Select headers...`} onChange={header => onChange2('distributions_to_fund', header)} />
                </TableRow>

                <TableRow>
                    <Caption style={{ paddingLeft: '2rem' }}>Date of Activity</Caption>
                    <Select styles={customStyles3} value={mappedHeaders.date_of_activity} options={capHeaderOptions} isMulti placeholder={`Select headers...`} onChange={header => onChange2('date_of_activity', header)} />
                </TableRow>


            </TableMain>

        </TableWrapper>

    )
}

export default Carry
