import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, SCREEN_WIDTH, SCREEN_HEIGHT, Fonts} from 'src/utils/theme';
import {Platform} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

const styles = EStyleSheet.create({
  scrollContainer: {paddingBottom: '30rem'},
  backButton: {
    paddingVertical: '18rem',
    paddingHorizontal: '8rem',
    position: 'absolute',
    zIndex: 10,
    marginTop: Platform.OS === 'ios' ? (isIphoneX() ? 35 : 0) : 0,
  },
  topImageBack: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  gradient: {
    justifyContent: 'center',
    //padding: '16rem',
  },
  contentView:{
    paddingHorizontal: '20rem',
    paddingVertical: '20rem',
  },
  imageView:{
    paddingHorizontal: '12rem',
  },
  showsTitle: {
    fontFamily: Fonts.bold,
    color: Colors.white1,
    fontSize: '22rem',
    marginBottom: '15rem',
    lineHeight:'28rem'
  },
  desc: {
    fontFamily: Fonts.regular,
    color: Colors.white2,
    fontSize: '14rem',
    lineHeight: '18rem',
    marginBottom: '15rem',
  },
  usersData: {flexDirection: 'row', alignItems: 'center'},
  groupImageView: {marginRight: '12rem'},
  name: {
    color: Colors.white2,
    fontSize: '12rem',
    fontFamily: Fonts.regular,
  },
  more: {
    color: Colors.white2,
    fontSize: '12rem',
    fontFamily: Fonts.medium,
  },
  followButton: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.yellow1,
    borderWidth: '1rem',
    alignSelf: 'flex-start',
    marginTop: '16rem',
    height:'40rem',
    alignItems:'center',
    justifyContent:'center',
    width:'140rem',
    borderRadius: '4rem',
  },
  unFollowButton: {
    backgroundColor: Colors.yellow1,
    alignSelf: 'flex-start',
    marginTop: '16rem',
    height:'40rem',
    alignItems:'center',
    justifyContent:'center',
    width:'140rem',
    borderRadius: '4rem',
  },
  follow: {
    color: Colors.yellow1,
    fontFamily: Fonts.regular,
    fontSize: '14rem',
  },
  unFollow: {
    color: Colors.black1,
    fontFamily: Fonts.regular,
    fontSize: '14rem',
  },
  episodeHeader: {
    marginLeft: '16rem',
    color: Colors.white2,
    fontFamily: Fonts.bold,
    fontSize: '18rem',
    marginBottom: '16rem',
    paddingTop: '16rem',
    lineHeight:'18rem'
  },
  episodeView: {
    width: SCREEN_WIDTH - 48,
    marginRight: '16rem',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: Colors.grey,
    marginBottom: '16rem',
  },
  episodeSubView: {padding: '16rem'},
  episodeImage: {width: '100%', height: '170rem'},
  dot: {
    marginTop: -6,
    marginHorizontal: '8rem',
    color: Colors.grey4,
  },
  cardEpisode: {
    fontSize: '10rem',
    color: Colors.grey4,
    fontFamily: Fonts.regular,
  },
  episodeTitle: {
    color: Colors.white2,
    fontSize: '18rem',
    fontFamily: Fonts.bold,
    marginTop: '8rem',
    lineHeight:'24rem'
  },
  showDesc: {
    color: Colors.grey1,
    marginHorizontal: '16rem',
    fontSize: '16rem',
    fontFamily: Fonts.regular,
    marginBottom: '16rem',
  },
  columnStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: '18rem',
  },
  showContainer: {
    backgroundColor: Colors.grey,
    // marginRight: '16rem',
    borderRadius: '4rem',
    padding: '16rem',
    alignItems: 'center',
    width: '48%',
    marginBottom: '14rem',
  },
  userImages: {
    width: '120rem',
    height: '120rem',
    borderRadius: '60rem',
    marginBottom: '15rem',
  },
  userName: {
    color: Colors.white2,
    fontFamily: Fonts.bold,
    fontSize: 14,
    minHeight: 40,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  status: {
    color: Colors.grey1,
    fontSize: '14rem',
    fontFamily: Fonts.regular,
    marginBottom: '13rem',
    textAlign: 'center',
  },
  followButton1: {
    width: '90rem',
    borderWidth: 1,
    borderColor: Colors.yellow1,
    borderRadius: '4rem',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: '5rem',
    marginTop: '15rem',
  },
  followText: {
    color: Colors.yellow1,
    fontFamily: Fonts.regular,
    fontSize: '15rem',
  },
  dropdownMain: {
    width: '125rem',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: '4rem',
    marginBottom: '20rem',
    height: '40rem',
    justifyContent: 'center',
    paddingLeft: '12rem',
  },
  dropdown: {
    backgroundColor: Colors.white,
    width: '125rem',
    marginTop: '11rem',
    marginLeft: '-11.5rem',
    alignItems: 'center',
  },
  dropDownText: {
    color: Colors.white,
    fontSize: '16rem',
    fontFamily: Fonts.regular,
    marginRight: '14rem',
  },
});

export default styles;
