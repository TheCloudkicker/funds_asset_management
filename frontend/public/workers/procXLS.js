importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/jszip.js')
importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.js')
importScripts('https://cdnjs.cloudflare.com/ajax/libs/uuid/8.3.2/uuid.min.js')



const numberToLetters = num => {

    let letters = ''
    while (num >= 0) {
        letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters
        num = Math.floor(num / 26) - 1
    }
    return letters

}

const checkType = value => {

    if (isNaN(value)) {
        return 'string'
    } else {
        return 'number'
    }

}

const getHeaders = (sheet, noCols, headerRow) => {

    // console.log('headerRow', headerRow)

    let uniqueHeaders = []
    let headers = []
    let key
    let type
    let original
    let unique
    let colLetter
    let value

    const generateUniqueHeader = rawHeader => {

        let suffix = 1
        let _header = rawHeader

        while (uniqueHeaders.includes(_header)) {
            _header = `${rawHeader}_${suffix}`
            suffix += 1
        }

        uniqueHeaders.push(_header)
        return _header
    }


    for (var index = 0; index < noCols; index++) {

        colLetter = numberToLetters(index)

        key = `${colLetter + headerRow}`



        try {
            original = sheet[key]['v'].replace(/\s/g, "")

            unique = generateUniqueHeader(original)
        } catch {
            continue
        }


        try {
            value = sheet[`${colLetter + (headerRow + 1)}`]['v']
            type = checkType(value)
        } catch {
            type = 'string'
        }


        headers.push({ original, unique, index, colLetter, type })
    }



    return { headers }

}

const getNumRows = (sheet, noRows) => {

    let rows = 2
    let tmp

    for (var i = 3; i < noRows; i++) {

        try {
            tmp = sheet[`B${i}`]['v']
            rows += 1
        } catch {
            return rows
        }

    }

    return noRows

}



const getItems = (sheet, headers, itemsRow, noRows, isCdr) => {


    let newAlias = {
        contributions: 0,
        distributions: 0,
    }

    console.log('noRows', noRows, headers.length)

    let totals = {}

    let items = []
    let c, d
    let cAddr, dAddr, aAddr
    let cValue, dValue, alias


    if (isCdr) {

        noRows = getNumRows(sheet, noRows)


        for (var r = 3; r < noRows; r++) {

            alias = sheet[`B${r}`]['v']

            if (!(alias in totals)) totals[alias] = newAlias

            row = {}

            c = numberToLetters(5)
            d = numberToLetters(20)

            cAddr = `${c + r}`
            dAddr = `${d + r}`

            cValue = sheet[cAddr]['v']
            dValue = sheet[dAddr]['v']


            totals[alias].contributions += cValue
            totals[alias].distributions += dValue

            // console.log('dValue', r, dValue, totals[alias].distributions)
            row = {}
            row['uuid'] = uuid.v4()

            for (var col = 0; col < headers.length; col++) {



                b = numberToLetters(col)
                addr = `${b}${r}`

                try {
                    row[headers[col].unique] = sheet[addr]['v']
                } catch {
                    row[headers[col].unique] = ''
                }

            }

            items.push(row)


        }
        return { items, totals }

    } else {
        for (var r = 2; r < noRows; r++) {

            let addr
            let b


            row = {}
            row['uuid'] = uuid.v4()

            for (var col = 0; col < headers.length; col++) {



                b = numberToLetters(col)
                addr = `${b}${r}`

                try {
                    row[headers[col].unique] = sheet[addr]['v']
                } catch {
                    row[headers[col].unique] = ''
                }

            }

            console.log('r', r)

            items.push(row)

        }

        console.log('items', items)

        return { items, totals }



    }




}



const getReport = (headers, reports) => {

    for (var i = 0; i < reports.length; i++) {

        for (var j = 0; j < reports[i].headers.length; j++) {

            for (var k = 0; k < headers.length; k++) {

                if (headers[k].unique === reports[i].headers[j].label) {
                    return reports[i]
                }
            }
        }
    }

    return null

}

const lettersToNumber = string => {

    let letters = string.replace(/[0-9]/g, '')
    let r = string.replace(/\D/g, "");


    for (var p = 0, n = 0; p < letters.length; p++) {
        n = letters[p].charCodeAt() - 64 + n * 26;
    }
    return { n, r };

}


const proccess = (sheet, reports, isCdr) => {

    let report = null
    let range = sheet['!range']

    let noCols;
    let noRows;

    let headerRow;
    let itemsRow;

    if (range) {

        noCols = range['e']['c']
        noRows = range['e']['r']
        headerRow = 2
        itemsRow = 3

    } else {

        range = sheet['!ref']
        range = range.split(':')
        let end = lettersToNumber(range[1])
        noCols = end['n']
        noRows = end['r']

        headerRow = isCdr ? 2 : 1
        itemsRow = isCdr ? 3 : 2

    }


    const { headers } = getHeaders(sheet, noCols, headerRow)
    const { items, totals } = getItems(sheet, headers, itemsRow, noRows, isCdr)

    if (true) {
        report = getReport(headers, reports)
    }

    return { headers, items, report, totals }

}


self.onmessage = async e => {

    const { fileObj, id, reports } = e.data
    const reader = new FileReader();

    reader.onload = evt => {

        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });

        const sheets = workbook.Sheets


        let sheet;


        sheet = sheets['Investor Summary']
        let isCdr = true

        if (!sheet) {
            sheet = sheets['Sheet1']
            isCdr = false
        }

        const obj = proccess(sheet, reports, isCdr)

        postMessage({ ...obj, id: id })
        self.close()
    }

    reader.readAsBinaryString(fileObj);
};
