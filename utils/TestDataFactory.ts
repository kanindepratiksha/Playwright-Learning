import path from 'path';
import { DataReader } from './DataReader';
import { ExcelReader } from './ExcelReader';
import { CsvReader } from './CsvReader';
import { ExcelUser } from './types';
export class TestDataFactory {
    static getJsonUsers() {
        const filePath = path.join(
            process.cwd(),
            'testdata',
            'users.json'
        );
        return DataReader.readJson(filePath);
    }
    static getExcelUsers(): ExcelUser[] {
        return ExcelReader.readExcel(
            path.join(
                process.cwd(),
                'testdata',
                'users.xlsx'
            ),
            'users'
        ) as ExcelUser[];
    }
    static async getCsvUsers() {
        return await CsvReader.readCsv(
            path.join(
                process.cwd(),
                'testdata',
                'users.csv'
            )
        );
    }
}