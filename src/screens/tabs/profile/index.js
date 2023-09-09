import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import styles from './styles';
import {Colors} from "src/utils/Colors";
import {Label, RoundButton, SafeArea} from "src/components";
import FastImage from "react-native-fast-image";
import {Images} from "src/assets/images";
import {Strings} from "src/utils/Strings";
import {setApiToken, setUserInfo} from "src/redux/actions/UserActions";
import {connect} from "react-redux";
import {setLoading} from "src/redux/actions/CommonActions";
import {APIURL, RequestManager} from "src/api";
import {ResponseCode} from "src/utils/Const";
import {ShowToast} from "src/utils/Toast";
import {MessageUtils} from "src/utils/theme";
import Routes from "src/router/Routes";

const requestManager = new RequestManager();

const Profile = ({navigation, setUserInfo, setApiToken, setLoading,userInfo,userProfileURL, userName }) => {

    const userProfile = userProfileURL !== null && userProfileURL['96'] ? userProfileURL['96'] : Images.dummy_profile;

    const logoutAPIRequest = async () => {
        setLoading(true);
        let params = {};
        await requestManager.doRequest(
            APIURL.API_USER_LOGOUT,
            params,
            onResponse,
            onError,
        );
    };

    // API RESPONSE
    const onResponse = (response, reqId) => {
        switch (reqId) {
            case APIURL.API_USER_LOGOUT.id: {
                setLoading(false);
                switch (response.status) {
                    case ResponseCode.OK:
                    case ResponseCode.CREATED: {
                        if (response?.status === 200 && response.data.success) {
                            setUserInfo('');
                            setApiToken('');
                            navigation.replace(Routes.Login);
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

    const onError = (error, reqId) => {
        setLoading(false);
        switch (error.status) {
            case ResponseCode.METHOD_NOT_ALLOWED:
            case ResponseCode.BAD_REQUEST: {
                break;
            }
        }
    };

    return (
        <SafeArea statusBarColor={Colors.primary}>
            <View style={styles.container}>
                <FastImage
                    style={styles.profileCover}
                    source={Images.profile_cover}
                    resizeMode={FastImage.resizeMode.cover}
                >
                    <TouchableOpacity style={styles.logoutView} onPress={() => logoutAPIRequest()}>
                        <Text style={styles.logout}>{Strings.logout}</Text>
                    </TouchableOpacity>
                    <View style={styles.profileContainer}>
                        <View style={styles.viewCenter}>
                            <FastImage
                                style={styles.profileImage}
                                source={{
                                    uri: userProfile,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <Text style={styles.userName}>{userName}</Text>
                        </View>
                    </View>
                </FastImage>
                <View style={styles.videoContainer}>
                    <Text bold style={styles.userName}>{Strings.noVideo}</Text>
                    <View style={styles.btnContainer}>
                        <RoundButton
                            border_radius={4}
                            btn_block
                            backgroundColor={Colors.primary}
                            borderColor={Colors.yellow1}
                            textColor={Colors.yellow1}
                            click={() => {
                            }}
                            isArrow={false}
                            borderWidth={1}>
                            {Strings.uploadVideo}
                        </RoundButton>
                    </View>

                    <RoundButton
                        border_radius={4}
                        btn_block
                        backgroundColor={Colors.primary}
                        borderColor={Colors.yellow1}
                        textColor={Colors.yellow1}
                        click={() => {
                        }}
                        isArrow={false}
                        borderWidth={1}>
                        {Strings.submitPitch}
                    </RoundButton>

                </View>
            </View>
        </SafeArea>
    );
};

const mapStateToProps = state => {
    console.log(state,"state in Profile")
    return {
        userInfo: state.UserReducer?.userInfo ? state.UserReducer.userInfo : '',
        userProfileURL: state.UserReducer?.userInfo?.avatar_urls ? state.UserReducer.userInfo.avatar_urls : null,
        userName: state.UserReducer?.userInfo?.name ? state.UserReducer.userInfo.name : null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserInfo: (apiToken) => dispatch(setUserInfo(apiToken)),
        setApiToken: (apiToken) => dispatch(setApiToken(apiToken)),
        setLoading: (isLoading) => dispatch(setLoading(isLoading)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

