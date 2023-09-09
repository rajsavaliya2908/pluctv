import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Images, Fonts, Colors, SCREEN_WIDTH} from '../../utils/theme';
import FastImage from 'react-native-fast-image';

const CoursesCard = props => {
  const {image, onPress, post_title} = props;
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
     <FastImage
        imageStyle={{borderRadius: 4}}
        style={styles.container}
        source={{
          uri: image ? image : '',
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}>
        <LinearGradient
          colors={[Colors.transparent, Colors.black]}
          style={styles.container}>
          <View style={styles.textContainer}>
          <Text style={styles.title}>{post_title}</Text>
         {/*   <View style={styles.timeView}>
                        <Icon
                            name="clock-time-three-outline"
                            color={Colors.white1}
                            size={20}
                        />
                        <Text style={styles.time}>{time}</Text>
                        <Text style={styles.price}>{price}</Text>
                    </View>*/}
          </View>
        </LinearGradient>
      </FastImage>
    </TouchableOpacity>
  );
};

export default CoursesCard;

const styles = EStyleSheet.create({
  container: {
    height: '170rem',
    width: '100%',
    marginBottom: '16rem',
    borderRadius: '4rem',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    margin: '15rem',
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4rem',
    width: SCREEN_WIDTH - 70,
  },
  title: {
    color: Colors.white1,
    fontFamily: Fonts.bold,
    fontSize: '16rem',
  },
  time: {
    color: Colors.grey3,
    fontFamily: Fonts.regular,
    fontSize: '12rem',
    marginLeft: '8rem',
  },
  price: {
    right: 0,
    position: 'absolute',
    color: Colors.yellow1,
    fontSize: '14rem',
    fontFamily: Fonts.bold,
  },
});
