import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts, MessageUtils, SCREEN_WIDTH, ShowToast, Strings} from '../../utils/theme';
import {APIURL, RequestManager} from 'src/api';
import {API_URL, ResponseCode} from 'src/utils/Const';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from "react-redux";
import {setLoading} from "../../redux/actions/CommonActions";
import {CustomImage} from "../index";

const requestManager = new RequestManager();

const CreatorDetails = (props) => {
    const {ID, onPress, apiToken} = props;

    useEffect(() => {
        creatorDetailsAPIRequest(ID);
    }, []);

    const [creatorDetails, setCreatorDetails] = useState('');
    const [isFollowed, setIsFollowed] = useState(false);

    const creatorDetailsAPIRequest = async id => {
        const config = {
            method: 'get',
            url: `${API_URL}${APIURL.API_GET_CREATOR_DETAILS.url}?creator_id=${id}`,
            headers: {
                'Authorization': `Bearer ${apiToken}`,
            },
        };

        axios(config)
            .then(response => {
                if (response.status === 200 && response?.data) {
                    setCreatorDetails(response.data[0]);
                    if (response?.data[0]?.is_subscribed === 1){
                      setIsFollowed(true);
                    }else {
                      setIsFollowed(false);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const onFollowPress = () => {
      if (isFollowed){
        followUnFollowAPIRequest(ID,0)
      }else {
        followUnFollowAPIRequest(ID,1)
      }
    }


  // Server Request
  const followUnFollowAPIRequest = async (id,type) => {
   props.setLoading(true);
    let params = {
      following_id:id,
      follow: type
    };
    await requestManager.doRequest(
        APIURL.API_FOLLOW_UNFOLLOW,
        params,
        onResponse,
        onError,
    );
  };

  // API RESPONSE
  const onResponse = (response, reqId) => {
    switch (reqId) {
      case APIURL.API_FOLLOW_UNFOLLOW.id: {
        props.setLoading(false);
        switch (response.status) {
          case ResponseCode.OK:
          case ResponseCode.CREATED: {
            if (response?.status === 200 && response.data.success === 1) {
              ShowToast(response.data.message);
              setIsFollowed(!isFollowed)
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

  const onError = (error, reqId) => {
    props.setLoading(false);
    switch (error.status) {
      case ResponseCode.METHOD_NOT_ALLOWED:
      case ResponseCode.BAD_REQUEST: {
        break;
      }
    }
  };

  return (
        <TouchableOpacity style={styles.showContainer} onPress={() => onPress()}>
            <CustomImage
                style={styles.userImages}
                imageUrl={creatorDetails?.image}
            />
            <View>
                <Text style={styles.userName}>{creatorDetails?.post_title}</Text>
                {/*    <Text style={styles.status}>
                    {creatorDetails?.status}
                </Text>*/}
                {creatorDetails?.acf?.location ? (
                    <View style={styles.usersData}>
                        <Icon1 name="map-marker" color={Colors.grey1} size={16}/>
                        <Text style={[styles.status, {marginBottom: 0, marginLeft: 4}]}>
                            {creatorDetails?.acf?.location}
                        </Text>
                    </View>
                ) : (
                    <View/>
                )}
                <TouchableOpacity style={styles.followButton1} onPress={() => onFollowPress()}>
                    <Text style={styles.followText}>
                      {isFollowed ? Strings.following : Strings.follow}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const mapStateToProps = state => {
    return {
        apiToken: state.UserReducer?.apiToken ? state.UserReducer.apiToken : '',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (isLoading) => dispatch(setLoading(isLoading)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatorDetails);

const styles = EStyleSheet.create({
    showContainer: {
        backgroundColor: Colors.grey,
        // marginRight: '16rem',
        borderRadius: '4rem',
        padding: '16rem',
        alignItems: 'center',
        width: '48%',
        marginBottom: '14rem',
    },
    userImages: {
        width: '120rem',
        height: '120rem',
        borderRadius: '60rem',
        marginBottom: '15rem',
    },
    userName: {
        color: Colors.white2,
        fontFamily: Fonts.bold,
        fontSize: 14,
        minHeight: 40,
        textAlign: 'center',
        flexWrap: 'wrap',
    },
    status: {
        color: Colors.grey1,
        fontSize: '14rem',
        fontFamily: Fonts.regular,
        marginBottom: '13rem',
        textAlign: 'center',
    },
    followButton1: {
        width: '90rem',
        borderWidth: 1,
        borderColor: Colors.yellow1,
        borderRadius: '4rem',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: '5rem',
        marginTop: '15rem',
    },
    followText: {
        color: Colors.yellow1,
        fontFamily: Fonts.regular,
        fontSize: '15rem',
    },
    usersData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
