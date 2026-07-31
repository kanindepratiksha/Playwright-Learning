export interface RequestData<T = any> {
    url: string;
    headers: Record<string, string>;
    body?: T;
}
export class ApiRequestBuilder<T = any> {
    private requestData: RequestData<T> = {
        url: "",
        headers: {}
    };
    url(url: string): this {
        this.requestData.url = url;
        return this;
    }
    headers(headers: Record<string, string>): this {
        this.requestData.headers = headers;
        return this;
    }
    body(body: T): this {
        this.requestData.body = body;
        return this;
    }
    build(): RequestData<T> {
        return this.requestData;
    }
}