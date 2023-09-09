import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from 'src/utils/theme';

const styles = EStyleSheet.create({
  container: {paddingTop: '20rem'},
  list: {marginLeft: '20rem'},
  gerneList: {},
  showsList: {
    marginTop: '18rem',
    paddingHorizontal: '20rem',
  },
  showsColumn: {justifyContent: 'space-between'},
  gerneTitle: {
    fontSize: '18rem',
    fontFamily: Fonts.bold,
    paddingHorizontal: '20rem',
    color: Colors.white,
    marginBottom: '10rem',
  },
  exploreList: {
    flex: 1,
    marginTop: '20rem',
    marginHorizontal: '20rem',
  },
});

export default styles;
