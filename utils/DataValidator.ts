export class DataValidator {
    static validateUser(user: any) {
        if (!user.username) {
            throw new Error('Username is missing.');
        }
        if (!user.password) {
            throw new Error('Password is missing.');
        }
        if (!user.expected) {
            throw new Error('Expected result is missing.');
        }
    }
    static validateUsers(users: any[]) {
        if (!Array.isArray(users)) {
            throw new Error('Test data must be an array.');
        }
        if (users.length === 0) {
            throw new Error('Test data is empty.');
        }
        users.forEach((user) => {
            this.validateUser(user);
        });
    }
}