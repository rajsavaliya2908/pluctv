import {Colors} from './Colors';
import EStyleSheet from "react-native-extended-stylesheet";
import {Fonts} from "./Fonts";


const CommonStyles = EStyleSheet.create({
    keyboardScrollview: {
        flexGrow: 1,
        paddingVertical: 8
    },
    authTitleContainer:{
        paddingVertical: '42rem',
    },
    authContainer:{
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: '16rem',
        paddingHorizontal: '20rem',
    },
    authMainTitle: {
        fontSize: '56rem',
        fontFamily: Fonts.bold,
        color: Colors.white,
        lineHeight:'60rem',
    },
    authSubText: {
        fontSize: '14rem',
        lineHeight:'16rem',
        fontFamily: Fonts.regular,
        color: Colors.white,
    },
    containerBlock: {
        flex: 1,
    },
    safeAreaContainer: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white
    },
    containerCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerCenterStretch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    rowContainer: {
        flexDirection: 'row',
    },
    rowCenterContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowSpaceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerSpaceBlock: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default CommonStyles;
