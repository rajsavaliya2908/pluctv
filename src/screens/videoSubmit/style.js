import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {Colors, Fonts} from 'src/utils/theme';

const styles = EStyleSheet.create({
  videoTitle: {
    paddingVertical: 0,
    height: 45,
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  titleContainer: {
    flex: 0,
    marginHorizontal: '20rem',
    marginVertical: '8rem',
  },
  button: {
    marginHorizontal: '20rem',
    marginVertical: '8rem',
    backgroundColor: Colors.yellow1,
    paddingVertical: '11rem',
    alignItems: 'center',
    borderRadius: '4rem',
  },
  buttonText: {color: Colors.black1, fontFamily: Fonts.regular},
});

export default styles;
