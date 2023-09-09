import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, IS_IOS, Fonts} from 'src/utils/theme';

const styles = EStyleSheet.create({
  container: {
    //padding:'16rem',
    // height: '69%',
    marginBottom: '16rem',
    borderRadius: '4rem',
    overflow: 'hidden',
  },
  backImage: {
    height: '100%',
    width: '100%',
    //padding:'16rem',
    borderRadius: 4,
  },
  description: {
    marginTop: '6rem',
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: '12rem',
    marginBottom: '12rem',
    lineHeight: '16rem',
  },
  title: {
    fontSize: '20rem',
    fontFamily: Fonts.bold,
    color: Colors.white,
    marginBottom: '6rem',
  },
  viewCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomView: {
    // minHeight: IS_IOS ? 150 : 130,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: '16rem',
    paddingBottom: '8rem',
  },
  episodeView: {
    alignSelf: 'flex-start',
    padding: 8,
    backgroundColor: Colors.grey1,
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 30,
  },
  menu: {
    alignSelf: 'flex-end',
    padding: 15,
  },
  location: {
    fontSize: '10rem',
    color: Colors.greyText,
  },
  dotsView: {
    height: 5,
    width: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: Colors.greyText,
  },
  episodeTitle: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: '12rem',
  },
});

export default styles;
