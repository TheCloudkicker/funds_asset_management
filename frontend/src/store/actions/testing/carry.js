import axios from 'axios'
import uuidv4 from 'uuid/v4'
import { devPrefixes, authConfig } from '../common'
import { createError, createSuccess } from '../alerts'
import {
    EXPORT_CARRY_CALC, SAVE_CARRY_CALC

} from '../../actions/types.js';
import { default as _XLSX } from 'xlsx';
// import XlsxPopulate from 'xlsx-populate';
import XLSX from 'xlsx-style';
import { saveAs } from 'file-saver';
import { getCapitalSummary } from '../funds/funds'


export const saveCarryCalc = (currentUser, fundID, periodID, indexes, subSection, key, saveData) => (dispatch, getState) => {


    const config = authConfig(getState)
    const url = devPrefixes(`/api/testing/carry/calc/`)

    console.log('saveData', indexes)

    const body = {
        fundID,
        periodID,
        currentUser,

        area: subSection,
        indexes,
        key,
        saveData,
    }

    axios
        .post(url, body, config)
        .then(res => {

            dispatch({
                type: SAVE_CARRY_CALC,
                payload: res.data
            });

        })
        .catch(err => {
            console.log("ERR", err)
            dispatch(createError('Carry Calc failed to save'))
        });
}





function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}

const renderCapital = (capitalSummary, headers) => {
    let aoa = []
    aoa.push(headers)

    console.log('capitalSummary', capitalSummary)


    for (var i = 0; i < capitalSummary.length; i++) {

        let row = [
            capitalSummary[i].date.current,
            capitalSummary[i].type.current.label,
            capitalSummary[i].baseAmount.current,
            '',
            capitalSummary[i].source,
        ]

        aoa.push(row)

    }

    let formulaRow = [
        'Total', '', '', '', ''
    ]

    aoa.push(formulaRow)

    var ws_capital = _XLSX.utils.aoa_to_sheet(aoa);

    ws_capital[`C${capitalSummary.length + 2}`] = { f: `=SUM(C2:C${capitalSummary.length + 1})` };

    return ws_capital
}


const renderData = (items, headers) => {

    console.log('renderData', items, headers)

    let aoa = []
    aoa.push(headers)


    for (var i = 0; i < items.length; i++) {

        let row = [
            items[i].year,
            items[i].total.current,
            items[i].source,
        ]

        aoa.push(row)

    }

    let formulaRow = [
        'Total', '', ''
    ]

    aoa.push(formulaRow)

    return aoa

}

const getToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    return today
}



