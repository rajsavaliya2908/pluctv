import {Platform} from 'react-native';
export const Fonts = {
  bold: Platform.OS === 'android' ? 'KonnectBold' : 'Konnect Bold',
  medium: Platform.OS === 'android' ? 'KonnectMedium' : 'Konnect Medium',
  semiBold: Platform.OS === 'android' ? 'KonnectSemiBold' : 'Konnect SemiBold',
  regular: Platform.OS === 'android' ? 'KonnectRegular' : 'Konnect Regular',
};
