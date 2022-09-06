import { urlJoin, defer, jsonToString, IRequest, IRequestBase, IRequestInit, IInterceptors, IUrl, IObject, IRequestBody, IRequestOptions } from "./index.js"
import { request } from "node:http"
import { parse } from "node:url"
class Interceptors implements IInterceptors {
    private requestSuccess: Function
    private responseSuccess: Function
    private error: Function
    use(type, fn) {
        switch (type) {
            case "request":
                this.requestSuccess = fn
                break;
            case "response":
                this.responseSuccess = fn
                break;
            case "error":
                this.error = fn
                break;
        }
        return this
    }
    get reqFn() {
        return this.requestSuccess
    }
    get resFn() {
        return this.responseSuccess
    }
    get errFn() {
        return this.error
    }
}
abstract class RequestBase extends Interceptors implements IRequestBase {
    readonly origin: string
    constructor(origin) {
        super()
        this.origin = origin ?? ''
    }
    abstract fetch(url, opts): Promise<void>
    abstract http(url, opts): Promise<void>

    chackUrl = (url: string) => {
        return url.startsWith('/')
    }

    fixOrigin = (fixStr: string) => {
        if (this.chackUrl(fixStr)) return this.origin + fixStr
        return fixStr
    }

    envDesc = () => {
        if (typeof Window !== "undefined") {
            return "Window"
        }
        return "Node"
    }

    errorFn = reject => err => reject(this.errFn?.(err) ?? err)

    clearTimer = opts => !!opts.timer && (clearTimeout(opts.timer), opts.timer = null)

    initAbort = (params) => {
        const { controller, timer, timeout } = params
        !!!timer && (params.timer = setTimeout(() => controller.abort(), timeout))
        return params
    }

    requestType = () => {
        switch (this.envDesc()) {
            case "Window":
                return this.fetch
            case "Node":
                return this.http
        }
    }

    getDataByType = (type, response) => {
        switch (type) {
            case "text":
            case "json":
            case "blob":
            case "formData":
            case "arrayBuffer":
                return response[type]()
            default:
                return response['json']()
        }
    }

}
abstract class RequestInit extends RequestBase implements IRequestInit {
    constructor(origin) {
        super(origin)
    }
    abstract fetch(url, opts): Promise<void>
    abstract http(url, opts): Promise<void>
    initDefaultParams = (url, { method = "GET", query = {}, headers = {}, body = null, timeout = 30 * 1000, controller = new AbortController(), type = "json", ...others }) => ({
        url: urlJoin(this.fixOrigin(url), query), method, headers, body: method === "GET" ? null : jsonToString(body), timeout, signal: controller?.signal, controller, type, timer: null, ...others
    })

    initFetchParams = (url, opts) => {
        const params = this.initAbort(this.initDefaultParams(url, opts))
        return this.reqFn?.(params) ?? params
    }

    initHttpParams = (url, opts) => {
        const params = this.initAbort(this.initDefaultParams(url, opts))
        const options = parse(params.url, true)
        return this.reqFn?.({ ...params, ...options }) ?? params
    }
}
export class Request extends RequestInit implements IRequest {
    private request: Function
    constructor(origin) {
        super(origin)
        this.request = this.requestType()
    }

    fetch = (_url, _opts) => {
        const { promise, resolve, reject } = defer()
        const { url, ...opts } = this.initFetchParams(_url, _opts)
        const { signal } = opts
        signal.addEventListener('abort', () => this.errorFn(reject));
        fetch(url, opts).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return this.getDataByType(opts.type, response)
            }
            return this.errorFn(reject)
        }).then(res => resolve(this.resFn?.(res) ?? res)).catch(this.errorFn(reject)).finally(() => this.clearTimer(opts))
        return promise
    }

    http = (_url, _opts) => {
        const { promise, resolve, reject } = defer()
        const params = this.initHttpParams(_url, _opts)
        const { signal } = params
        const req = request(params, (response) => {
            if (response.statusCode >= 200 && response.statusCode < 300) {
                let data = "";
                response.setEncoding('utf8');
                response.on('data', (chunk) => data += chunk);
                return response.on("end", () => resolve(this.resFn?.(data) ?? data));
            }
            return this.errorFn(reject)(response?.statusMessage)
        })
        signal.addEventListener('abort', () => this.errorFn(reject)(req.destroy(new Error('request timeout'))));
        req.on('error', this.errorFn(reject));
        req.end();
        return promise
    }

    GET = (url?: IUrl, query?: IObject<any>, _?: IRequestBody | void, opts?: IRequestOptions) => {
        return this.request(url, { query, method: "GET", ...opts })
    }

    POST = (url?: IUrl, query?: IObject<any>, body?: IRequestBody, opts?: IRequestOptions) => {
        return this.request(url, { query, method: "POST", body, ...opts })
    }

    PUT = (url?: IUrl, query?: IObject<any>, body?: IRequestBody, opts?: IRequestOptions) => {
        return this.request(url, { query, method: "PUT", body, ...opts })
    }

    DELETE = (url?: IUrl, query?: IObject<any>, body?: IRequestBody, opts?: IRequestOptions) => {
        return this.request(url, { query, method: "DELETE", body, ...opts })
    }

    OPTIONS = (url?: IUrl, query?: IObject<any>, body?: IRequestBody, opts?: IRequestOptions) => {
        return this.request(url, { query, method: "OPTIONS", body, ...opts })
    }

    HEAD = (url?: IUrl, query?: IObject<any>, body?: IRequestBody, opts?: IRequestOptions) => {
        return this.request(url, { query, method: "HEAD", body, ...opts })
    }

    PATCH = (url?: IUrl, query?: IObject<any>, body?: IRequestBody, opts?: IRequestOptions) => {
        return this.request(url, { query, method: "PATCH", body, ...opts })
    }
}
