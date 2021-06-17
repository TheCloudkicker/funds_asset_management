import xlsxFile from 'read-excel-file'
import XLSX from 'xlsx'


export const parseXLSXFile = (file) => {

    console.log('Parsing XLSX File')

    let excelData = xlsxFile(file).then((rows) => {

        let data = []

        rows.forEach((col) => {

            data.push(col)

            console.log('col', col)
            // col.forEach((data) => {



            //     console.log('data', data)
            //     // console.log(data);
            //     // console.log(typeof data);
            // })
        })

        return data
    })
    return excelData

}


