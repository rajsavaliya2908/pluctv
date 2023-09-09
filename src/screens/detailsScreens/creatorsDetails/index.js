import React, {Component} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {connect} from 'react-redux';
import {CustomImage, Header, Label} from 'src/components';
import {Colors, Strings, Images, ShowToast} from 'src/utils/theme';
import {API_URL} from 'src/utils/Const';
import {setLoading} from 'src/redux/actions/CommonActions';
import styles from './styles';
import {APIURL, RequestManager} from 'src/api';
import {ResponseCode} from 'src/utils/Const';
import Routes from "src/router/Routes";

const requestManager = new RequestManager();

class CreatorDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: props.route.params ? props.route.params.data : null,
            creatorDetails: null,
            isFollowed: false,
            creatorsShows: [],
            creatorsEpisodes: [],
        };
    }

    componentDidMount() {
        const {details} = this.state;
        this.setState({
            isFollowed: details?.is_subscribed === 1,
        });
        this.callDetailsApi();
        this.creatorsShowsAPIRequest();
        this.creatorsEpisodeAPIRequest();
    }

    onShowsPress = (shows) => {
        this.props.navigation.push(Routes.ShowsDetails, {
            showsData: shows,
        })
    }

    onEpisodesPress = (episodes) => {
        this.props.navigation.push(Routes.CategoryEpisodeDetails, {
            currentEpisode: episodes,
        });
    }


    onFollowPress = () => {
        const {details, isFollowed} = this.state;
        this.followUnFollowAPIRequest(details.ID, isFollowed ? 0 : 1);
    };

    // Server Request

    creatorsShowsAPIRequest = async () => {
        const {details} = this.state;
        const {setLoadings, apiToken} = this.props;
        setLoadings(true);
        const config = {
            method: 'get',
            url: `${API_URL}${APIURL.API_GET_SHOWS.url}?creator_id=${details.ID}`,
            headers: {
                'Authorization': `Bearer ${apiToken}`,
            },
        };

        axios(config)
            .then(response => {
                if (response.status === 200 && response?.data) {
                    setLoadings(false);
                    this.setState({
                        creatorsShows: response.data,
                    });
                }
            })
            .catch(error => {
                setLoadings(false);
                console.log(error);
            });
    };

    creatorsEpisodeAPIRequest = async () => {
        const {details} = this.state;
        const {setLoadings, apiToken} = this.props;
        setLoadings(true);
        const config = {
            method: 'get',
            url: `${API_URL}${APIURL.API_GET_EPISODE_DETAILS.url}?creator_id=${details.ID}`,
            headers: {
                'Authorization': `Bearer ${apiToken}`,
            },
        };

        axios(config)
            .then(response => {
                if (response.status === 200 && response?.data) {
                    setLoadings(false);
                    this.setState({
                        creatorsEpisodes: response.data,
                    });
                }
            })
            .catch(error => {
                setLoadings(false);
                console.log(error);
            });
    };

    callDetailsApi = () => {
        const {details} = this.state;
        const {setLoadings, apiToken} = this.props;
        setLoadings(true);
        const config = {
            method: 'get',
            url: `${API_URL}${APIURL.API_GET_CREATOR_DETAILS.url}?creator_id=${details.ID}`,
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        };

        axios(config)
            .then(response => {
                if (response.status === 200 && response?.data) {
                    let isFollowed = false;
                    isFollowed = response?.data[0]?.is_subscribed === 1;
                    this.setState({
                        creatorDetails: response.data[0],
                        isFollowed: isFollowed,
                    });
                    setLoadings(false);
                }
            })
            .catch(error => {
                setLoadings(false);
                console.log(error);
            });
    };

    followUnFollowAPIRequest = async (id, type) => {
        const {setLoadings} = this.props;
        setLoadings(true);
        let params = {
            following_id: id,
            follow: type,
        };
        await requestManager.doRequest(
            APIURL.API_FOLLOW_UNFOLLOW,
            params,
            this.onResponse,
            this.onError,
        );
    };

    // API RESPONSE
    onResponse = (response, reqId) => {
        const {setLoadings} = this.props;
        switch (reqId) {
            case APIURL.API_FOLLOW_UNFOLLOW.id: {
                setLoadings(false);
                switch (response.status) {
                    case ResponseCode.OK:
                    case ResponseCode.CREATED: {
                        if (response?.status === 200 && response.data.success === 1) {
                            const {isFollowed} = this.state;
                            this.setState({
                                isFollowed: !isFollowed,
                            });
                            ShowToast(response.data.message);
                        } else {
                            ShowToast(response.data.message);
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

    renderShows = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => this.onShowsPress(item)}>
                <CustomImage
                    style={styles.showImage}
                    imageUrl={item.image}
                />
            </TouchableOpacity>
        );
    };

    renderEpisodes = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => this.onEpisodesPress(item)}>
                <CustomImage style={styles.episodeImage} imageUrl={item.image}/>
            </TouchableOpacity>
        );
    };

    headerComponent = () => {
        const {creatorDetails, creatorsShows, isFollowed, creatorsEpisodes} = this.state;
        return (
            <>
                <View style={styles.topView}>
                    <Image source={Images.creator_cover} style={styles.coverImage}/>
                    <LinearGradient
                        colors={[Colors.transparent, Colors.transparent]}
                        style={styles.topView}>
                        <View style={styles.profilesView}>
                            <CustomImage
                                style={styles.profileImage}
                                imageUrl={creatorDetails?.image}
                            />
                            <View style={styles.userDetailsView}>
                                <Text style={styles.font16} numberOfLines={1}>
                                    {creatorDetails?.post_title}
                                </Text>
                                {/* <Label color={Colors.grey1} style={styles.status}>
                                    {'Producer'}
                                  </Label> */}
                                {creatorDetails && creatorDetails.acf.location ? (
                                    <View style={[styles.flexRow, {marginTop: 5}]}>
                                        <Icon
                                            name={'location-sharp'}
                                            size={22}
                                            color={Colors.grey1}
                                            style={styles.locationIcon}
                                        />
                                        <Text style={styles.font12}>
                                            {creatorDetails?.acf?.location}
                                        </Text>
                                    </View>
                                ) : null}
                            </View>
                            <TouchableOpacity
                                style={isFollowed ? styles.followButton : styles.unFollowButton}
                                onPress={() => this.onFollowPress()}>
                                <Text style={isFollowed ? styles.buttonFollow : styles.buttonUnFollow}>
                                    {isFollowed ? Strings.following : Strings.follow}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
                <View style={styles.aboutView}>
                    <Text color={Colors.white3} font_bold style={styles.font16}>
                        {Strings.aboutMe}
                    </Text>
                    <Text style={styles.aboutDesc}>
                        {creatorDetails?.post_content}
                    </Text>
                    {/*<TouchableOpacity style={styles.learnMoreButton}>
            <Label color={Colors.yellow1}>{Strings.loadMore}</Label>
          </TouchableOpacity>*/}
                </View>
                {creatorsShows && creatorsShows.length >= 1 ? <>
                    <Label ms={20} mb={10} font_bold style={{fontSize: 18}}>
                        {Strings.shows}
                    </Label>
                    <FlatList
                        data={creatorsShows}
                        keyExtractor={(d, i) => i.toString()}
                        renderItem={this.renderShows}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingLeft: 20}}
                        horizontal
                    />
                </> : <View/>}
                {creatorsEpisodes && creatorsEpisodes.length >= 1 ? <>
                    <Label ms={20} mb={10} mt={20} font_bold style={{fontSize: 18}}>
                        {Strings.episodes}
                    </Label>
                    <FlatList
                        data={creatorsEpisodes}
                        keyExtractor={(d, i) => i.toString()}
                        renderItem={this.renderEpisodes}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingLeft: 20}}
                        horizontal
                    />
                </> : <View/>}
            </>
        );
    };

    render() {
        const {creatorDetails, isFollowed} = this.state;
        return (
            <View style={styles.container}>
                <FlatList
                    data={[]}
                    keyExtractor={(d, i) => i.toString()}
                    renderItem={() => {
                        return (
                            <View/>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this.headerComponent}
                />
                <Header
                    onPressBack={() => this.props.navigation.goBack()}
                    style={styles.header}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
        return {
            apiToken: state.UserReducer?.apiToken ? state.UserReducer.apiToken : '',
        };
    }
;

const mapDispatchToProps = dispatch => {
        return {
            setLoadings: isLoading => dispatch(setLoading(isLoading)),
        };
    }
;

export default connect(mapStateToProps, mapDispatchToProps)(CreatorDetails);
