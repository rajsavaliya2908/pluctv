import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts, Strings} from '../../utils/theme';

const NoData = props => {
  const {style} = props;
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{Strings.noData}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white1,
    fontFamily: Fonts.bold,
    fontSize: '16rem',
  },
});

export default NoData;
