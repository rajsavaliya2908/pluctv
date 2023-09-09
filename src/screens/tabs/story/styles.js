import {Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {Colors, Fonts, SCREEN_WIDTH} from 'src/utils/theme';

const styles = EStyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
  flexView: {flex: 1},
  tabView: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
  },
  header: {
    position: 'absolute',
    zIndex: 10,
    marginTop: Platform.OS === 'ios' ? (isIphoneX() ? 35 : 15) : 0,
  },
  bottomTab: {
    height: isIphoneX() ? 90 : 60,
  },
  outerCircle: {
    backgroundColor: Colors.white,
    width: '75rem',
    height: '75rem',
    borderRadius: '38rem',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: '60rem',
    height: '60rem',
    borderRadius: '30rem',
    backgroundColor: Colors.red1,
  },
  innerCircle2: {
    width: '20rem',
    height: '20rem',
    borderRadius: '5rem',
    backgroundColor: Colors.red1,
  },
  buttonsView: {
    position: 'absolute',
    bottom: isIphoneX() ? 40 : 20,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rotateButton: {
    position: 'absolute',
    right: '40rem',
  },
  rotateImage: {
    width: '28rem',
    height: '28rem',
  },
  // Video Submitting
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
