import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts, Strings} from '../../utils/theme';

const SearchHeader = props => {
  const {title = Strings.todayForJoe} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Icon name="md-search-sharp" size={24} color={Colors.white} />
    </View>
  );
};

export default SearchHeader;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '20rem',
  },
  title: {
    fontSize: '27.5rem',
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
});
