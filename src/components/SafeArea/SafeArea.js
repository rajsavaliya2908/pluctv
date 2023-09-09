import React, {Fragment} from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from 'src/utils/Colors';

const SafeArea = props => {
  const {
    statusBarColor = Colors.cool_grey,
    statusBarStyle = 'light-content',
    bottomBarColor = Colors.white,
    statusBarHidden = false,
    children = null,
    style,
  } = props;
  return (
    <Fragment>
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={statusBarStyle || ''}
        hidden={statusBarHidden}
      />
      <SafeAreaView
        style={[
          styles.safeAreaTop,
          {
            backgroundColor: statusBarColor,
          },
        ]}
      />
      <SafeAreaView
        style={[
          styles.safeAreaBottom,
          {
            backgroundColor: bottomBarColor,
          },
        ]}>
        <View style={[styles.container, style]}>{children}</View>
      </SafeAreaView>
    </Fragment>
  );
};

export default SafeArea;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  safeAreaTop: {
    flex: 0,
    backgroundColor: Colors.white,
  },
  safeAreaBottom: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
