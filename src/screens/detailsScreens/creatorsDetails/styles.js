import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, SCREEN_WIDTH, SCREEN_HEIGHT, Fonts} from 'src/utils/theme';
import {Platform} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

const styles = EStyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.primary},
  header: {
    position: 'absolute',
    zIndex: 10,
    marginTop: Platform.OS === 'ios' ? (isIphoneX() ? 30 : 15) : 0,
  },
  flexRow: {flexDirection: 'row', alignItems: 'center'},
  topView: {
    height: '250rem',
    justifyContent: 'flex-end',
  },
  coverImage: {
    width:'100%',
    height: '250rem',
    position: 'absolute',
  },
  profilesView: {
    flexDirection: 'row',
    marginHorizontal: '20rem',
    marginVertical: '15rem',
    alignItems: 'center',
  },
  profileImage: {
    width: '80rem',
    height: '80rem',
    borderRadius: '40rem',
  },
  userDetailsView: {
    marginLeft: '8rem'
  },
  locationIcon: {marginRight: 6},
  font12: {
    fontSize: '12rem',
    color: Colors.grey1,
    fontFamily: Fonts.regular,
  },
  followButton: {
    right: 0,
    position: 'absolute',
    backgroundColor: Colors.grey,
    borderColor: Colors.yellow1,
    borderWidth: '1rem',
    borderRadius: '4rem',
    height:'32rem',
    paddingHorizontal: '12rem',
    alignItems:'center',
    justifyContent:'center'
  },

  unFollowButton: {
    right: 0,
    position: 'absolute',
    backgroundColor: Colors.yellow1,
    borderRadius: '4rem',
    height:'32rem',
    paddingHorizontal: '12rem',
    alignItems:'center',
    justifyContent:'center'
  },
  status: {fontSize: '12rem', marginTop: 4, marginBottom: '8rem'},
  font16: {
    fontSize: '16rem',
    fontFamily: Fonts.bold,
    color: Colors.white
  },
  buttonFollow: {
    fontSize: '14rem',
    fontFamily: Fonts.regular,
    color: Colors.yellow1
  },
  buttonUnFollow: {
    fontSize: '14rem',
    fontFamily: Fonts.regular,
    color: Colors.primary
  },
  aboutDesc: {
    fontSize: '14rem',
    fontFamily: Fonts.medium,
    color: Colors.white3,
    marginVertical:'14rem',
    lineHeight:'18rem',
  },
  aboutView: {
    marginHorizontal: '20rem',
    marginVertical: '16rem',
  },
  learnMoreButton: {
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: '8rem',
    borderRadius: '4rem',
    borderColor: Colors.yellow1,
  },
  showImage: {
    marginRight: 16,
    width: '152rem',
    height: '190rem',
    borderRadius: '4rem',
  },
  image: {
    borderRadius: '4rem',
    width: '100%',
    height: '100%',
  },
  episodeImage: {
    height: '170rem',
    width: SCREEN_WIDTH - 40,
    marginBottom: '16rem',
    marginRight: '18rem',
    borderRadius: '4rem',
  },
});

export default styles;
