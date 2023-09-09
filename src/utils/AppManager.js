import React from 'react';
import {
    DeviceEventEmitter,
} from 'react-native';


import {AppNotificationKey} from './Const';


export default class AppManager {

    static instance = null;


    /**
     * @returns {AppManager}
     **/

    static getInstance() {
        if (AppManager.instance == null) {
            AppManager.instance = new AppManager();
        }

        return this.instance;
    }


    notifyUserUnAuthorized = () => {
        DeviceEventEmitter.emit(AppNotificationKey.UNAUTHORIZED_USER);
    };


}
