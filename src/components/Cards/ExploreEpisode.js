import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../utils/theme';
import FastImage from 'react-native-fast-image';
import { HTMLText, EpisodeTitle} from '../index';
import externalStyle from './externalStyle';

const ExploreEpisode = props => {
  const {
    data: {
      image,
      post_content,
      post_title,
      acf: {season, episode_number},
    },
    onPress
  } = props;

  console.log(props,"props")

  let seasonNumber = season.replace("season_", "");
  return (
    <TouchableOpacity style={externalStyle.container} onPress={() => onPress()}>
      <FastImage
        // style={styles.image}
        source={{
          uri: image,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}>
        <LinearGradient
          colors={[Colors.transparent, Colors.black]}
          style={externalStyle.backImage}>
          {/*<Icon
            name="more-vertical"
            color={Colors.white}
            size={25}
            style={externalStyle.menu}
            onClick={() => console.log('more')}
          />
          <View style={externalStyle.episodeView}>
            <Label style={externalStyle.episodeTitle}>{'New Episode'}</Label>
          </View>*/}
          <View style={externalStyle.bottomView}>
            <Text style={externalStyle.title} numberOfLines={2}>
              {post_title}
            </Text>
            <EpisodeTitle season={seasonNumber} episode={episode_number}/>
           {/* <View style={externalStyle.viewCenter}>
              {seasonNumber ? (
                <Text style={externalStyle.location}>{`Season ${seasonNumber}`}</Text>
              ) : null}
              {episode_number ? (
                <View style={externalStyle.dotsView} />
              ) : (
                <View />
              )}
              {episode_number ? (
                <Text style={externalStyle.location}>{`Episode ${episode_number}`}</Text>
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

export default ExploreEpisode;
