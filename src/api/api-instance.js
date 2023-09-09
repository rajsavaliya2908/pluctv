import axios from 'axios';
import {
    ResponseCode,
    API_URL,
} from '../utils/Const';
import {Store} from '../redux/Store';
import AppManager from '../utils/AppManager';


let axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Store.subscribe(listener);

// add default token in authenticate apis
function listener() {
    if (Store.getState()?.UserReducer?.apiToken) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${Store.getState().UserReducer.apiToken}`;
    }
}

// return request config or request error
axiosInstance.interceptors.request.use(
    async (config) => {
        console.log('Request parameter :: ', config);
        return config;
    },
    error => Promise.reject(error),
);

// user axios interceptors for change response and error as we want
axiosInstance.interceptors.response.use((response) => {
    console.log(response, 'response of api');
    let dataResponse = {
        status: response.status,
        success: response?.data?.success !== undefined ? response.data.success : null,
        data: response?.data?.data !== undefined ? response.data.data : response.data,
        headers: response.headers !== undefined ? response.headers : null,
    };
    console.log('Response :: ', dataResponse);
    return Promise.resolve(dataResponse);
}, (error) => {
    let errorResponse = {
        status: error.response !== undefined ? error.response.status : ResponseCode.INTERNAL_SERVER_ERROR,
        data: error.response.data !== undefined ? error.response.data : undefined,
    };
    console.log('error :: ', error.response);
    if (Store.getState()?.UserReducer?.apiToken && error.response && error.response.status && error.response.status === 401) {
        AppManager.getInstance().notifyUserUnAuthorized();
    }

    switch (errorResponse.status) {
        case ResponseCode.NOT_FOUND:
            /*  showToast("Error",
                  errorResponse.meta !== undefined ? errorResponse.meta.message : "Sorry, Not Found",
                  ToastType.ERROR);*/
            break;
        case ResponseCode.BAD_GATEWAY:
            /*    showToast("Error",
                    errorResponse.meta !== undefined ? errorResponse.meta.message : "Something went wrong. Please try again.",
                    ToastType.ERROR);*/
            break;
        case ResponseCode.INTERNAL_SERVER_ERROR:
            /*  showToast("Error",
                  errorResponse.meta !== undefined ? errorResponse.meta.message : "Server Error. Please try again.",
                  ToastType.ERROR);*/
            break;
        case ResponseCode.TOKEN_INVALID:
            // store.dispatch(Actions.logout());
            // DeviceEventEmitter.emit(Constants.AppNotificationKey.FORCE_LOGOUT, {});
            /*  showToast("Error",
                  errorResponse.meta !== undefined ? errorResponse.meta.message : "Server Error. Please try again.",
                  ToastType.ERROR);*/
            break;
        case ResponseCode.UNAUTHORIZED:


            // store.dispatch(Actions.logout());
            // DeviceEventEmitter.emit(Constants.AppNotificationKey.FORCE_LOGOUT, {});
            /*  showToast("Error",
                  errorResponse.meta !== undefined ? errorResponse.meta.message : "Server Error. Please try again.",
                  ToastType.ERROR);*/
            break;


    }
    return Promise.reject(errorResponse);
});

export {
    axiosInstance,
};
