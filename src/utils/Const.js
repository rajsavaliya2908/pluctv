const ResponseCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    UNPROCESSABLE_REQUEST: 422,
    INTERNAL_SERVER_ERROR: 500,
    TOKEN_INVALID: 503,
    NO_INTERNET: 522,
    BAD_GATEWAY: 502,
};

const API_URL = 'https://pluctv.wmdtechnology.com/';


// internal app notifications key
const AppNotificationKey = {
    UNAUTHORIZED_USER: 'UNAUTHORIZED_USER',
};


const AuthType = {
    LOGIN:'login',
    REGISTER:'register',
    RESET_PASSWORD:'resetpass',
    UPDATE_PHONE:'update',
}


const ExploreContentType = {
    CREATORS:'CREATORS',
    EPISODES:'EPISODES',
    PLUC_ORIGINALS:'PLUC_ORIGINALS',
    STORIES:'STORIES',
    SHOWS:'SHOWS',
}

// JW Player Key: wTliac79
// Secret: GuoF4GfNwbhKaRx89CwLndMv

export {
    ResponseCode,
    API_URL,
    AppNotificationKey,
    AuthType,
    ExploreContentType
};







