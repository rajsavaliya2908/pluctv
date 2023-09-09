import Toast from 'react-native-simple-toast';

export const ShowToast = (msg) => {
    Toast.show(msg, Toast.SHORT, [
        'UIAlertController',
    ])
};
