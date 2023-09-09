import React from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  SafeArea,
  EpisodeTitle,
  NoData,
  HeaderTab,
  Header,
  Label, CustomImage,
} from 'src/components';
import styles from './styles';
import {Colors, Images, Strings} from 'src/utils/theme';
import {seasonData} from 'src/utils/ExternalData';
import JWPlayer, {JWPlayerState} from 'react-native-jw-media-player';
import {isIphoneX} from 'react-native-iphone-x-helper';
import FastImage from 'react-native-fast-image';
import Routes from '../../../router/Routes';

class VideoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //category: [{title: Strings.episodes}, {title: Strings.reactions}],
      category: [{title: Strings.episodes}],
      activeCategory: 0,
      //routes: [{key: 'episodes'}, {key: 'reactions'}],
      routes: [{key: 'episodes'}],
      episodeData: seasonData,
      currentEpisode: props.route.params.currentEpisode,
      seasonData: props.route.params.seasonData,
    };
  }

  componentDidMount() {
    const currentEpisode = this.props.route.params.currentEpisode;
    const seasonData = this.props.route.params.seasonData.episodes;
    const filterEpisode = seasonData.filter(
      obj => obj.ID !== currentEpisode.ID,
    );
    this.setState({
      seasonData: filterEpisode,
    });
  }

  formatDate = date => {
    let day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let year = date.getFullYear();
    return day + '/' + month + '/' + year;
  };

  onEpisodePress = item => {
    const seasonData = this.props.route.params.seasonData.episodes;
    const filterEpisode = seasonData.filter(obj => obj.ID !== item.ID);
    this.setState({
      currentEpisode: item,
      seasonData: filterEpisode,
    });
  };

  async isPlaying() {
    const playerState = await this.JWPlayer.playerState();
    return playerState === JWPlayerState.JWPlayerStatePlaying;
  }

  onGoBack = () => {
    this.props.navigation.goBack();
  };

  onReactPress = () => {
    this.props.navigation.navigate(Routes.Story);
  };

  renderIndicator = () => {
    return <View style={styles.indicator} />;
  };

  updateCategory = index => {
    this.setState({activeCategory: index});
  };

  renderEpisode = ({item, index}) => {
    const {
      acf: {episode_number, season},
    } = item;
    let seasonNumber = season.replace('season_', '');
    return (
      <TouchableOpacity
        style={styles.listItemView}
        onPress={() => this.onEpisodePress(item)}>
        <CustomImage
            style={styles.videoImage}
            imageUrl={item.image}
        />
        <View style={styles.videoDescContainer}>
          <EpisodeTitle season={seasonNumber} episode={episode_number} />
          <Text numberOfLines={2} style={styles.listVideoDesc}>
            {/* {item.title} */}
            {item?.post_title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderEpisodeList = () => {
    const {seasonData} = this.state;
    return (
      <FlatList
        data={seasonData ? seasonData : []}
        keyExtractor={(item, index) => index.toString()}
        extraData={[this.props, this.state]}
        renderItem={this.renderEpisode}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={this.renderHeader}
        ListEmptyComponent={this.renderEmpty}
        contentContainerStyle={{paddingBottom: 20}}
      />
    );
  };

  renderReactionList = () => {
    return (
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        extraData={[this.props, this.state]}
        renderItem={this.renderReaction}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={this.renderHeader}
        ListEmptyComponent={this.renderEmpty}
      />
    );
  };

  renderReaction = ({item, index}) => {
    return null;
  };

  renderEmpty = () => {
    return <NoData style={{flex: 0, marginTop: 100}} />;
  };

  renderHeader = () => {
    const {category, activeCategory, currentEpisode} = this.state;
    const {
      acf: {creator},
    } = currentEpisode;
    const creatorDetails =
      Array.isArray(creator) && creator.length >= 1 ? creator[0] : null;
    const publishDate = new Date(currentEpisode.post_date);
    const displayDate = this.formatDate(publishDate)
      ? this.formatDate(publishDate)
      : '';

    return (
      <>
        <View style={styles.videoDescView}>
          <Text numberOfLines={2} style={styles.videoDesc}>
            {currentEpisode?.post_title}
          </Text>
          <Text
            style={
              styles.publishDate
            }>{`${Strings.publishedOn} ${displayDate}`}</Text>
          <View style={[styles.flexView, {justifyContent: 'space-between'}]}>
            <View style={styles.flexView}>
              <FastImage
                style={styles.profileImage}
                source={{
                  uri: creatorDetails?.image,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={styles.userName}>{creatorDetails?.post_title}</Text>
            </View>
            <TouchableOpacity
              style={styles.reactButton}
              onPress={() => this.onReactPress()}>
              <Text style={styles.reactText}>{Strings.react}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.renderIndicator()}
        <View style={styles.tabContainer}>
          <View style={styles.tabView}>
            {/* <HeaderTab
              category={category}
              activeCategory={activeCategory}
              updateCategory={this.updateCategory}
              headerTabStyle={{justifyContent: 'center'}}
            /> */}
          </View>
        </View>
      </>
    );
  };

  renderPlayer = () => {
    const {currentEpisode, seasonData} = this.state;

    const {acf} = currentEpisode;

    const playlistItem = {
      title: '',
      // mediaId: -1,
      image: currentEpisode?.image,
      desc: '',
      time: 0,
      file: acf?.jw_video,
      autostart: false,
      controls: true,
      repeat: false,
      displayDescription: false,
      displayTitle: false,
      tracks: [],
    };
    return (
      <JWPlayer
        ref={p => (this.JWPlayer = p)}
        style={{
          backgroundColor: 'blue',
          height: '30%',
          width: '100%',
        }}
        playlistItem={playlistItem} // Recommended - pass the playlistItem as a prop into the player
        //playlist={[playlistItem]}
        onBeforePlay={() => {
          //this.onBeforePlay()
        }}
        onPlay={() => {
          //this.onPlay()
        }}
        onPause={() => {
          //this.onPause()
        }}
        onIdle={() => console.log('onIdle')}
        onPlaylistItem={event => {
          //this.onPlaylistItem(event)
        }}
        onSetupPlayerError={event => {
          //this.onPlayerError(event)
        }}
        onPlayerError={event => {
          //this.onPlayerError(event)
        }}
        onBuffer={() => {
          //this.onBuffer()
        }}
        onTime={event => {
          //this.onTime(event)
        }}
        onFullScreen={() => {
          //this.onFullScreen()
        }}
        onFullScreenExit={() => {
          //this.onFullScreenExit()
        }}
      />
    );
  };

  render() {
    const {activeCategory} = this.state;
    return (
      <SafeArea statusBarColor={Colors.primary} bottomBarColor={Colors.primary}>
        <Header
          style={styles.backButton}
          onPressBack={this.onGoBack}
          isMoreVisible={false}
          isBackLabel={false}
        />
        {this.renderPlayer()}
        {activeCategory === 0
          ? this.renderEpisodeList()
          : this.renderReactionList()}
      </SafeArea>
    );
  }
}

export default VideoDetails;
