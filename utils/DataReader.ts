import fs from 'fs';
import path from 'path';
export class DataReader {
    static readJson(fileName: string) {
        const filePath = path.resolve(
            __dirname,
            '..',
            'testdata',
            fileName
        );
        return JSON.parse(
            fs.readFileSync(filePath, 'utf-8')
        );
    }
}