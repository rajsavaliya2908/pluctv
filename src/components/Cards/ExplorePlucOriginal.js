import React from 'react';
import {Image, View,TouchableOpacity,Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {Fonts, Colors, IS_IOS, Images} from '../../utils/theme';
import {HTMLText} from '../index';
import externalStyle from './externalStyle';

const ExplorePlucOriginal = props => {
  const {
    data: {
      image,
      post_content,
      post_title,
      acf: {season, episode_number},
    },
    onPress
  } = props;
  return (
    <TouchableOpacity style={externalStyle.container}
    onPress={() => onPress()}>
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
          <View style={externalStyle.bottomView}>
            <Image
              source={Images.exploreStatus}
              resizeMode="contain"
              style={styles.statusImage}
            />
            <Text style={externalStyle.title} numberOfLines={2}>
              {post_title}
            </Text>
            <HTMLText html={post_content} />
          </View>
        </LinearGradient>
      </FastImage>
    </TouchableOpacity>
  );
};

export default ExplorePlucOriginal;

const styles = EStyleSheet.create({
  description: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: '12rem',
    marginBottom: '12rem',
    lineHeight: '16rem',
  },
  statusImage: {width: 155, height: 10, marginVertical: 10},
});
