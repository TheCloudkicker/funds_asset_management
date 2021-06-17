import xlsxFile from 'read-excel-file'
import XLSX from 'xlsx'
import { v4 as uuidv4 } from 'uuid';
import { createError, createSuccess } from '../alerts'
import { webWorkerPrefizes } from '../common'
import { updateFileObject } from './uploads'



export const parseTextFile = async fileObj => {

    let rawfile = await fileObj.fileObj.text()
    let rows = rawfile.split("\n");
    let items = []
    let rowArr = []

    let headers = []
    let type


    for (var i = 0; i < rows.length; i++) {
        let cols = rows[i].split("|");
        rowArr = []

        let col = ''

        for (var j = 0; j < cols.length; j++) {

            col = cols[j].trim()

            if (i === 0) {
                // type = checkType(col)
                headers.push({ original: col, unique: col, index: j, colLetter: null, type })
            } else {
                rowArr.push(col)
            }
        }

        if (i !== 0 && headers.length === rowArr.length) {

            rowArr.push(uuidv4())
            items.push(rowArr)
        }
    }

    return {
        data: {
            headers,
            items,
        },
        meta: {
            no_items: items.length
        }

    }
}


export const determineAsofDate = fileName => {

    let nameArray = fileName.split('.')

    if (nameArray.length < 3) {
        return null
    }

    let year = nameArray[nameArray.length - 2]
    let day = nameArray[nameArray.length - 3]
    let monthArray = nameArray[nameArray.length - 4].split(' ')
    let month = monthArray[monthArray.length - 2]

    return { day, month, year }

}

export const checkFileExtension = fileName => {

    if (fileName.endsWith('.txt')) {
        return 'TEXT'
    } else if (fileName.endsWith('.xls')) {
        return 'XLS'
    } else if (fileName.endsWith('.xlsx')) {
        return 'XLSX'
    } else if (fileName.endsWith('.xlsm')) {
        return 'XLSM'
    } else if (fileName.endsWith('.pdf')) {
        return 'PDF'
    } else {
        return null
    }
}

export const proccessXlsWithWebWorker = (uploadedFile, reports, aliases, dispatch) => {

    const worker = new window.Worker(webWorkerPrefizes("/workers/procXLS.js"));

    const { id, fileObj } = uploadedFile;

    worker.postMessage({
        fileObj,
        id,
        reports,
    });

    worker.onerror = err => {
        dispatch(createError('File read failure'))
    };

    worker.onmessage = async e => {

        const { id, report, headers, items, totals } = e.data;

        uploadedFile['data'] = { headers, items }
        uploadedFile['status'] = 'SUCCESS'
        uploadedFile['report'] = report
        uploadedFile['totals'] = totals

        if (!uploadedFile['fund']) {
            const { options, fund } = await determineFundByAlias(aliases, totals, 'FundName')
            uploadedFile['aliasesFound'] = options
            uploadedFile['fund'] = fund
        }

        dispatch(updateFileObject('needInfoFiles', id, uploadedFile))
    }
}



//FUND

export const determineFund = (funds, uploadedFile) => {

    let fund = null

    for (var i = 0; i < funds.length; i++) {

        let trackingID = funds[i].trackingID

        if (uploadedFile.fileObj.name.includes(trackingID)) {
            fund = funds[i]
            break
        }
    }
    return fund
}

export const determineFundByAlias = (aliases, totals, identifier) => {

    return new Promise((resolve, reject) => {

        let options = []
        let fund = null


        Object.keys(totals).map((keyName, keyIndex) => {

            options.push({
                value: uuidv4(),
                label: keyName
            })
        })

        loop1:
        for (var i = 0; i < options.length; i++) {
            loop2:
            for (var j = 0; j < aliases.length; j++) {

                if (options[i].label === aliases[j].name) {
                    fund = aliases[i].fund
                    break loop1;
                }
            }

        }


        resolve({
            options,
            fund
        })

    })

}





export const checkReportTypeByFileName = (uploadedFile, reports) => {

    let fileName = uploadedFile.fileObj.name
    let docType;

    for (var i = 0; i < reports.length; i++) {

        let identifierString = reports[i].fundString.current

        if (identifierString !== '' && fileName.includes(identifierString)) {

            return {
                value: reports[i].id,
                label: reports[i].name.current
            }
        }

    }

    return null

}


export const determineStatus = uploadedFile => {
    return new Promise((resolve, reject) => {

        console.log('Determining Status', uploadedFile)

        if (uploadedFile['fileExtension'] === 'PDF' || !uploadedFile['fund'] || !uploadedFile['period'] || !uploadedFile['report']) {
            resolve('needInfoFiles')
        } else if (uploadedFile['fund'] && uploadedFile['period'] && uploadedFile['report'] && uploadedFile['fileExtension']) {
            resolve('noErrorsFiles')
        } else if (uploadedFile['fileExtension'] === 'UNKNOWN') {
            resolve('errorFiles')
        } else {
            resolve(null)
        }

    })
}

// 
// for (var i = 0; i < items.length; i++) {

//     let val = items[i][identifier]
//     loop2:
//     for (var j = 0; j < aliases.length; j++) {
//         if (val == aliases[j].name) {
//             fund = aliases[j].fund
//             break loop1;
//         }
//     }

//     if (!optionsFull.includes(val)) {
//         optionsFull.push(val)
//         options.push({
//             value: uuidv4(),
//             label: val
//         })
//     }

// }