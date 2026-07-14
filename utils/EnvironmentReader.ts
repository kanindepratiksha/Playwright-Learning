import path from 'path';
import { DataReader } from './DataReader';
export class EnvironmentReader {
    static getUsers() {
        const environment = process.env.TEST_ENV || 'qa';
        const filePath = path.join(
            process.cwd(),
            'testdata',
            `${environment}-users.json`
        );
        return DataReader.readJson(filePath);
    }
}