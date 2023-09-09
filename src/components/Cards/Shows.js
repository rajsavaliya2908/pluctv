import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
import CustomImage from "../CustomImage";

const ShowsCard = props => {
  const {image, onPress} = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <CustomImage
          style={styles.image}
          imageUrl={image}
      />
    </TouchableOpacity>
  );
};

export default ShowsCard;

const styles = EStyleSheet.create({
  button: {width: '48%', height: '200rem', marginBottom: '16rem'},
  image: {
    borderRadius: '4rem',
    width: '100%',
    height: '100%',
  },
});
