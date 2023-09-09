import React from 'react';
import {View, Image, ImageBackground, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {Images, Fonts, Colors} from '../../utils/theme';

const ExploreCard = props => {
  const {title, description, image, status} = props;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        imageStyle={{borderRadius: 4}}
        resizeMode="cover"
        style={styles.backImage}>
        <LinearGradient
          colors={[Colors.transparent, Colors.black]}
          style={styles.backImage}>
          <Icon
            name="more-vertical"
            color={Colors.white}
            size={25}
            style={styles.menu}
            onClick={() => console.log('more')}
          />
          <View style={styles.bottomView}>
            <Image
              source={Images.exploreStatus}
              resizeMode="contain"
              style={styles.statusImage}
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default ExploreCard;

const styles = EStyleSheet.create({
  container: {
    height: '70%',
    // marginTop: '-30rem',
    marginBottom: '10rem',
  },
  backImage: {
    height: '100%',
    width: '100%',
    borderRadius: 4,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    marginHorizontal: '14rem',
  },
  title: {
    fontSize: '22rem',
    fontFamily: Fonts.bold,
    color: Colors.white,
    marginVertical: '8rem',
  },
  description: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: '14rem',
    marginBottom: '12rem',
    lineHeight: '16rem',
  },
  statusImage: {width: 155, height: 7},
  menu: {alignSelf: 'flex-end', padding: 15},
});
