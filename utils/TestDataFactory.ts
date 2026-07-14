import path from 'path';
import { DataReader } from './DataReader';
import { ExcelReader } from './ExcelReader';
import { CsvReader } from './CsvReader';
export class TestDataFactory {
    static getJsonUsers() {
    const filePath = path.join(
        process.cwd(),
        'testdata',
        'users.json'
    );
    const users = DataReader.readJson(filePath);
    return users;
}
    static getExcelUsers() {
        return ExcelReader.readExcel(
            path.join(process.cwd(), 'testdata', 'Users.xlsx'),
            'users'
        );
    }
    static async getCsvUsers() {
        return await CsvReader.readCsv(
            path.join(process.cwd(), 'testdata', 'users.csv')
        );
    }
}