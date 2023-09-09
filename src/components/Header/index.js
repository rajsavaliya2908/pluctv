import React from 'react';
import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts, Strings} from 'src/utils/theme';

const Header = props => {
  const {isMoreVisible = true, isBackLabel = true} = props;
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity style={styles.backVeiw} onPress={props.onPressBack}>
        <Icon name={'chevron-left'} color={Colors.white3} size={26} />
        {isBackLabel ? (
          <Text style={styles.text}>{Strings.back}</Text>
        ) : (
          <View />
        )}
      </TouchableOpacity>

      {isMoreVisible ? (
        <Icon
          name="more-vertical"
          color={Colors.white3}
          size={23}
          onClick={() => console.log('more')}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

export default Header;

const styles = EStyleSheet.create({
  container: {
    padding: '18rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  backVeiw: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.white3,
    fontSize: '12rem',
    fontFamily: Fonts.bold,
    marginLeft: 5,
  },
});
