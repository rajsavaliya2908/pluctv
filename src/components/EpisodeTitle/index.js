import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from 'src/utils/theme';

const EpisodeTitle = props => {
  const {episode, season} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.cardEpisode}>{`Season ${season}`}</Text>
      {episode ?
          <>
            <Text style={styles.dot}>{'.'}</Text>
            <Text style={styles.cardEpisode}>{`Episode ${episode}`}</Text>
          </> : <View/>}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  cardEpisode: {
    fontSize: '10rem',
    color: Colors.grey4,
    fontFamily: Fonts.regular,
  },
  dot: {
    marginTop: -6,
    marginHorizontal: '8rem',
    color: Colors.grey4,
  },
});

export default EpisodeTitle;
