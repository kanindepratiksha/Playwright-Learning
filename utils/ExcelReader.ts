import * as XLSX from 'xlsx';
export class ExcelReader {
    static readExcel(filePath: string, sheetName: string) {
        try {
            const workbook = XLSX.readFile(filePath);
            const worksheet = workbook.Sheets[sheetName];
            if (!worksheet) {
                throw new Error(
                    `Sheet '${sheetName}' not found in file '${filePath}'.`
                );
            }
            return XLSX.utils.sheet_to_json(worksheet);
        } catch (error) {
            throw new Error(
                `Failed to read Excel file '${filePath}'. ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        }
    }
}