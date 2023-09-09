import React, {useState} from 'react';
import {View,Text} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {Colors} from "src/utils/Colors";
import {
    BottomButton,
    RegisterAppBar,
    SafeArea,
    RoundButton,
    OTPInputView
} from "src/components";
import {Strings} from "src/utils/Strings";
import Routes from "src/router/Routes";
import {CommonStyles, ShowToast, MessageUtils} from "src/utils/theme";
import {setLoading} from "src/redux/actions/CommonActions";
import {APIURL, RequestManager} from "src/api";
import {AuthType, ResponseCode} from "src/utils/Const";
import {connect} from "react-redux";
import {setApiToken, setUserInfo} from "src/redux/actions/UserActions";

const requestManager = new RequestManager();

const RegisterVerification = ({navigation, route, setLoading, setUserInfo, setApiToken}) => {

    const countryCode = route?.params?.countryCode ? route?.params?.countryCode : '+91';
    const mobileNumber = route?.params?.mobileNumber ? route?.params?.mobileNumber : '7894561230';

    const [otp, setOtp] = useState('');

    const onRegisterPress = () => {
        if (!otp.trim().length) {
            ShowToast(MessageUtils.Errors.otpBlank);
        } else {
            userVerifyOTPRequest()
        }
    }

    const onResendPress = () => {
        resendOTPRequest()
    }

    const onLoginPress = () => {
        navigation.navigate(Routes.Login)
    }

    // Server Request
    const userVerifyOTPRequest = async () => {
        setLoading(true);
        let params = {
            countrycode: countryCode,
            mobileNo: mobileNumber,
            otp: otp,
            type: AuthType.REGISTER
        };
        await requestManager.doRequest(
            APIURL.API_USER_VERIFY_OTP,
            params,
            onResponse,
            onError,
        );
    };

    const resendOTPRequest = async () => {
        setLoading(true);
        let params = {
            countrycode: countryCode,
            mobileNo: mobileNumber,
            type: AuthType.REGISTER
        };
        await requestManager.doRequest(
            APIURL.API_USER_SEND_OTP,
            params,
            onResponse,
            onError,
        );
    };


    // API RESPONSE
    const onResponse = (response, reqId) => {
        switch (reqId) {
            case APIURL.API_USER_VERIFY_OTP.id: {
                setLoading(false);
                switch (response.status) {
                    case ResponseCode.OK:
                    case ResponseCode.CREATED: {
                        if (response?.status === 200 && response.data?.code === 0) {
                            ShowToast(response.data.message);
                        } else if (response?.status === 200 && response.data?.code === 1) {
                            navigation.navigate(Routes.RegisterFromMobile, {
                                mobileNumber: mobileNumber,
                                countryCode: countryCode,
                                otp: otp
                            });
                        } else {
                            ShowToast(MessageUtils.Errors.APIError);
                        }
                        break;
                    }
                }
                break;
            }


            case APIURL.API_USER_SEND_OTP.id: {
                setLoading(false);
                switch (response.status) {
                    case ResponseCode.OK:
                    case ResponseCode.CREATED: {
                        if (response?.status === 200 && response.data?.code === "1") {
                            setOtp('');
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
                            {Strings.phoneVerification}
                        </Text>
                    </View>
                    <View>
                        <Text style={CommonStyles.authSubText}>
                            {Strings.pleaseEnter}
                        </Text>
                        <Text style={[CommonStyles.authSubText,{color:Colors.yellow,marginTop:16}]}>
                            {`${countryCode} ${mobileNumber}`}
                        </Text>
                        <OTPInputView
                            style={styles.OTPContainer}
                            pinCount={6}
                            code={otp}
                            onCodeChanged={code => {
                                setOtp(code);
                            }}
                            autoFocusOnLoad
                            keyboardType={'phone-pad'}
                            codeInputFieldStyle={styles.OTPInputBox}
                            selectionColor={Colors.yellow1}
                        />
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
                        <View style={styles.forgotView}>
                            <RoundButton
                                border_radius={4}
                                btn_block
                                backgroundColor={Colors.primary}
                                borderColor={Colors.primary}
                                textColor={Colors.yellow1}
                                borderWidth={1}
                                click={() => onResendPress()}
                                isArrow={false}>
                                {Strings.resendCode}
                            </RoundButton>
                        </View>
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

export default connect(null, mapDispatchToProps)(RegisterVerification);


