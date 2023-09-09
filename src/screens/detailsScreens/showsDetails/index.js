import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import {
    GroupImage,
    EpisodeTitle,
    Header,
    CreatorDetails,
    CustomImage
} from 'src/components';
import Routes from 'src/router/Routes';
import {IndiaLogo,ShowIndia} from 'src/assets/svgs';
import styles from './styles';
import {Colors, Strings, Images, ShowToast, MessageUtils} from 'src/utils/theme';
import {showCreatorData} from 'src/utils/ExternalData';
import {API_URL, AuthType} from 'src/utils/Const';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import {setLoading} from "src/redux/actions/CommonActions";
import {APIURL, RequestManager} from "src/api";
import {ResponseCode} from "src/utils/Const";

const requestManager = new RequestManager();

class ShowsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [
                {image: Images.userImage, name: 'John Doe'},
                {image: Images.userImage, name: 'Jane Doe'},
                {image: Images.userImage, name: 'Jackie'},
                {image: Images.userImage, name: 'John Doe'},
                {image: Images.userImage, name: 'John Doe'},
                {image: Images.userImage, name: 'John Doe'},
            ],
            seasonDropdown: [
                {label: 'Season 1', value: 'Season 1'},
                {label: 'Season 2', value: 'Season 2'},
            ],
            seasonSelect: '',
            showsInfo: props.route.params.showsData
                ? props.route.params.showsData
                : '',
            // seasonDatas: seasonData,
            showCreatorDatas: showCreatorData,
            seasonData: [],
            allSeasonData: [],
            selectedSeason: 1,
            creatorData: [],
            isShowFollow: true,
            isFollowed: false
        };
    }

    componentDidMount() {
        const showData = this.props.route.params.showsData;

        if (showData?.acf?.creator) {
            this.setState({
                creatorData: showData?.acf?.creator ? showData?.acf?.creator : [],
            });
        }
        this.showsDetailAPIRequest(showData?.ID, 1);
    }

    onGoBack = () => {
        this.props.navigation.goBack();
    };

    onFollowPress = () => {
        const showData = this.props.route.params.showsData;
        const {isFollowed} = this.state;
        this.followUnFollowAPIRequest(showData?.ID,isFollowed ? 0 : 1)
    }

    showsDetailAPIRequest = async (id, season) => {
        const {season_count} = this.props.route.params.showsData;
        const {setLoadings,apiToken} = this.props;
        setLoadings(true);
        const config = {
            method: 'get',
            url: `${API_URL}${APIURL.API_GET_SHOWS_DETAILS.url}?show_id=${id}&season_number=${season}`,
            headers: {
                'Authorization': `Bearer ${apiToken}`,
            },
        };

        axios(config)
            .then(response => {
                if (response.status === 200 && response?.data) {
                    let isFollowed = false;
                    isFollowed = response?.data[0]?.is_subscribed === 1;
                    setLoadings(false);
                    if (season === 1) {
                        this.setState({
                            seasonData: response.data,
                            isFollowed: isFollowed
                        });
                    }
                    this.setState({
                        allSeasonData: [...this.state.allSeasonData, response.data],
                    });

                    if (season_count > season) {
                        this.showsDetailAPIRequest(id, season + 1);
                    }
                }
            })
            .catch(error => {
                setLoadings(false);
                console.log(error);
            });
    };

    // Server Request
    followUnFollowAPIRequest = async (id,type) => {
        const {setLoadings} = this.props;
        setLoadings(true);
        let params = {
            following_id:id,
            follow: type
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
        switch (reqId) {
            case APIURL.API_FOLLOW_UNFOLLOW.id: {
                this.props.setLoadings(false);
                switch (response.status) {
                    case ResponseCode.OK:
                    case ResponseCode.CREATED: {
                        if (response?.status === 200 && response.data.success === 1) {
                            const {isFollowed} = this.state;
                            this.setState({
                                isFollowed: !isFollowed
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
        this.props.setLoadings(false);
        switch (error.status) {
            case ResponseCode.METHOD_NOT_ALLOWED:
            case ResponseCode.BAD_REQUEST: {
                break;
            }
        }
    };

    renderSeason = (item, index) => {
        const {seasonData} = this.state;
        const {
            acf: {episode_number, season},
        } = item;
        let seasonNumber = season.replace('season_', '');
        return (
            <TouchableOpacity
                style={styles.episodeView}
                onPress={() =>
                    this.props.navigation.navigate(Routes.VideoDetails, {
                        currentEpisode: item,
                        seasonData: seasonData[0],
                    })
                }>
                <CustomImage
                    style={styles.episodeImage}
                    imageUrl={item.image}
                />
                <View style={styles.episodeSubView}>
                    <EpisodeTitle season={seasonNumber} episode={episode_number}/>
                    <Text numberOfLines={2} style={styles.episodeTitle}>
                        {item.post_title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    renderShowCreators = ({item, index}) => {
        return (
            <>
                <CreatorDetails
                    {...item}
                    onPress={() => {
                        const {navigation} = this.props;
                        navigation.navigate(Routes.CreatorDetails, {
                            data: item,
                        });
                    }}
                />
            </>
        );
    };

    hedaderComponent = () => {
        const {
            userData,
            seasonDatas,
            seasonSelect,
            seasonDropdown,
            showsInfo,
            seasonData,
            isFollowed
        } = this.state;
        const showData = this.props.route.params.showsData;
        const {acf: {banner_mobile}} = showData;
        const seasons = showData?.season_count
            ? Array(showData.season_count)
                .fill()
                .map((_, i) => `Season ${i + 1}`)
            : [];

        var post_title = showsInfo?.acf?.creator.slice(0, 3).map((item, index) => {
            return item.post_title;
        });

        return (
            <>
                <FastImage
                    style={styles.topImageBack}
                    source={{
                        uri: banner_mobile,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}>
                    <Header
                        style={styles.backButton}
                        onPressBack={this.onGoBack}
                        isMoreVisible={false}
                        isBackLabel={true}
                    />
                    <LinearGradient
                        colors={[Colors.transparent, Colors.primary]}
                        style={[styles.topImageBack, styles.gradient]}>
                        <View style={styles.imageView}>
                            <ShowIndia width={145} />
                        </View>
                            <View style={styles.contentView}>
                                <Text style={styles.showsTitle} numberOfLines={2}>
                                    {showsInfo?.post_title}
                                </Text>
                                {/* <ModalDropdown
                            disabled={seasons.length > 1 ? false : true}
                            options={seasons}
                            style={styles.dropdownMain}
                            dropdownStyle={styles.dropdown}
                            textStyle={styles.dropDownText}
                            defaultValue={seasons.length > 0 ? seasons[0] : 'Season 1'}
                            renderRow={(item, index) => {
                                return (
                                    <Text style={{paddingVertical: 7}}>{`Season ${
                                        index + 1
                                    }`}</Text>
                                );
                            }}
                            onSelect={index => {
                                this.setState({
                                    selectedSeason: index + 1,
                                    seasonData: this.state.allSeasonData[index],
                                });
                            }}
                            renderRightComponent={() => (
                                <Icon2 name="caret-down-sharp" color={Colors.white} size={14}/>
                            )}
                            isFullWidth={true}
                            showsVerticalScrollIndicator={false}
                        />*/}
                                <Text style={styles.desc} numberOfLines={9}>
                                    {showsInfo?.post_content}
                                </Text>
                                <View style={styles.usersData}>
                                    <GroupImage
                                        userData={showsInfo?.acf?.creator}
                                        style={styles.groupImageView}
                                    />

                                    <Text style={styles.name}>
                                        {post_title.toString().length > 30
                                            ? `${post_title.toString().substring(0, 27)}..  `
                                            : post_title.toString()}
                                    </Text>
                                    {/*{showsInfo?.acf?.creator.length > 1 && (
                                        <TouchableOpacity>
                                            <Text style={styles.more}>{` ${Strings.more}`}</Text>
                                        </TouchableOpacity>
                                    )}*/}
                                </View>
                                <TouchableOpacity style={[styles.usersData, isFollowed ? styles.followButton : styles.unFollowButton]}
                                                  onPress={() => this.onFollowPress()}>
                                    <Text style={isFollowed ? styles.follow : styles.unFollow}>
                                        {isFollowed ? Strings.following : Strings.follow}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    </LinearGradient>
                </FastImage>
                {/*</ImageBackground>*/}
                {seasonData.map((d, i) => {
                    return (
                        <View key={i.toString()}>
                            <Text style={styles.episodeHeader}>
                                {`Season ${this.state.selectedSeason}`}
                            </Text>
                            <FlatList
                                data={d.episodes}
                                renderItem={({item, index}) => this.renderSeason(item, index)}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={[this.state, this.props]}
                                horizontal
                                contentContainerStyle={{paddingLeft: 16}}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    );
                })}
                <Text style={[styles.episodeHeader, {marginBottom: 8}]}>
                    {Strings.showCreators}
                </Text>
                <Text style={styles.showDesc}>{Strings.showDesc}</Text>
            </>
        );
    };

    render() {
        const {showCreatorDatas, creatorData} = this.state;
        return (
            <FlatList
                data={creatorData}
                renderItem={this.renderShowCreators}
                keyExtractor={(item, index) => index.toString()}
                extraData={[this.state, this.props]}
                ListHeaderComponent={this.hedaderComponent}
                numColumns={2}
                columnWrapperStyle={styles.columnStyle}
                contentContainerStyle={[styles.scrollContainer]}
                style={{backgroundColor: Colors.primary}}
                showsVerticalScrollIndicator={false}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        apiToken: state.UserReducer?.apiToken ? state.UserReducer.apiToken : '',
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        setLoadings: isLoading => dispatch(setLoading(isLoading)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowsDetails);
