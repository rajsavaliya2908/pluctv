import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from "react-native-fast-image";
import {createImageProgress} from 'react-native-image-progress';
import {Colors} from "../../utils/theme";

const ImageLoader = createImageProgress(FastImage);

const CustomImage = props => {
    const {style,imageUrl,containerStyle,resizeMode} = props;
    return (
            <ImageLoader
                imageStyle={style}
                source={{
                    uri: imageUrl,
                    priority: FastImage.priority.high,
                }}
                style={[
                    styles.image,
                    style
                ]}
                resizeMode={resizeMode}
                indicator={true}
                indicatorProps={{
                    size: 25,
                    borderWidth: 0,
                    color: Colors.white,
                }}>
            </ImageLoader>
    );
};

export default CustomImage;

const styles = EStyleSheet.create({
    container: {flexDirection: 'row'},
    memberImage: {
        width: '31rem',
        height: '31rem',
        borderRadius: '16rem',
    },
});
