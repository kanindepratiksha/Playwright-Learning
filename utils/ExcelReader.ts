import * as XLSX from 'xlsx';

export class ExcelReader {

    static readExcel(filePath: string, sheetName: string) {

        const workbook = XLSX.readFile(filePath);

        const worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
            throw new Error(`Sheet '${sheetName}' not found.`);
        }

        return XLSX.utils.sheet_to_json(worksheet);

    }

}