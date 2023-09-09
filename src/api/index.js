import {APIRequest, METHOD_GET, METHOD_POST, METHOD_PUT} from './api-request';

export const APIURL = {
    API_USER_REGISTER: {
        id: 1,
        url: 'wp-json/digits/v1/create_user',
        type: METHOD_POST,
    },

    API_USER_LOGIN_EMAIL: {
        id: 2,
        url: 'wp-json/digits/v1/login_user',
        type: METHOD_POST,
    },

    API_USER_FORGOT_PASSWORD: {
        id: 3,
        url: 'wp-json/digits/v1/recovery',
        type: METHOD_POST,
    },

    API_USER_LOGOUT: {
        id: 4,
        url: 'wp-json/digits/v1/logout',
        type: METHOD_POST,
    },

    API_USER_SEND_OTP: {
        id: 5,
        url: 'wp-json/digits/v1/send_otp',
        type: METHOD_POST,
    },

    API_USER_RESEND_OTP: {
        id: 6,
        url: 'wp-json/digits/v1/resend_otp',
        type: METHOD_POST,
    },

    API_USER_VERIFY_OTP: {
        id: 7,
        url: 'wp-json/digits/v1/verify_otp',
        type: METHOD_POST,
    },

    API_USER_LOGIN_MOBILE: {
        id: 8,
        url: 'wp-json/digits/v1/login_user',
        type: METHOD_POST,
    },

    API_GET_EXPLORE: {
        id: 9,
        url: 'wp-json/pluc/v1/explore',
        type: METHOD_GET,
    },





    API_GET_GIGS: {
        id: 10,
        url: 'wp-json/pluc/v1/get_gigs',
        type: METHOD_GET,
    },


    API_GET_COURSES: {
        id: 11,
        url: 'wp-json/pluc/v1/get_courses',
        type: METHOD_GET,
    },


    API_GET_GENRES: {
        id: 12,
        url: 'wp-json/pluc/v1/get_genres',
        type: METHOD_GET,
    },


    API_GET_SHORTS: {
        id: 13,
        url: 'wp-json/pluc/v1/get_stories',
        type: METHOD_GET,
    },

    API_GET_USER_PROFILE: {
        id: 14,
        url: 'wp-json/wp/v2/users/me',
        type: METHOD_POST,
    },

    API_GET_GENRE_CONTENT: {
        id: 15,
        url: 'wp-json/pluc/v1/get_genre_content',
        type: METHOD_GET,
    },
    API_GET_SHORTS_CONTENT: {
        id: 16,
        url: 'wp-json/pluc/v1/get_genre_content',
        type: METHOD_GET,
    },
    API_GET_SHOWS_DETAILS: {
        id: 17,
        url: 'wp-json/pluc/v1/get_show_details',
        type: METHOD_GET,
    },
    API_GET_EPISODE_DETAILS: {
        id: 18,
        url: 'wp-json/pluc/v1/get_episodes',
        type: METHOD_GET,
    },
    API_GET_CREATOR_DETAILS: {
        id: 19,
        url: 'wp-json/pluc/v1/get_creators',
        type: METHOD_GET,
    },
    API_GET_SHOWS: {
        id: 20,
        url: 'wp-json/pluc/v1/get_shows',
        type: METHOD_GET,
    },
    API_POST_UPLOAD_MEDIA: {
        id: 21,
        url: 'wp-json/wp/v2/media',
        type: METHOD_GET,
    },
    API_POST_VIDEO_DATA: {
        id: 22,
        url: 'wp-json/pluc/v1/video_upload',
        type: METHOD_POST,
    },

    API_GET_EVENTS: {
        id: 23,
        url: 'wp-json/pluc/v1/get_events',
        type: METHOD_GET,
    },

    API_FOLLOW_UNFOLLOW: {
        id: 24,
        url: 'wp-json/pluc/v1/follow_unfollow',
        type: METHOD_POST,
    },
};

export class RequestManager {
    doRequest = (requestURLObject, param, onResponse, onError) => {
        let queryParam = null;
        let url = null;
        let requestBuilder = new APIRequest.Builder();

        switch (requestURLObject.id) {
            default: {
                switch (requestURLObject.type) {
                    case METHOD_GET: {
                        requestBuilder.get();
                        requestBuilder.jsonParams(param);
                        break;
                    }

                    case METHOD_POST: {
                        requestBuilder.post();
                        requestBuilder.jsonParams(param);
                        break;
                    }

                    case METHOD_PUT: {
                        requestBuilder.put();
                        requestBuilder.jsonParams(param);
                        break;
                    }

                    default: {
                        break;
                    }
                }

                break;
            }
        }

        url = requestURLObject.url;

        if (requestURLObject.urlParam) {
            queryParam = this.objectToQuerystring(requestURLObject.urlParam);
            url = `${url}${queryParam}`;
        }

        requestBuilder.setReqId(requestURLObject.id);
        requestBuilder.reqURL(url);

        if (onResponse) {
            requestBuilder.response(onResponse);
        }

        if (onError) {
            requestBuilder.error(onError);
        }

        requestBuilder.build().doRequest();
    };

    objectToQuerystring = obj => {
        let length = Object.keys(obj).length;

        return Object.keys(obj).reduce(function (str, key, i) {
            var delimiter, val;

            delimiter = i === 0 ? '?' : '&';
            key = encodeURIComponent(key);
            val = encodeURIComponent(obj[key]);

            if (typeof obj[key] === 'undefined' || obj[key] == '') {
                //s   return (i === 0 && length > 1) ? '?' : '';
            }

            return [str, delimiter, key, '=', val].join('');
        }, '');
    };
}

export {APIRequest};
