export class ApiHeaders {
    static json() {
        return {
            "Content-Type": "application/json",
            Accept: "application/json"
        };
    }
    static auth(token: string) {
        return {
            "Content-Type": "application/json",
            Accept: "application/json",
            Cookie: `token=${token}`
        };
    }
}