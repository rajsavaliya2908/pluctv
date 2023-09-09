import React, {useState} from 'react';
import {View, Keyboard,Text} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {Colors} from "src/utils/Colors";
import {BottomButton, Label, RegisterAppBar, SafeArea, CustomTextInput, RoundButton} from "src/components";
import {Strings} from "src/utils/Strings";
import Routes from "src/router/Routes";
import {EmailInput, Password, User, UserWhite} from "src/assets/svgs";
import {CommonStyles, ShowToast, MessageUtils} from "src/utils/theme";
import {setApiToken, setUserInfo} from "../../redux/actions/UserActions";
import {setLoading} from "src/redux/actions/CommonActions";
import {connect} from "react-redux";
import {APIURL,RequestManager} from "src/api";
import {AuthType, ResponseCode} from "src/utils/Const";

const requestManager = new RequestManager();

const RegisterFromMobile = ({navigation,route,setLoading, setUserInfo, setApiToken}) => {

    const countryCode = route?.params?.countryCode ? route?.params?.countryCode : '+91';
    const mobileNumber = route?.params?.mobileNumber ? route?.params?.mobileNumber : '7894561230';
    const otp = route?.params?.otp ? route?.params?.otp : '123456';

    const [userName, setUserName] = useState('');
    const [emailID, setEmailID] = useState('');
    const [password, setPassword] = useState('');

    const onRegisterPress = () => {
        Keyboard.dismiss();
        if (!userName.trim().length) {
            ShowToast(MessageUtils.Errors.nameBlank);
        } else if (!emailID.trim().length) {
            ShowToast(MessageUtils.Errors.emailBlank);
        } else if (!password.trim().length) {
            ShowToast(MessageUtils.Errors.passwordBlank);
        } else {
            userRegisterAPIRequest();
        }
    }

    const onLoginPress = () => {
        Keyboard.dismiss();
        navigation.navigate(Routes.Login)
    }

    // Server Request
    const userRegisterAPIRequest = async () => {
        setLoading(true);
        let params = {
            digits_reg_name: userName,
            digits_reg_countrycode: countryCode,
            digits_reg_mobile: mobileNumber,
            digits_reg_password: password,
            digits_reg_email: emailID,
            otp: otp,
        };
        await requestManager.doRequest(
            APIURL.API_USER_REGISTER,
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
            case APIURL.API_USER_REGISTER.id: {
                setLoading(false);
                switch (response.status) {
                    case ResponseCode.OK:
                    case ResponseCode.CREATED: {
                        if (response?.status === 200 && response.data?.user_id) {
                            setApiToken(response.data.access_token);
                            getUserProfile()
                        } else if (response?.status === 200 && response.data?.code !== "1") {
                            ShowToast(response.data.message);
                        } else {
                            ShowToast(MessageUtils.Errors.APIError);
                        }
                        console.log(response, 'Response of User Register');
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
                            {Strings.createAnAccount}
                        </Text>
                    </View>
                    <View>
                        <View style={styles.formContainer}>
                            <CustomTextInput
                                LeftIcon={UserWhite}
                                SecureTextEntry={false}
                                PlaceHolder={Strings.name}
                                onChangeText={setUserName}
                                onSubmitEditing={() => {
                                }}
                                inputStyle={styles.input}
                            />

                            <CustomTextInput
                                LeftIcon={EmailInput}
                                SecureTextEntry={false}
                                PlaceHolder={Strings.emailID}
                                onChangeText={setEmailID}
                                onSubmitEditing={() => {
                                }}
                                inputStyle={styles.input}
                                containerStyle={styles.inputContainer}
                                keyboardType={'email-address'}
                            />
                            <CustomTextInput
                                LeftIcon={Password}
                                SecureTextEntry={true}
                                PlaceHolder={Strings.password}
                                onChangeText={setPassword}
                                onSubmitEditing={() => {
                                }}
                                inputStyle={styles.input}
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
                            click={() => onRegisterPress()}
                            isArrow={true}>
                            {Strings.register}
                        </RoundButton>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <BottomButton title={Strings.login} onPress={() => onLoginPress()}/>
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

export default connect(null, mapDispatchToProps)(RegisterFromMobile);


