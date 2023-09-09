/*
import React from 'react';
import {ImageBackground, Text, TouchableOpacity, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SCREEN_WIDTH, Images, Fonts, Colors} from '../../utils/theme';

const ShortsCard = props => {
  const {image, title} = props;
  return (
    <ImageBackground
      imageStyle={{borderRadius: 4}}
      source={image}
      style={styles.image}>
      <TouchableOpacity style={styles.webButton}>
        <Image source={Images.web_stories_icon} style={styles.webIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </ImageBackground>
  );
};

export default ShortsCard;
*/

import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Colors,
  Fonts,
  Images,
  MessageUtils,
  SCREEN_WIDTH,
  ShowToast,
} from '../../utils/theme';
import {APIURL, RequestManager} from 'src/api';
import {API_URL, ResponseCode} from 'src/utils/Const';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import Label from '../Label';
import LinearGradient from 'react-native-linear-gradient';
import externalStyle from './externalStyle';

const requestManager = new RequestManager();

const ShortsCard = props => {
  const {cat_ID} = props;

  useEffect(() => {
    categoryAPIRequest(cat_ID);
  }, []);

  const [genreData, setGenreData] = useState('');

  const categoryAPIRequest = async id => {
    const config = {
      method: 'get',
      url: `${API_URL}${APIURL.API_GET_GENRE_CONTENT.url}?content_type=story,amp&category_id=${id}`,
    };

    axios(config)
      .then(response => {
        console.log('Genre Content', response);
        if (response.status === 200 && response?.data) {
          setGenreData(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderShortsItem = ({item}) => {
    const {image, post_title} = item;
    return (
      <FastImage
        imageStyle={{borderRadius: 4}}
        source={{
          uri: image,
          priority: FastImage.priority.high,
        }}
        style={styles.image}>
        <TouchableOpacity style={styles.webButton}>
          <Image source={Images.web_stories_icon} style={styles.webIcon} />
        </TouchableOpacity>
        <LinearGradient
          colors={[Colors.transparent, Colors.black]}
          style={styles.linerView}>
          <Text style={styles.title} numberOfLines={2}>
            {post_title}
          </Text>
        </LinearGradient>
      </FastImage>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.gerneTitle}>
        {genreData?.genre_name ? genreData.genre_name : ''}
      </Text>
      <FlatList
        data={genreData?.genre_content ? genreData.genre_content : []}
        keyExtractor={(d, i) => i.toString()}
        renderItem={item => renderShortsItem(item)}
        showsHorizontalScrollIndicator={false}
        //contentContainerStyle={styles.list}
        horizontal
      />
    </View>
  );
};

export default ShortsCard;

const styles = EStyleSheet.create({
  mainContainer: {flex: 1},
  gerneTitle: {
    fontSize: '18rem',
    fontFamily: Fonts.bold,
    //paddingHorizontal: '20rem',
    color: Colors.white,
    marginBottom: '10rem',
  },
  list: {marginLeft: '20rem'},
  image: {
    height: '170rem',
    width: SCREEN_WIDTH / 2.42,
    marginBottom: '16rem',
    marginRight: '17rem',
    borderRadius: '4rem',
  },
  webButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  webIcon: {
    width: '22rem',
    height: '22rem',
  },
  title: {
    color: Colors.white1,
    marginHorizontal: '7rem',
    fontFamily: Fonts.bold,
  },
  linerView: {
    position: 'absolute',
    bottom: 0,
    borderRadius: '4rem',
    width: '100%',
    padding: 10,
  },
});
