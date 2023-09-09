import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {SafeArea} from 'src/components';
import {Colors} from 'src/utils/Colors';
import Routes from 'src/router/Routes';
import {SplashIcon} from "src/assets/svgs";
import {connect} from "react-redux";

const Splash = ({navigation, userInfo, apiToken}) => {
    useEffect(() => {
        setTimeout(() => {
            gotoNext();
        }, 3000)
    }, []);

    const gotoNext = () => {
        if (userInfo !== '' && apiToken !== '') {
            navigation.replace(Routes.Tabs);
        } else {
            navigation.replace(Routes.SplashOnboarding);
        }
    };


    return (
        <SafeArea statusBarColor={Colors.primary} bottomBarColor={Colors.primary}>
            <View style={styles.container}>
                <SplashIcon height={150} width={150}/>
            </View>
        </SafeArea>
    );
};


const mapStateToProps = state => {
    return {
        userInfo: state?.UserReducer?.userInfo,
        apiToken: state?.UserReducer?.apiToken,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

