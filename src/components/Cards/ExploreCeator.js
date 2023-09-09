import React from 'react';
import {View, TouchableOpacity,Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'src/utils/theme';
import FastImage from 'react-native-fast-image';
import {Label, HTMLText} from '../index';
import externalStyle from './externalStyle';

const ExploreCreator = props => {
  const {
    data: {
      post_title,
      image,
      post_content,
      acf: {location},
    },
    onPress,
  } = props;
  return (
    <TouchableOpacity style={externalStyle.container} onPress={onPress}>
      <FastImage
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
            <Text style={externalStyle.title}>{post_title}</Text>
            {location ? (
              <Text style={externalStyle.location}>{location}</Text>
            ) : null}
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

export default ExploreCreator;