const renderwithXLSX = (carry, capitalSummary, period, currentUser) => {

    let fundName = 'Lux Fund'
    let yearYead = '12_31_2019'
    let fileName = `Carry ${fundName} ${yearYead}.xlsx`


    const sections = renderCarry(carry, null)

    // var wb = _XLSX.utils.book_new();

    var wb = {
        SheetNames: [
            "Carry Calc",
            "Capital",
            "Fund Investments",
            "Derivatives",
            "Other Income",
            "Master",
            "Blocker",
            "Materiality",
            "History",
            "Signoffs"
        ],
        Sheets: {},
        Props: {
            Title: "SheetJS Tutorial",
            Subject: "Test",
            Author: "Waibe",
            CreatedDate: new Date(2021, 3, 15)
        }
    };


    // let today = getToday()



    // var ws_data = [
    //     ['Fund', 'Lux Capital LP', '', '', ''],
    //     ['Date of Calc', period.label, '', '', ''],
    //     ['Date of Export', today, '', '', ''],
    //     ['Exported by', currentUser.displayName, '', '', ''],
    //     ['Module', 'Caried Interest', '', '', ''],
    //     ['Total Fund Commitments', 1000000, '', '', ''],
    //     ['Commitments Subject to Carry', 950000, '', '', ''],
    //     ['Percent Charged Carry', '', '', '', ''],
    //     ['', '', '', '', ''],
    //     ['Caption', 'Period', 'Source', 'Total Fund Level', 'Investors Subject to Carry'],
    // ];

    // const CARRY_PERC_CELL = 'B8'

    // for (var j = 0; j < sections.length; j++) {

    //     for (var k = 0; k < sections[j].dataRows.length; k++) {

    //         let arr = []

    //         if (sections[j].dataRows[k].isForm) {
    //             let val = parseFloat(sections[j].dataRows[k].subjectValue.current)
    //             arr = [
    //                 sections[j].dataRows[k].title,
    //                 sections[j].dataRows[k].type,
    //                 sections[j].dataRows[k].source,
    //                 sections[j].dataRows[k].totalValue,
    //                 val,
    //             ]
    //         } else if (sections[j].dataRows[k].isConclusion) {
    //             let conclusion = sections[j].dataRows[k].conclusion.generic_conclusion.label
    //             arr = [
    //                 sections[j].dataRows[k].title,
    //                 sections[j].dataRows[k].type,
    //                 sections[j].dataRows[k].source,
    //                 sections[j].dataRows[k].totalValue,
    //                 conclusion,
    //             ]
    //         } else {
    //             arr = [
    //                 sections[j].dataRows[k].title,
    //                 sections[j].dataRows[k].type,
    //                 sections[j].dataRows[k].source,
    //                 sections[j].dataRows[k].totalValue,
    //                 sections[j].dataRows[k].subjectValue,
    //             ]
    //         }


    //         ws_data.push(arr)


    //     }

    //     ws_data.push(['', '', '', '', ''])


    // }










    // let headers2 = [
    //     'Derivative Year',
    //     'Amount',
    //     'Source',
    // ]

    // let capital_headers = [
    //     'Date',
    //     'Type',
    //     'Amount',
    //     'Preferred',
    //     'Source',
    // ]

    // wb.Sheets["Capital"] = renderCapital(capitalSummary, capital_headers);


    // var deriv_data = renderData(carry.investments.derivatives.years, headers2)
    // var ws_deriv = _XLSX.utils.aoa_to_sheet(deriv_data);
    // let deriv_length = carry.investments.derivatives.years.length
    // ws_deriv[`B${deriv_length + 2}`] = { f: `=SUM(B2:B${deriv_length + 1})` };
    // wb.Sheets["Derivatives"] = ws_deriv;


    // var other_data = renderData(carry.investments.other_income.years, headers2)
    // var ws_other = _XLSX.utils.aoa_to_sheet(other_data);
    // let other_length = carry.investments.other_income.years.length
    // ws_other[`B${other_length + 2}`] = { f: `=SUM(B2:B${other_length + 1})` };
    // wb.Sheets["Other Income"] = ws_other;

    // var master_data = renderData(carry.investments.master.years, headers2)
    // var ws_master = _XLSX.utils.aoa_to_sheet(master_data);
    // let master_length = carry.investments.master.years.length
    // ws_master[`B${master_length + 2}`] = { f: `=SUM(B2:B${master_length + 1})` };
    // wb.Sheets["Master"] = ws_master;



    // var ws = _XLSX.utils.aoa_to_sheet(ws_data);

    // const START_ROW = 11

    // ws[`B8`] = { f: `=B7/B6` };

    // ws[`D${START_ROW + 8}`] = { f: `=Derivatives!B${deriv_data.length}` };
    // ws[`E${START_ROW + 8}`] = { f: `=D${START_ROW + 8}*${CARRY_PERC_CELL}` };

    // ws[`D${START_ROW + 9}`] = { f: `='Other Income'!B${other_data.length}` };
    // ws[`E${START_ROW + 9}`] = { f: `=D${START_ROW + 9}*${CARRY_PERC_CELL}` };

    // ws[`D${START_ROW + 11}`] = { f: `=Master!B${master_data.length}` };
    // ws[`E${START_ROW + 11}`] = { f: `=D${START_ROW + 11}*${CARRY_PERC_CELL}` };


    // // ws[`D${START_ROW + 11}`] = { f: `=Master!B${master_data.length}` };
    // ws[`D${START_ROW + 12}`] = { f: `=SUM(D16:D${START_ROW + 11})` };
    // ws[`E${START_ROW + 12}`] = { f: `=SUM(E16:E${START_ROW + 11})` };

    // // ws[`E${START_ROW + 12}`] = { f: `=D${START_ROW + 12}*${CARRY_PERC_CELL}` };
    // ws[`E${START_ROW + 13}`] = { f: `=D${START_ROW + 13}*${CARRY_PERC_CELL}` };

    // ws[`E${START_ROW + 23}`] = { f: `=E33-E31` };


    // wb.Sheets["Carry Calc"] = ws;

    wb.Sheets["Carry Calc"]['A1'] = { v: `Test` };

    wb.Sheets["Carry Calc"]['A1'].s = {
        font: { sz: 13, bold: true, },
        alignment: {
            horizontal: "center", vertical: "center", wrap_text: true
        }
    }




    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), fileName);






}

