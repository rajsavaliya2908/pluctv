import {StyleSheet} from 'react-native';
import {Colors} from 'src/utils/Colors';
import {Fonts} from "../../utils/Fonts";

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: Colors.theGrey,
    paddingHorizontal: 10,
    flex: 1,
    fontSize:12
  },
  leftIcon: {
    marginHorizontal: 0,
  },
  input: {
    flex: 1,
    padding: 0,
    paddingVertical: 10,
    fontSize: 14,
    paddingHorizontal: 8,
    color: Colors.white,
    fontFamily: Fonts.regular
  },
});

export default styles;
