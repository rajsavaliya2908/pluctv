import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from 'src/utils/theme';

const styles = EStyleSheet.create({
    container: {
        paddingVertical: '20rem',
        flex: 1,
    },
    viewFlex: {
        flex: 1,
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    notificationItem: {
        padding: '20rem',
        paddingVertical: '20rem',
        flexDirection: 'row',
        alignItems: 'center'
    },
    notificationTitle: {
        fontSize: '14rem',
        flex: 1,
        color: Colors.white1,
        lineHeight:'20rem',
        fontFamily: Fonts.regular
    },
    notificationTime: {
        fontSize: '14rem',
        flex: 1,
        color: Colors.yellow1
    },
    userImage: {
        height: '40rem',
        width: '40rem',
        borderRadius: '20rem',
        marginRight: '10rem'
    },
    readDot: {
        flex: 0,
        height: '10rem',
        width: '10rem',
        borderRadius: '10rem',
        backgroundColor: Colors.yellow1
    }
});

export default styles;
