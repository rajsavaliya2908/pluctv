import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from 'src/utils/Colors';


const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    image: {
        width:'120rem',
        height: '120rem'
    },
});

export default styles;
