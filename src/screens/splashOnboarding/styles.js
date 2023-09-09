import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from 'src/utils/Colors';
import {Dimensions} from 'react-native';
import {Fonts} from "../../utils/theme";

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(100);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth;

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    image: {
        width: '250rem',
        height: '300rem'
    },
    slider: {
        paddingBottom: '28rem',
        overflow: 'visible',
        height: '85%',
        maxHeight: '85%',
        flex: 1,
    },
    sliderContentContainer: {},
    paginationContainer: {
        paddingVertical: '8rem',
    },
    paginationDot: {
        width: '8rem',
        height: '8rem',
        borderRadius: '4rem',
        marginHorizontal: '8rem'
    },
    sliderItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 0,
    },
    inactiveDot: {
        width: '8rem',
        height: '8rem',
        borderRadius: '4rem',
        marginHorizontal: '8rem',
        borderColor: Colors.white,
        borderWidth: '1rem',
        fontSize: '16rem'
    },
    titleView: {
        alignItems: 'center',
        marginHorizontal:'20rem'
    },
    title: {
        fontSize: '22rem',
        fontFamily: Fonts.bold,
        color:Colors.white4,
        textAlign:'center',
        marginTop:'20rem'
    },
    subTitle: {
        fontSize: '14rem',
        fontFamily: Fonts.regular,
        color:Colors.white4,
        textAlign:'center',
        marginTop:'20rem'
    },
});

export default styles;
