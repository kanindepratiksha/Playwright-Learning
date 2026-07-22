import fs from 'fs';
import csv from 'csv-parser';
export class CsvReader {
    static readCsv(filePath: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            try {
                const results: any[] = [];
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', (data) => results.push(data))
                    .on('end', () => resolve(results))
                    .on('error', (error) => {
                        reject(
                            new Error(
                                `Failed to read CSV file '${filePath}'. ${error.message}`
                            )
                        );
                    });
            } catch (error) {
                reject(
                    new Error(
                        `Failed to read CSV file '${filePath}'. ${
                            error instanceof Error
                                ? error.message
                                : String(error)
                        }`
                    )
                );
            }
        });
    }
}