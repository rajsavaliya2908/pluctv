import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Colors,
  Fonts,
  MessageUtils,
  SCREEN_WIDTH,
  ShowToast,
} from '../../utils/theme';
import {APIURL, RequestManager} from 'src/api';
import {API_URL, ResponseCode} from 'src/utils/Const';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import CustomImage from '../CustomImage';

const requestManager = new RequestManager();

const GerneCard = props => {
  const {cat_ID, onPress} = props;

  useEffect(() => {
    categoryAPIRequest(cat_ID);
  }, []);

  const [genreData, setGenreData] = useState('');
  const [page, setPage] = useState(1);
  const [isPaginate, setPaginate] = useState(true);
  const [isLoadMore, setLoadMore] = useState(false);

  const categoryAPIRequest = async id => {
    const config = {
      method: 'get',
      url: `${API_URL}${APIURL.API_GET_GENRE_CONTENT.url}?page=${page}&category_id=${id}`,
    };

    setLoadMore(true);

    axios(config)
      .then(response => {
        if (response.status === 200 && response?.data) {
          setGenreData(response.data);
          setLoadMore(false);
          //   setPaginate(response?.data?.genre_content?.length !== 0);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderGenreItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <CustomImage style={styles.image} imageUrl={item.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {genreData?.genre_content?.length > 0 ? (
        <Text style={styles.gerneTitle}>
          {genreData?.genre_name ? genreData.genre_name : ''}
        </Text>
      ) : null}

      <FlatList
        data={genreData?.genre_content ? genreData.genre_content : []}
        keyExtractor={(d, i) => i.toString()}
        renderItem={item => renderGenreItem(item)}
        showsHorizontalScrollIndicator={false}
        //contentContainerStyle={styles.list}
        horizontal
      />
    </View>
  );
};

export default GerneCard;

const styles = EStyleSheet.create({
  mainContainer: {flex: 1},
  image: {
    height: '170rem',
    width: SCREEN_WIDTH - 70,
    marginBottom: '16rem',
    marginRight: '18rem',
    borderRadius: '4rem',
  },
  gerneTitle: {
    fontSize: '18rem',
    fontFamily: Fonts.bold,
    color: Colors.white,
    marginBottom: '10rem',
  },
  list: {marginLeft: '20rem'},
});
