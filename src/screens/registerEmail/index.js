import React, {useState} from 'react';
import {View, Keyboard,Text} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {Colors} from "src/utils/Colors";
import {BottomButton, Label, RegisterAppBar, SafeArea, CustomTextInput, RoundButton} from "src/components";
import {Strings} from "src/utils/Strings";
import Routes from "src/router/Routes";
import {Password, User, UserWhite} from "src/assets/svgs";
import {CommonStyles, ShowToast, MessageUtils} from "src/utils/theme";

const RegisterEmail = ({navigation}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onRegisterPress = () => {
        Keyboard.dismiss();
        if (!userName.trim().length) {
            ShowToast(MessageUtils.Errors.usernameBlank);
        } else if (!password.trim().length) {
            ShowToast(MessageUtils.Errors.passwordBlank);
        } else if (!confirmPassword.trim().length) {
            ShowToast(MessageUtils.Errors.passwordBlank);
        } else if (password.trim() !== confirmPassword.trim()) {
            ShowToast(MessageUtils.Errors.pwdMisMatch);
        } else {
            //navigation.navigate(Routes.RegisterVerification)
        }
    }

    const onLoginPress = () => {
        Keyboard.dismiss();
        navigation.navigate(Routes.Login)
    }


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
                        <Text color={Colors.white} font_bold style={CommonStyles.authMainTitle}>
                            {Strings.createAnAccount}
                        </Text>
                    </View>
                    <View>
                        <View style={styles.formContainer}>
                            <CustomTextInput
                                LeftIcon={UserWhite}
                                SecureTextEntry={false}
                                PlaceHolder={Strings.userNameOrEmail}
                                onChangeText={setUserName}
                                onSubmitEditing={() => {
                                }}
                                inputStyle={styles.inputBox}
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
                            <CustomTextInput
                                LeftIcon={Password}
                                SecureTextEntry={true}
                                PlaceHolder={Strings.confirmPassword}
                                onChangeText={setConfirmPassword}
                                onSubmitEditing={() => {
                                }}
                                inputStyle={styles.inputBox}
                                containerStyle={styles.inputContainer}
                            />
                            <View style={{marginTop:18}}>
                                <Text style={CommonStyles.authSubText}>
                                    {Strings.byClickingThe}
                                    <Text style={[CommonStyles.authSubText,{color:Colors.yellow}]}>
                                        {Strings.register}
                                        <Text style={CommonStyles.authSubText}>
                                            {Strings.youAgreeToOurTerms}
                                        </Text>
                                    </Text>
                                </Text>
                            </View>
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

export default RegisterEmail;


