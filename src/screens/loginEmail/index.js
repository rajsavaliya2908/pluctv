import React, {useState} from 'react';
import {View,Text} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {Colors} from "src/utils/Colors";
import {BottomButton, RegisterAppBar, SafeArea, CustomTextInput, RoundButton} from "src/components";
import {Strings} from "src/utils/Strings";
import Routes from "src/router/Routes";
import {Password, User, UserWhite} from "src/assets/svgs";
import {CommonStyles, ShowToast, MessageUtils} from "src/utils/theme";

import {setLoading} from "src/redux/actions/CommonActions";
import {connect} from "react-redux";
import {APIURL, RequestManager} from "src/api";
import {ResponseCode} from "src/utils/Const";
import {setApiToken, setUserInfo} from "../../redux/actions/UserActions";

const requestManager = new RequestManager();

const LoginEmail = ({navigation, setLoading,setUserInfo,setApiToken}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    const onLoginPress = () => {
        if (!userName.trim().length) {
            ShowToast(MessageUtils.Errors.emailBlank);
        } else if (!password.trim().length) {
            ShowToast(MessageUtils.Errors.passwordBlank);
        } else {
            userLoginRequest();
            //navigation.navigate(Routes.LoginVerification)
        }
    }

    const onForgotPress = () => {
    }

    const onRegisterPress = () => {
        navigation.navigate(Routes.Register)
    }


    // Server Request
    const userLoginRequest = async () => {
        setLoading(true);
        let params = {
            user: userName,
            password: password,
        };
        await requestManager.doRequest(
            APIURL.API_USER_LOGIN_EMAIL,
            params,
            onResponse,
            onError,
        );
    };

    const getUserProfile = async () => {
        setLoading(true);
        let params = {};
        await requestManager.doRequest(
            APIURL.API_GET_USER_PROFILE,
            params,
            onResponse,
            onError,
        );
    };

    // API RESPONSE
    const onResponse = (response, reqId) => {
        switch (reqId) {
            case APIURL.API_USER_LOGIN_EMAIL.id: {
                setLoading(false);
                switch (response.status) {
                    case ResponseCode.OK:
                    case ResponseCode.CREATED: {
                        if (response?.status === 200 && response.data?.user_id) {
                            setApiToken(response.data.access_token);
                            getUserProfile();
                        } else if (response?.status === 200 && response.data?.code !== "1") {
                            ShowToast(response.data.message);
                        } else {
                            ShowToast(MessageUtils.Errors.APIError);
                        }
                        console.log(response, 'Response');
                        break;
                    }
                }
                break;
            }

            case APIURL.API_GET_USER_PROFILE.id: {
                setLoading(false);
                switch (response.status) {
                    case ResponseCode.OK:
                    case ResponseCode.CREATED: {
                        if (response?.status === 200 && response.data?.id) {
                            setUserInfo(response.data);
                            navigation.replace(Routes.Tabs);
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
        <SafeArea statusBarColor={Colors.primary} bottomBarColor={Colors.primary}>
            <RegisterAppBar back={true}/>
            <KeyboardAwareScrollView
                bounces={false}
                overScrollMode="never"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={CommonStyles.keyboardScrollview}>
                <View style={CommonStyles.authContainer}>
                    <View style={CommonStyles.authTitleContainer}>
                        <Text style={CommonStyles.authMainTitle}>
                            {Strings.welcomeBack}
                        </Text>
                    </View>
                    <View>
                        <View style={styles.formContainer}>
                            <CustomTextInput
                                LeftIcon={UserWhite}
                                SecureTextEntry={false}
                                PlaceHolder={Strings.emailID}
                                onChangeText={setUserName}
                                onSubmitEditing={() => {
                                }}
                                inputStyle={styles.inputBox}
                                keyboardType={'email-address'}
                            />
                            <CustomTextInput
                                LeftIcon={Password}
                                SecureTextEntry={true}
                                PlaceHolder={Strings.password}
                                onChangeText={setPassword}
                                onSubmitEditing={() => {
                                }}
                                inputStyle={styles.inputBox}
                                containerStyle={styles.inputContainer}
                            />
                        </View>
                        <RoundButton
                            border_radius={4}
                            btn_block
                            backgroundColor={Colors.yellow1}
                            borderColor={Colors.yellow1}
                            textColor={Colors.primary}
                            borderWidth={0}
                            click={() => onLoginPress()}
                            isArrow={true}>
                            {Strings.login}
                        </RoundButton>
                        <View style={styles.forgotView}>
                            <RoundButton
                                border_radius={4}
                                btn_block
                                backgroundColor={Colors.primary}
                                borderColor={Colors.primary}
                                textColor={Colors.yellow1}
                                borderWidth={1}
                                click={() => onForgotPress()}
                                isArrow={false}>
                                {Strings.forgotPassword}
                            </RoundButton>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <BottomButton title={Strings.register} onPress={() => onRegisterPress()}/>
        </SafeArea>
    );
};


const mapDispatchToProps = (dispatch) => {
    return {
        setUserInfo: (apiToken) => dispatch(setUserInfo(apiToken)),
        setApiToken: (apiToken) => dispatch(setApiToken(apiToken)),
        setLoading: (isLoading) => dispatch(setLoading(isLoading)),
    };
};

export default connect(null, mapDispatchToProps)(LoginEmail);


