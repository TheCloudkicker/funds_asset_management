import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { numberWithCommas, booleanOptions2 } from '../../../common/helpers'
import { getInvestors, updateInvestors } from '../../../../store/actions/investors'
import { updateAppView } from '../../../../store/actions/layout'
import { InputForm } from '../../../common/FormInput'
import { CustomSelect3 } from '../../../common/Select'
import { Tab, Segment, Icon, Label, Menu, Table } from 'semantic-ui-react'

const Investors = () => {


    const investors = useSelector(state => state.investors)
    const { selectedFund } = useSelector(state => state.funds)
    const dispatch = useDispatch()


    useEffect(() => {
        // dispatch(updateAppView('Setup', 'Investors'))
        if (selectedFund) {
            dispatch(getInvestors(selectedFund.value))
        }
    }, [])



    const onChange = (index, key, value) => {
        updateInvestors({ ...investors }, index, key, value, dispatch)
    }
    const onClick = () => {

    }

    return (

        <Table celled padded selectable sortable>

            <Table.Header>
                <Table.Row>
                    {investors.headers.map(header =>
                        <Table.HeaderCell
                            style={{ justifyContent: 'flex-start', paddingLeft: '1rem', width: 300 }}
                            sorted={'ascending'}
                            onClick={() => console.log("A")}
                            key={header.value} >
                            {header.label}
                        </Table.HeaderCell>
                    )}
                </Table.Row>
            </Table.Header>

            <Table.Body style={{ overflowY: 'auto', maxHeight: 500 }}>
                {investors.investors.map((investor, index) => {

                    if (index > 20) return null

                    return (
                        <Table.Row style={{ height: '3rem', cursor: 'pointer' }} key={investor.id} onClick={() => onClick(investor)}>
                            <Table.Cell style={{ width: 300 }}>{investor.name.current}</Table.Cell>
                            <Table.Cell style={{ width: 300, textAlign: 'right' }}>{numberWithCommas(investor.commitment.current)}</Table.Cell>
                            <Table.Cell style={{ width: 300, padding: 0 }}>
                                <CustomSelect3
                                    wrapperStyles={{ paddingLeft: 5, paddingRight: 5 }}
                                    innerStyles={{ width: '100%', minHeight: '100%' }}
                                    obj={investor.isAffiliate}
                                    options={booleanOptions2}
                                    onChange={value => onChange(index, 'isAffiliate', value)} />
                            </Table.Cell>

                        </Table.Row>
                    )
                })}

            </Table.Body>
        </Table>

    )
}

export default Investors

{/* */ }

{/* <TableWrapper>

<TableHeader hasShadow={false} style={{ backgroundColor: 'var(--bg-tertiary)' }}>

</TableHeader>

<TableMain style={{ backgroundColor: 'var(--bg-primary)',  }}>

    {investors.investors.map((investor, index) =>

        <TableRow style={{ height: '3rem' }} key={investor.id}>
            <RowItem>{investor.name.current}</RowItem>
            <InputForm obj={investor.commitment} isNumber={true} />
            <CustomSelect3
                options={booleanOptions}
                obj={investor.isAffiliate}
                onChange={value => onChange(index, 'isAffiliate', value)}
            />

        </TableRow>

    )}

</TableMain>

</TableWrapper> */}
        // <RowItem>{investor.hash_name}</RowItem>
        //                 <RowItem>{numberWithCommas(investor.commitment_base)}</RowItem>

        //                 <RowItem>

        //                     {investor.editable ?

        //                         <Select
        //                             placeholder="Is affiliate..."
        //                             styles={customStyles}
        //                             value={investor.is_affiliate}
        //                             options={booleanOptions}
        //                             onChange={bool => onChange('is_affiliate', bool)} /> : investor.is_affiliate.value}

        //                 </RowItem>

        //                 <RowItem>

        //                     {investor.editable ?

        //                         <Select
        //                             placeholder="Is rdr..."
        //                             styles={customStyles}
        //                             value={investor.is_rdr}
        //                             options={booleanOptions}
        //                             onChange={bool => onChange('is_rdr', bool)} /> : investor.is_rdr.value}


        //                 </RowItem>

        //                 <RowItem>

        //                     {investor.editable ?

        //                         <Select
        //                             placeholder="Is casp..."
        //                             styles={customStyles}
        //                             value={investor.is_casp}
        //                             options={booleanOptions}
        //                             onChange={bool => onChange('is_casp', bool)} /> : investor.is_casp.value}

        //                 </RowItem>

        //                 <RowItem></RowItem>