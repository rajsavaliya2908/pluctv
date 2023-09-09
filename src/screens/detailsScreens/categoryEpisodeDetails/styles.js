import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, SCREEN_WIDTH, SCREEN_HEIGHT, Fonts} from 'src/utils/theme';
import {Platform} from "react-native";
import {isIphoneX} from "react-native-iphone-x-helper";

const styles = EStyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  backButton:{
    position: 'absolute',
    zIndex: 10,
    marginTop: Platform.OS === 'ios' ? (isIphoneX() ? 0 : 0) : 0,
  },
  videoDescView: {
    padding: '20rem'
  },
  videoDesc: {
    color: Colors.white2,
    fontSize: '18rem',
    fontFamily: Fonts.bold,
  },
  publishDate: {
    marginVertical: '10rem',
    color: Colors.grey1,
    fontSize: '11rem',
    fontFamily: Fonts.regular,
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: '48rem',
    height: '48rem',
    borderRadius: '24rem',
  },
  userName: {
    color: Colors.white2,
    fontFamily: Fonts.semiBold,
    marginLeft: '15rem',
  },
  reactButton: {
    backgroundColor: Colors.yellow1,
    paddingHorizontal: '30rem',
    paddingVertical: '8rem',
    borderRadius: '4rem',
  },
  reactText: {
    color: Colors.grey,
    fontFamily: Fonts.regular,
    fontSize: '14rem',
  },
  indicator: {
    height: 1,
    backgroundColor: Colors.grey5,
  },
  tabContainer: {
    marginHorizontal: '20rem',
  },
  tabView: {marginHorizontal: '28rem', marginVertical: '4rem'},
  listItemView: {
    marginHorizontal: '20rem',
    marginTop: '16rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoImage: {
    height: '68rem',
    width: '128rem',
    borderRadius: 2,
    marginRight: '15rem',
  },
  videoDescContainer: {
    width: '67%'
  },
  listVideoDesc: {
    color: Colors.white2,
    marginTop: 5,
    fontFamily: Fonts.medium,
    flex:1,
    width: '90%'
  },
});

export default styles;
