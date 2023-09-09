import React from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {Colors} from '../../utils/theme';
import {SafeArea} from '../../components';

const Home = () => {
  return (
    <View style={styles.bottomContainer}>
      <Icon name="stepforward" />
      <Text style={styles.status}>{'Home'}</Text>
    </View>
  );
};

export default Home;
