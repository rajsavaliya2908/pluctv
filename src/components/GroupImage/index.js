import React from 'react';
import {View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Images} from 'src/utils/theme';
import FastImage from "react-native-fast-image";

const GroupImage = props => {
  const {userData, style} = props;
  return (
    <View style={[styles.container, style]}>
      {userData &&
        userData.slice(0, 4).map((d, i) => {
          return (
              <FastImage
                  key={i.toString()}
                  style={[
                    styles.memberImage,
                    {
                      marginLeft: i !== 0 ? -5 : 0,
                    },
                  ]}
                  source={{
                    uri: d.image,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
              />
          );
        })}
    </View>
  );
};

export default GroupImage;

const styles = EStyleSheet.create({
  container: {flexDirection: 'row'},
  memberImage: {
    width: '31rem',
    height: '31rem',
    borderRadius: '16rem',
  },
});
