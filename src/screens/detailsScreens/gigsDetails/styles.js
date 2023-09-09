import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from 'src/utils/theme';

const styles = EStyleSheet.create({
  topView: {backgroundColor: Colors.theGrey, padding: '20rem'},
  paidStatus: {
    backgroundColor: Colors.yellow1,
    alignSelf: 'flex-start',
    paddingVertical: '4rem',
    paddingHorizontal: '8rem',
    borderRadius: '20rem',
    marginTop: '10rem',
  },
  font12: {fontSize: '12rem'},
  font18: {fontSize: '18rem'},
  applyButton: {
    marginHorizontal: '20rem',
    backgroundColor: Colors.yellow1,
    borderRadius: '4rem',
    alignItems: 'center',
    paddingVertical: '8rem',
    marginBottom: '20rem',
  },
  dateTimeView: {flexDirection: 'row', alignItems: 'center', marginTop: 12},
});

export default styles;
