import { Logger } from './Logger';
export class RetryUtil {
    static async execute<T>(
        action: () => Promise<T>,
        retries: number = 3,
        delay: number = 1000
    ): Promise<T> {
        let lastError: unknown;
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                return await action();
            } catch (error) {
                lastError = error;
                Logger.warn(
                    `Retry ${attempt}/${retries} failed. Retrying in ${delay} ms...`
                );
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        Logger.error('Retry attempts exhausted.');
        throw lastError;
    }
}