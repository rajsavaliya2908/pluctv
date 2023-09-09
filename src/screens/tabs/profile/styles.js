import EStyleSheet from 'react-native-extended-stylesheet';
import {Fonts} from "src/utils/Fonts";
import {Colors} from "../../../utils/theme";

const styles = EStyleSheet.create({
    container: {
        flex: 1
    },
    profileImage: {
        height: '70rem',
        width: '70rem',
        borderRadius: '70rem',
        marginRight: '10rem'
    },
    profileCover: {
        width: '100%',
        height: '250rem',
    },
    profileContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flex: 1,
        padding: '10rem'
    },
    viewCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoutView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingVertical:'6rem',
        paddingHorizontal:'10rem',
        backgroundColor:Colors.yellow1,
        position:'absolute',
        right:'10rem',
        top:'10rem',
        borderRadius:'30rem',
        zIndex:1111
    },
    userName: {
        fontSize: '18rem',
        fontFamily: Fonts.bold,
        color:Colors.white
    },
    logout: {
        fontSize: '14rem',
        fontFamily: Fonts.bold,
        color:Colors.primary
    },
    videoContainer: {
        padding: '20rem'
    },
  btnContainer:{
      marginVertical:'10rem'
  }
});

export default styles;
