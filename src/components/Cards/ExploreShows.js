import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../utils/theme';
import FastImage from 'react-native-fast-image';
import {EpisodeTitle, HTMLText} from '../index';
import externalStyle from './externalStyle';

const ExploreShows = props => {
  const {
    data: {
      image,
      post_content,
      post_title,
      acf: {season, episode_number},
      season_count,
      episode_count
    },
      onPress
  } = props;
  return (
    <TouchableOpacity style={externalStyle.container} onPress={()=> onPress()}>
      <FastImage
        style={styles.image}
        source={{
          uri: image,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}>
        <LinearGradient
          colors={[Colors.transparent, Colors.black]}
          style={externalStyle.backImage}>
         {/* <Icon
            name="more-vertical"
            color={Colors.white}
            size={25}
            style={externalStyle.menu}
            onClick={() => console.log('more')}
          />*/}
          {/*<View style={externalStyle.episodeView}>
            <Label style={externalStyle.episodeTitle}>{'New Show'}</Label>
          </View>*/}
          <View style={externalStyle.bottomView}>
            <Text style={externalStyle.title} numberOfLines={2}>
              {post_title}
            </Text>
            <EpisodeTitle season={season_count} episode={episode_count}/>
            {/*<View style={externalStyle.viewCenter}>
              {season ? (
                <Text style={externalStyle.location}>{season}</Text>
              ) : null}
              {episode_number ? (
                <View style={externalStyle.dotsView} />
              ) : (
                <View />
              )}
              {episode_number ? (
                <Text style={externalStyle.location}>{episode_number}</Text>
              ) : null}
            </View>*/}
            <HTMLText html={post_content} />
            {/* <Label style={externalStyle.description} maxLine={3}>
              {post_content}
            </Label> */}
          </View>
        </LinearGradient>
      </FastImage>
    </TouchableOpacity>
  );
};

export default ExploreShows;

const styles = EStyleSheet.create({
  statusImage: {width: 155, height: 7},
});
