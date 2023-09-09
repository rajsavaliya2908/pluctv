import {Dimensions, Platform} from 'react-native';
import {Fonts} from './Fonts';
import {Colors} from './Colors';
import {Images} from '../assets/images';
import {Strings} from './Strings';
import {ShowToast} from './Toast';
import CommonStyles from './CommonStyles';
import MessageUtils from './MessageUtils';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const IS_IOS = Platform.OS === 'ios';

export {
  Fonts,
  Colors,
  Images,
  Strings,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  IS_IOS,
  CommonStyles,
  ShowToast,
  MessageUtils,
};
