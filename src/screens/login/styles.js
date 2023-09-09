import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from "../../utils/Colors";
import {Fonts} from "../../utils/theme";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: '16rem',
    paddingHorizontal: '16rem',
  },
  bottomContainer: {
    backgroundColor: 'black',
    paddingBottom: '22rem',
  },
  titleContainer: {
    paddingVertical: '42rem',
  },
  title: {
    fontSize: '48rem'
  },
  subText: {
    fontSize: '16rem'
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '18rem'
  },
  countryBox: {
    paddingVertical: 0,
    marginRight: 12,
    height: '40rem',
    borderRadius:'4rem'
  },
  mobileInput: {
    paddingVertical: 0,
    height: '40rem',
    fontFamily: Fonts.regular,
    borderRadius:'4rem'
  },
  lineContainer:{
    marginVertical:'40rem',
    flexDirection:'row',
    alignItems:'center'
  },
  lineView:{
    height:1,
    backgroundColor:Colors.white,
    flex:1
  }
});

export default styles;
