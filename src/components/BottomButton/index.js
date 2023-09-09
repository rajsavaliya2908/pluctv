import React from 'react';
import {View,Text} from 'react-native';
import Ripple from '../Ripple/index';
import {Colors} from 'src/utils/Colors';
import EStyleSheet from "react-native-extended-stylesheet";
import {Fonts} from "../../utils/Fonts";
import {IS_IOS} from "../../utils/theme";

class BottomButton extends React.Component {
    onClick = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Ripple
                    rippleContainerBorderRadius={this.props.border_radius}
                    onPress={this.onClick}
                    rippleCentered
                    style={styles.buttonContainer}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                </Ripple>
            </View>
        );
    }
}

export default BottomButton;

const styles = EStyleSheet.create({
    container: {
        position: 'absolute',
        bottom: IS_IOS ? 0 : 10,
        alignSelf:'center'
    },
    buttonContainer: {
        paddingHorizontal: '80rem',
        paddingVertical: '0rem',
    },
    title: {
        fontSize: '16rem',
        fontFamily: Fonts.regular,
        color:Colors.white4,
    },
});

