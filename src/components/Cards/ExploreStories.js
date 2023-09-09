import React from 'react';
import {Image, TouchableOpacity, View,Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts, Colors, Images} from '../../utils/theme';
import FastImage from 'react-native-fast-image';
import {Label} from '../index';
import externalStyle from './externalStyle';

const ExploreStories = props => {
  const {
    data: {
      image,
      post_content,
      post_title,
      acf: {creator, episode_number},
    },
  } = props;
  return (
    <View style={externalStyle.container}>
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
          <Icon
            name="more-vertical"
            color={Colors.white}
            size={25}
            style={externalStyle.menu}
            onClick={() => console.log('more')}
          />
          <TouchableOpacity style={styles.webButton}>
            <Image source={Images.web_stories_icon} style={styles.webIcon} />
          </TouchableOpacity>
          <View style={externalStyle.bottomView}>
            <Text style={externalStyle.title} numberOfLines={2}>
              {post_title}
            </Text>
            <View style={styles.profileView}>
              <FastImage
                style={styles.profileImage}
                source={{
                  uri: creator[0]?.image ? creator[0].image : image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={styles.description}>
                {creator[0]?.post_title ? creator[0].post_title : ''}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </FastImage>
    </View>
  );
};

export default ExploreStories;

const styles = EStyleSheet.create({
  description: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: '14rem',
    marginLeft: '10rem',
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginRight: 10,
  },
  webButton: {
    alignSelf: 'flex-start',
    padding: 8,
    position: 'absolute',
    top: 8,
  },
  webIcon: {
    width: '30rem',
    height: '30rem',
  },
});
