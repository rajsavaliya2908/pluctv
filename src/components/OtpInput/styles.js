import {StyleSheet} from 'react-native';
import {Colors, Fonts} from "src/utils/theme";


const styles = StyleSheet.create({
    defaultTextFieldStyle: {
        width: 40,
        height: 40,
        borderColor: Colors.white,
        borderWidth: 1,
        borderRadius: 20,
        textAlign: 'center',
        color: Colors.white,
        fontFamily: Fonts.regular,
        fontSize: 16
    },
    tDash: {
        marginHorizontal: 10
    },
    vInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default styles;