export const exportCarryCalc = (carry, exportType, period, currentUser, capitalSummary) => (dispatch, getState) => {

    let fundName = 'Lux Fund'
    let yearYead = '12_31_2019'
    let fileName = `Carry ${fundName} ${yearYead}.xlsx`


    dispatch(createSuccess(`Generating carry calc in ${exportType} `))

    // XlsxPopulate.fromBlankAsync()
    //     .then(workbook => {
    //         // Modify the workbook.
    //         workbook.sheet("Sheet1").cell("A1").value("This is neat!");

    //         // Write to file.
    //         return workbook.toFileAsync("./out.xlsx");
    //     });

    renderwithXLSX(carry, capitalSummary, period, currentUser)



    return {
        type: EXPORT_CARRY_CALC,
        payload: true
    }
}


export const renderCarry = (carry, handleClick) => {

    return [
        {
            name: 'investors',
            primaryTitle: 'Step 1',
            secondaryTitle: 'Investor Flows',
            dataRows: [
                {
                    title: 'Total contributions',
                    nameLower: 'capital',
                    hoverText: '',
                    type: 'history to date',
                    isHoverable: true,
                    source: 'CDR',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.investors.total_contributions,
                    subjectValue: carry.investors.total_contributions
                },
                {
                    title: 'Total distributions',
                    nameLower: 'capital',
                    type: 'history to date',
                    hoverText: '',
                    isHoverable: true,
                    source: 'CDR',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.investors.total_distributions,
                    subjectValue: carry.investors.total_distributions
                },
                {
                    title: `Preferred Return at ${carry.prefRate}% `,
                    nameLower: 'capital',
                    type: 'history to date',
                    hoverText: '',
                    isHoverable: true,
                    source: 'CDR',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                        textDecorationLine: 'underline',
                        textDecorationStyle: 'single'
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.investors.total_preferred,
                    subjectValue: carry.investors.total_preferred
                },
                {
                    title: 'Distributable pro rata before carry',
                    nameLower: 'pro_rata_before_carry',
                    type: 'history to date',
                    hoverText: 'Cash to be distributed to investors on a pro rata basis before carried interest allocation to carried interest partner to be considered',
                    isHoverable: false,
                    source: 'CDR',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                        textDecorationLine: 'underline',
                        textDecorationStyle: 'double'
                    },
                    onClick: () => console.log("Click"),
                    totalValue: carry.investors.total_pro_rata_before_dists,
                    subjectValue: carry.investors.total_pro_rata_before_dists
                },
            ]
        },
        {
            name: 'investments',
            primaryTitle: 'Step 2',
            secondaryTitle: 'Investment Flows',
            dataRows: [
                {
                    title: 'Direct Investments',
                    nameLower: 'direct',
                    hoverText: '',
                    type: 'history to date',
                    isHoverable: true,
                    source: 'HR',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.investments.direct.total,
                    subjectValue: carry.investments.direct.total * carry.lpOwnership
                },
                {
                    title: 'Secondary Investments',
                    nameLower: 'secondary',
                    hoverText: '',
                    type: 'history to date',
                    isHoverable: true,
                    source: 'HR',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.investments.secondary.total,
                    subjectValue: carry.investments.secondary.total * carry.lpOwnership
                },
                {
                    title: 'Primary Investments',
                    nameLower: 'primary',
                    hoverText: '',
                    type: 'history to date',
                    isHoverable: true,
                    source: 'HR',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.investments.primary.total,
                    subjectValue: carry.investments.primary.total * carry.lpOwnership
                },
                {
                    title: 'Derivatives',
                    nameLower: 'derivatives',
                    hoverText: '',
                    type: 'history to date',
                    isHoverable: true,
                    source: 'TB',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.investments.derivatives.total,
                    subjectValue: carry.investments.derivatives.total * carry.lpOwnership
                },
                {
                    title: 'Other income',
                    nameLower: 'other',
                    hoverText: '',
                    type: 'history to date',
                    isHoverable: true,
                    source: 'TB',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.investments.other_income.total,
                    subjectValue: carry.investments.other_income.total * carry.lpOwnership
                },
                {
                    title: 'Blocker Activity',
                    nameLower: 'blockers',
                    hoverText: '',
                    type: 'history to date',
                    isHoverable: true,
                    source: 'TB',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.investments.blockers.total,
                    subjectValue: carry.investments.blockers.total * carry.lpOwnership
                },
                {
                    title: 'Uber Master Activity',
                    nameLower: 'master',
                    hoverText: '',
                    type: 'history to date',
                    isHoverable: true,
                    source: 'TB',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                        textDecorationLine: 'underline',
                        textDecorationStyle: 'single'
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.investments.master.total,
                    subjectValue: carry.investments.master.total * carry.lpOwnership
                },
                {
                    title: 'Hypothetical net investment flows',
                    nameLower: 'hypothetical_net_inv_flows',
                    hoverText: '',
                    type: 'history to date',
                    isHoverable: false,
                    source: 'CDR',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                        textDecorationLine: 'underline',
                        textDecorationStyle: 'double'
                    },
                    onClick: () => console.log("Click"),
                    totalValue: carry.investments.hypothetical_inv_flows.total,
                    subjectValue: carry.investments.hypothetical_inv_flows.total * carry.lpOwnership
                },
                {
                    title: `Maximum allocable carry (${carry.carryRate} % of Hypothetical net investment flows)`,
                    nameLower: 'flows_calc',
                    hoverText: 'Maximum amount to be allocated to carried interest partner based on hypothetical net investment flows',
                    type: 'history to date',
                    isHoverable: true,
                    source: 'CDR',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.investments.maximum_allocable_carry.total,
                    subjectValue: carry.investments.maximum_allocable_carry.subject_to_carry * carry.lpOwnership
                },
            ]
        },
        {
            name: 'allocation',
            primaryTitle: 'Step 3',
            secondaryTitle: 'Carry Allocation',
            dataRows: [
                {
                    title: 'Hypothetical Liquidation Value',
                    nameLower: 'liq_value',
                    hoverText: '',
                    type: 'as of year-end',
                    isHoverable: true,
                    source: 'TB',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.allocation.hyp_liq_value.total,
                    subjectValue: carry.allocation.hyp_liq_value.total * carry.lpOwnership
                },
                {
                    title: 'Distributable pro rata before carry',
                    nameLower: 'dist_pro_rata',
                    hoverText: 'Cash to be distributed to investors on a pro rata basis before carried interest allocation to carried interest partner to be considered',
                    type: 'history to date',
                    isHoverable: false,
                    source: 'Rc',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: () => console.log("Click"),
                    totalValue: carry.investors.total_pro_rata_before_dists,
                    subjectValue: carry.investors.total_pro_rata_before_dists * carry.lpOwnership
                },
                {
                    title: 'Maximum distributable carry',
                    nameLower: 'max_dist_carry',
                    hoverText: 'Maximum amount that can be distributed as carry based on comparison of investor flows with hypothethical fund liquidation value',
                    type: 'history to date',
                    isHoverable: false,
                    source: 'Rc',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: () => console.log("Click"),
                    totalValue: carry.allocation.max_distributable_carry.total,
                    subjectValue: carry.allocation.max_distributable_carry.subject_to_carry * carry.lpOwnership
                },
                {
                    title: 'Maximum allocable carry',
                    nameLower: 'dist_pro_rata',
                    hoverText: 'Total amount of carried interest that can be allocated to carried interest partner based on comparison of hypothetical net investment flows with maximum amount available for distribution',
                    type: 'history to date',
                    isHoverable: false,
                    source: 'Rc',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: () => console.log("Click"),
                    totalValue: carry.allocation.total_allocable_carry.total,
                    subjectValue: carry.allocation.total_allocable_carry.total * carry.lpOwnership
                },
                {
                    title: 'Prior Year History to Date Carry',
                    nameLower: 'carry',
                    hoverText: 'Prior year history to date amount of carried interest allocated to carried interest partner',
                    type: 'history to date',
                    isHoverable: true,
                    source: 'PY',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: carry.investments.htd_carry.total,
                    subjectValue: carry.investments.htd_carry.total
                },
                {
                    title: 'Current Year',
                    nameLower: 'current_year',
                    hoverText: 'Amount of carried interest to be allocated as part of current year capital reallocation',
                    type: 'history to date',
                    isHoverable: false,
                    source: 'PY',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: () => console.log("Click"),
                    totalValue: carry.allocation.cy_carry.total,
                    subjectValue: carry.allocation.cy_carry.subject_to_carry
                },
            ]
        },
        {
            name: 'compare',
            primaryTitle: 'Step 4',
            secondaryTitle: 'Compare to Client',
            dataRows: [
                {
                    title: 'Client Amount',
                    nameLower: 'client_value',
                    isForm: true,
                    isConclusion: false,
                    editable: carry.compare.client_value.editable,
                    hoverText: '',
                    type: '',
                    isHoverable: false,
                    source: '',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: () => console.log("Click"),
                    totalValue: null,
                    subjectValue: carry.compare.client_value
                },
                {
                    title: 'Difference',
                    nameLower: 'difference',
                    isForm: false,
                    isConclusion: false,
                    editable: false,
                    hoverText: '',
                    type: '',
                    isHoverable: false,
                    source: '',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: () => console.log("Click"),
                    totalValue: null,
                    subjectValue: carry.compare.difference
                },
                {
                    title: 'SUM Threshold',
                    nameLower: 'materiality',
                    isForm: false,
                    isConclusion: false,
                    editable: false,
                    hoverText: '',
                    type: '',
                    isHoverable: true,
                    source: '',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: null,
                    subjectValue: carry.compare.materiality.deminimis_balance
                },
                {
                    title: 'OM Threshold',
                    nameLower: 'materiality',
                    isForm: false,
                    isConclusion: false,
                    editable: false,
                    hoverText: '',
                    type: '',
                    isHoverable: true,
                    source: '',
                    style: {
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: null,
                    subjectValue: carry.compare.materiality.overall_balance
                },
                {
                    title: 'Conclusion',
                    nameLower: 'conclusion',
                    isForm: false,
                    isConclusion: true,
                    editable: false,
                    hoverText: '',
                    type: '',
                    isHoverable: true,
                    source: '',
                    style: {
                        marginLeft: '1rem',
                        borderRadius: 2
                    },
                    onClick: nameLower => handleClick(nameLower),
                    totalValue: null,
                    subjectValue: carry.compare.materiality.overall_balance,
                    conclusion: carry.conclusion
                },
            ]
        }
    ]
}