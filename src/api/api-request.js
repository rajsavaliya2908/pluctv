import { axiosInstance } from "./api-instance";
import {
    ResponseCode,
} from '../utils/Const';
import qs from "qs";


export const METHOD_GET = "get";
export const METHOD_POST = "post";
export const METHOD_PUT = "put";
export const REQ_JSON = "json";
export const REQ_FORM_DATA = "form-data";

export class APIRequest {
    doRequest() {
        const isInternet = true;
        if (isInternet) {
            const options = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': 'PHPSESSID=g738j3k1ovu9apphtjvsob25fu; digits_countrycode=91; wordpress_logged_in_1626afd73032762450802ee1744ede79=safi%7C1663199355%7CaV6iQJYvPcHA0vGKgyab2SsejHg0X9d1adb4yWmB1G3%7C61e2efff076aa56632fdc61287e4a8cdad6bd063fc3c8406c6971be47b04b87d',
                    'Accept': '*/*'
                }
            }
            switch (this.method) {
                case METHOD_GET:
                    axiosInstance.get(this.url,this.params,options)
                        .then(response => this.onAPIResponse(response))
                        .catch(error => this.onAPIError(error));
                    break;

                case METHOD_PUT:
                    axiosInstance.put(this.url, this.params)
                        .then(response => this.onAPIResponse(response))
                        .catch(error => this.onAPIError(error));
                    break;

                case METHOD_POST:
                default:
                    axiosInstance.post(this.url, this.params, options)
                        .then(response => this.onAPIResponse(response))
                        .catch(error => this.onAPIError(error));
                    break;
            }
        } else {
            this.onAPIError({
                status: ResponseCode.NO_INTERNET,
                meta: {
                    message: 'Internet connection not available.'
                }
            })
        }
    }

    onAPIResponse = (response) => {
        this.onResponse(response, this.reqID);
    };

    onAPIError = (error) => {
        this.onError(error, this.reqID);
    };

    static Builder = class {

        constructor() {
            this.axios = new APIRequest();
        }

        reqURL(url) {
            this.axios.url = url;
            return this;
        }

        post() {
            this.axios.method = METHOD_POST;
            return this;
        }

        get() {
            this.axios.method = METHOD_GET;
            return this;
        }

        put() {
            this.axios.method = METHOD_PUT;
            return this;
        }

        jsonParams(params) {
            this.axios.reqType = REQ_JSON;
            this.axios.params = qs.stringify(params);
            return this;
        }

        params(key, value) {
            this.axios.reqType = REQ_FORM_DATA;
            if (this.axios.params === undefined || this.axios.params === null) {
                this.axios.params = new FormData();
            }
            this.axios.params.append(key, value);
            return this;
        }

        addFile(key, uri, type = "image/jpeg", name = "") {
            this.axios.reqType = REQ_FORM_DATA;

            // this.config = {
            //     ...this.config,
            //     'Content-Type': 'multipart/form-data'
            // }

            if (this.axios.params === undefined || this.axios.params === null) {
                this.axios.params = new FormData();
            }
            this.axios.params.append(key, {
                uri: uri,
                type: type, // or photo.type
                name: name
            });
            return this;
        }

        setReqId(reqID) {
            this.axios.reqID = reqID;
            return this;
        }

        setLoading(isLoading) {
            this.axios.isLoading = isLoading;
            return this;
        }

        response(onResponse) {
            this.axios.onResponse = onResponse;
            return this;
        }

        error(onError) {
            this.axios.onError = onError;
            return this;
        }

        build() {
            return this.axios;
        }
    }
}
