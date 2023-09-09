import React from 'react';
import {View, Platform,Text} from 'react-native';
import {Colors} from 'src/utils/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from 'src/utils/Fonts';
import Icon from "react-native-vector-icons/MaterialIcons";
import {Strings} from "../../utils/Strings";
import Ripple from "../Ripple";


const RegisterAppBar = (props) => {
    const navigation = useNavigation();
    const {
        back = false,
        shadow = false,
        style = {},
    } = props;
    return (
        <View style={[styles.container, shadow ? styles.shadow : {}, style]}>
            <View style={styles.leftContainer}>
                {back && (
                    <Ripple
                        style={styles.backContainer}
                        onPress={() => navigation.goBack()}
                       >
                        <Icon name="arrow-back-ios" size={22} color={Colors.white} />
                        <Text style={styles.title}>
                            {Strings.back}
                        </Text>
                    </Ripple>
                )}
            </View>
        </View>
    );
};

export default RegisterAppBar;

const styles = EStyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60rem',
        width: '100%',
        backgroundColor: Colors.primary,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: Colors.black,
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    title: {
        color: Colors.white,
        fontSize: '14rem',
        letterSpacing: '-0.15rem',
        fontFamily: Fonts.regular,
        marginLeft:'4rem'
    },
    back: {
        width: '26rem',
        height: '26rem',
    },
    backContainer: {
        paddingLeft: '10rem',
        paddingRight: '16rem',
        paddingVertical: '16rem',
        alignItems: 'center',
        flexDirection: 'row'
    },
    titleLeftPadding: {
        marginLeft: '24rem',
    },
    drawer: {
        paddingLeft: '24rem',
        paddingRight: '16rem',
        paddingVertical: '16rem',
    },
    smallTitle: {
        fontFamily: Fonts.medium,
        color: Colors.white,
        fontSize: '16rem',
        letterSpacing: '0rem',
    },
    subTitle: {
        fontFamily: Fonts.regular,
        color: Colors.white,
        fontSize: '12rem',
        letterSpacing: '-0.7rem',
    },
    titleContainer: {},
    center: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '25%',
    },
});
