import React, {useState} from 'react';
import {View, Keyboard,Text} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {Colors} from "src/utils/Colors";
import {BottomButton, RegisterAppBar, SafeArea, CustomTextInput, RoundButton,CountryInput} from "src/components";
import {Strings} from "src/utils/Strings";
import Routes from "src/router/Routes";
import {Call} from "src/assets/svgs";
import {CommonStyles, ShowToast,MessageUtils} from "src/utils/theme";
import {setLoading} from "src/redux/actions/CommonActions";
import {connect} from "react-redux";
import {APIURL,RequestManager} from "src/api";
import {AuthType, ResponseCode} from "src/utils/Const";

const requestManager = new RequestManager();

const Register = ({navigation,setLoading}) => {
    const [countryCode, setCountryCode] = useState({
        cca2: 'IN',
        callingCode: ['91'],
    });

    const [mobileNo, setMobileNo] = useState('');

    const onRegisterPress = () => {
        Keyboard.dismiss();
        if (!mobileNo.trim().length) {
            ShowToast(MessageUtils.Errors.mobileNoBlank);
        } else {
            userRegisterRequest()
        }
    }

    const onRegisterEmailPress = () => {
        Keyboard.dismiss();
        navigation.navigate(Routes.RegisterEmail)
    }

    const onLoginPress = () => {
        navigation.navigate(Routes.Login)
    }

    // Server Request
    const userRegisterRequest = async () => {
        setLoading(true);
        let params = {
            countrycode: `+${countryCode.callingCode[0]}`,
            mobileNo: mobileNo,
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
            case APIURL.API_USER_SEND_OTP.id: {
                setLoading(false);
                switch (response.status) {
                    case ResponseCode.OK:
                    case ResponseCode.CREATED: {
                        if (response?.status === 200 && response.data?.code === "1") {
                            navigation.navigate(Routes.RegisterVerification, {
                                mobileNumber: mobileNo,
                                countryCode: `+${countryCode.callingCode[0]}`
                            });
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
            <RegisterAppBar back={false}/>
            <KeyboardAwareScrollView
                bounces={false}
                overScrollMode="never"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={CommonStyles.keyboardScrollview}>
                <View style={CommonStyles.authContainer}>
                    <View style={CommonStyles.authTitleContainer}>
                        <Text color={Colors.white} font_bold style={CommonStyles.authMainTitle}>
                            {Strings.createAnAccount}
                        </Text>
                    </View>
                    <View>
                        <Text style={CommonStyles.authSubText}>
                            {Strings.registerMobile}
                            <Text style={[CommonStyles.authSubText,{color:Colors.yellow}]}>
                                {Strings.mobileNumber}
                            </Text>
                        </Text>
                        <View style={styles.formContainer}>
                            <CountryInput
                                countryCode={countryCode.cca2}
                                onCodeChange={setCountryCode}
                                style={styles.countryBox}
                            />
                            <CustomTextInput
                                LeftIcon={Call}
                                SecureTextEntry={false}
                                PlaceHolder={Strings.mobileNo}
                                keyboardType={'phone-pad'}
                                onChangeText={setMobileNo}
                                onSubmitEditing={() => {
                                }}
                                inputStyle={styles.mobileInput}
                                props={{
                                    maxLength:10
                                }}
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

                        <View style={styles.lineContainer}>
                            <View style={styles.lineView}/>
                            <Text style={[CommonStyles.authSubText,{marginHorizontal:10}]}>
                                {Strings.or}
                            </Text>
                            <View style={styles.lineView}/>
                        </View>

                        <RoundButton
                            border_radius={4}
                            btn_block
                            backgroundColor={Colors.primary}
                            borderColor={Colors.yellow1}
                            textColor={Colors.yellow1}
                            click={() => onRegisterEmailPress()}
                            isArrow={false}
                            borderWidth={1}>
                            {Strings.registerEmail}
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
        setLoading: (isLoading) => dispatch(setLoading(isLoading)),
    };
};

export default connect(null, mapDispatchToProps)(Register);



