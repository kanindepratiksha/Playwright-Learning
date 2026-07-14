import * as fs from 'fs';
export class DataReader {
    static readJson(filePath: string) {
        return JSON.parse(
            fs.readFileSync(filePath, 'utf8')
        );
    }
}