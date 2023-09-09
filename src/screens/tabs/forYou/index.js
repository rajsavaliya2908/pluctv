import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {connect} from 'react-redux';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import Routes from 'src/router/Routes';
import {API_URL} from 'src/utils/Const';
import styles from './styles';
import {
  SafeArea,
  ShowsCard,
  GerneCard,
  SearchHeader,
  ShortsCard,
  HeaderTab,
  ExploreCreator,
  ExploreEpisode,
  ExplorePlucOriginal,
  ExploreShows,
  ExploreStories,
} from 'src/components';
import {Colors, SCREEN_HEIGHT, Strings} from 'src/utils/theme';
import {ShowToast, MessageUtils} from 'src/utils/theme';
import {setLoading} from 'src/redux/actions/CommonActions';
import {APIURL, RequestManager} from 'src/api';
import {ResponseCode, ExploreContentType} from 'src/utils/Const';

const requestManager = new RequestManager();

class ForYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [
        {title: Strings.explore},
        {title: Strings.shows},
        {title: Strings.gerne},
        // {title: Strings.shorts},
      ],
      activeCategory: 0,
      routes: [
        {key: 'explore'},
        {key: 'shows'},
        {key: 'gerne'},
        // {key: 'shorts'},
      ],
      exploreData: [],
      showsData: [],
      gerneData: [],
      shortsData: [],
      enableScrollViewScroll: false,
      isShowsRefresh: false,
      isGenreRefresh: false,
      page: 1,
      isPaginate: true,
      isLoadMore: false,
    };
  }

  componentDidMount() {
    this.exploreApiRequest(false);
    this.gerneAPIRequest(false);
    this.shortsAPIRequest(false);
    this.showsApiRequest(false);
  }

  // Server Request
  exploreApiRequest = async isOnRefresh => {
    if (!isOnRefresh) {
      this.props.setLoading(true);
    }
    let params = {};
    await requestManager.doRequest(
      APIURL.API_GET_EXPLORE,
      params,
      this.onResponse,
      this.onError,
    );
  };

  showsApiRequest = async (isOnRefresh = false, loadmore = false) => {
    const {page} = this.state;
    if (loadmore) {
      this.setState({isLoadMore: true});
    } else {
      if (!isOnRefresh) {
        this.props.setLoading(true);
      }
    }
    const config = {
      method: 'get',
      url: `${API_URL}${APIURL.API_GET_SHOWS.url}?page=${page}`,
    };

    axios(config)
      .then(response => {
        this.props.setLoading(false);
        this.setState({isLoadMore: false, isShowsRefresh: false});

        if (response.status === 200 && response.data) {
          this.setState({
            showsData: isOnRefresh
              ? response.data
              : [...this.state.showsData, ...response.data],
            isPaginate: response.data.length !== 0,
          });
        } else {
          ShowToast(MessageUtils.Errors.APIError);
        }
      })
      .catch(error => {
        this.props.setLoading(false);
        this.setState({isLoadMore: false, isShowsRefresh: false});
        console.log(error);
      });
  };

  gerneAPIRequest = async isOnRefresh => {
    if (!isOnRefresh) {
      this.props.setLoading(true);
    }
    let params = {};
    await requestManager.doRequest(
      APIURL.API_GET_GENRES,
      params,
      this.onResponse,
      this.onError,
    );
  };

  shortsAPIRequest = async isOnRefresh => {
    if (!isOnRefresh) {
      this.props.setLoading(true);
    }
    let params = {};
    await requestManager.doRequest(
      APIURL.API_GET_SHORTS,
      params,
      this.onResponse,
      this.onError,
    );
  };

  // API RESPONSE
  onResponse = (response, reqId) => {
    switch (reqId) {
      case APIURL.API_GET_EXPLORE.id: {
        this.props.setLoading(false);
        switch (response.status) {
          case ResponseCode.OK:
          case ResponseCode.CREATED: {
            this.setState({
              isShowsRefresh: false,
            });
            if (response.status === 200 && response.data.shows) {
              const exploreData = [];
              const mergeData = response.data.shows.map((item, index) => {
                exploreData.push({
                  type: ExploreContentType.CREATORS,
                  data: response.data.creators[index],
                });
                exploreData.push({
                  type: ExploreContentType.EPISODES,
                  data: response.data.episodes[index],
                });
                exploreData.push({
                  type: ExploreContentType.PLUC_ORIGINALS,
                  data: response.data.pluc_originals[index],
                });
                // exploreData.push({
                //   type: ExploreContentType.STORIES,
                //   data: response.data.stories[index],
                // });
                exploreData.push({
                  type: ExploreContentType.SHOWS,
                  data: response.data.shows[index],
                });
              });
              this.setState({
                exploreData: exploreData,
              });
            } else {
              ShowToast(MessageUtils.Errors.APIError);
            }
            break;
          }
        }
        break;
      }

      case APIURL.API_GET_GENRES.id: {
        this.props.setLoading(false);
        switch (response.status) {
          case ResponseCode.OK:
          case ResponseCode.CREATED: {
            if (response.status === 200 && response.data?.genre_category_list) {
              this.setState({
                gerneData: response.data?.genre_category_list,
                shortsData: response.data?.shorts_category_list,
              });
            } else {
              ShowToast(MessageUtils.Errors.APIError);
            }
            break;
          }
        }
        break;
      }

      case APIURL.API_GET_SHOWS.id: {
        this.props.setLoading(false);
        switch (response.status) {
          case ResponseCode.OK:
          case ResponseCode.CREATED: {
            if (response.status === 200 && response.data) {
              this.setState({
                showsData: response.data,
              });
            } else {
              ShowToast(MessageUtils.Errors.APIError);
            }
            break;
          }
        }
        break;
      }

      case APIURL.API_GET_SHORTS.id: {
        this.props.setLoading(false);
        switch (response.status) {
          case ResponseCode.OK:
          case ResponseCode.CREATED: {
            if (response.status === 200) {
            } else {
              ShowToast(MessageUtils.Errors.APIError);
            }
            break;
          }
        }
        break;
      }
    }
  };

  onError = (error, reqId) => {
    this.props.setLoading(false);
    switch (error.status) {
      case ResponseCode.METHOD_NOT_ALLOWED:
      case ResponseCode.BAD_REQUEST: {
        break;
      }
    }
  };

  onNotificationRefresh = () => {
    this.setState({
      isShowsRefresh: true,
    });
    this.exploreApiRequest(true);
  };

  onShowsPress = item => {
    this.props.navigation.navigate(Routes.ShowsDetails, {
      showsData: item.data,
    });
  };

  onEpisodePress = item => {
    this.props.navigation.navigate(Routes.ShowsDetails, {
      showsData: item.data,
    });
  };

  onCategoryEpisodePress = item => {
    this.props.navigation.navigate(Routes.CategoryEpisodeDetails, {
      currentEpisode: item.data,
    });
  };

  onGenrePress = item => {
    this.props.navigation.navigate(Routes.CategoryEpisodeDetails, {
      currentEpisode: item,
    });
  };

  onCreatorPress = item => {
    const {navigation} = this.props;
    navigation.navigate(Routes.CreatorDetails, {
      data: item.data,
    });
  };

  onGenreRefresh = () => {
    this.setState({
      isGenreRefresh: true,
    });
    this.gerneAPIRequest(true);
  };

  updateCategory = index => {
    this.setState({activeCategory: index});
  };

  renderExplore = ({item, index}) => {
    if (item?.type === ExploreContentType.CREATORS) {
      return (
        <ExploreCreator {...item} onPress={() => this.onCreatorPress(item)} />
      );
    } else if (item?.type === ExploreContentType.EPISODES) {
      return (
        <ExploreEpisode
          {...item}
          onPress={() => this.onCategoryEpisodePress(item)}
        />
      );
    } else if (item?.type === ExploreContentType.SHOWS) {
      return <ExploreShows {...item} onPress={() => this.onShowsPress(item)} />;
    } else if (item?.type === ExploreContentType.PLUC_ORIGINALS) {
      return (
        <ExplorePlucOriginal
          {...item}
          onPress={() => this.onShowsPress(item)}
        />
      );
    } else if (item?.type === ExploreContentType.STORIES) {
      return <ExploreStories {...item} />;
    }
    return <View />;
  };

  renderShows = ({item, index}) => {
    const {navigation} = this.props;
    return (
      <ShowsCard
        {...item}
        onPress={() =>
          navigation.navigate(Routes.ShowsDetails, {
            showsData: item,
          })
        }
      />
    );
  };

  renderGerne = ({item, index}) => {
    return (
      <>
        <GerneCard
          {...item}
          onPress={genreItem => this.onGenrePress(genreItem)}
        />
      </>
    );
  };

  renderShorts = ({item, index}) => {
    return (
      <>
        <ShortsCard {...item} />
      </>
    );
  };

  renderExploreList = () => (
    <View style={styles.exploreList}>
      <Carousel
        layout={'default'}
        data={this.state.exploreData}
        renderItem={this.renderExplore}
        sliderHeight={SCREEN_HEIGHT * 0.632}
        itemHeight={SCREEN_HEIGHT * 0.632}
        hasParallaxImages={false}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.94}
        containerCustomStyle={{}}
        vertical
        activeSlideAlignment={'start'}
      />
    </View>
  );

  renderShowsList = () => {
    const {isLoadMore, isPaginate} = this.state;
    return (
      <FlatList
        data={this.state.showsData}
        keyExtractor={(item, index) => index.toString()}
        extraData={[this.props, this.state]}
        renderItem={this.renderShows}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={styles.showsList}
        columnWrapperStyle={styles.showsColumn}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isShowsRefresh}
            onRefresh={() => {
              this.setState({page: 1, isShowsRefresh: true}, () => {
                this.showsApiRequest(true);
              });
            }}
            tintColor={Colors.white}
          />
        }
        ListFooterComponent={() => {
          if (isLoadMore) {
            return (
              <ActivityIndicator
                size="small"
                color={Colors.grey1}
                style={{marginTop: 20}}
              />
            );
          } else {
            return null;
          }
        }}
        onEndReached={() => {
          if (isPaginate) {
            this.setState({page: this.state.page + 1}, () => {
              this.showsApiRequest(false, true);
            });
          }
        }}
      />
    );
  };

  renderGerneList = () => (
    <FlatList
      data={this.state.gerneData}
      keyExtractor={(d, i) => i.toString()}
      extraData={[this.props, this.state]}
      renderItem={this.renderGerne}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.gerneList}
      style={styles.showsList}
      showsVerticalScrollIndicator={false}
    />
  );

  renderShortsList = () => (
    <FlatList
      data={this.state.shortsData}
      keyExtractor={(d, i) => i.toString()}
      extraData={[this.props, this.state]}
      renderItem={this.renderShorts}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.gerneList}
      style={styles.showsList}
      showsVerticalScrollIndicator={false}
    />
  );

  render() {
    const {category, activeCategory} = this.state;
    const {userName} = this.props;
    return (
      <SafeArea statusBarColor={Colors.primary} style={styles.container}>
        <SearchHeader title={`${Strings.todayForJoe} ${userName}`} />
        <HeaderTab
          category={category}
          activeCategory={activeCategory}
          updateCategory={this.updateCategory}
        />
        <TabView
          //swipeEnabled={activeCategory !== 0}
          swipeEnabled={false}
          navigationState={{index: activeCategory, routes: this.state.routes}}
          renderScene={SceneMap({
            explore: this.renderExploreList,
            shows: this.renderShowsList,
            gerne: this.renderGerneList,
            // shorts: this.renderShortsList,
          })}
          renderTabBar={() => {}}
          onIndexChange={this.updateCategory}
        />
      </SafeArea>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.UserReducer?.userInfo?.name
      ? state.UserReducer.userInfo.name
      : '',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: isLoading => dispatch(setLoading(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForYou);
