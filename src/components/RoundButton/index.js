import React from 'react';
import {View, TouchableHighlight, Text, ActivityIndicator, StyleSheet} from 'react-native';
import Ripple from '../Ripple/index';
import {Colors} from 'src/utils/Colors';
import PropTypes from 'prop-types';
import styles from "../CustomTextInput/styles";
import {ArrowRight} from "../../assets/svgs";
import {Label} from "../index";
import {Fonts} from "../../utils/Fonts";

class RoundButton extends React.Component {
    onClick = () => {
        if (this.props.click) {
            this.props.click();
        }
    };

    render() {
        let btnContainerStylesArray = [];
        let btnTextStylesArray = [];
        const {isArrow,borderWidth,textColor} = this.props;
        let btnWholeStyles = [];
        btnWholeStyles.push({
            marginTop: this.props.mt,
            marginBottom: this.props.mb,
            marginStart: this.props.ms,
            marginEnd: this.props.me,
        });
        if (this.props.btn_block) {
            btnWholeStyles.push({
                alignSelf: 'stretch',
            });
        }

        let borderColor = this.props.borderColor
            ? this.props.borderColor
            : this.props.backgroundColor;
        btnContainerStylesArray.push({
            backgroundColor: this.props.backgroundColor,
            borderColor: borderColor,
            alignItems: 'center',
            borderRadius: this.props.border_radius,
            borderWidth: 1,
            borderBottomWidth: 1,
        });
        btnTextStylesArray.push({color: this.props.textColor});
        if (this.props.width) {
            btnTextStylesArray.push({width: this.props.width});
        }
        if (this.props.disabled) {
            btnWholeStyles.push({opacity: 0.5});
        }

        return (
            <TouchableHighlight style={[btnWholeStyles, {
                borderRadius: this.props.border_radius,
                borderColor: borderColor,
                borderWidth:borderWidth,
            }]}>
                <View>
                    <Ripple
                        style={[this.props.containerStyle, {
                            height:40,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection:'row',
                            backgroundColor: this.props.backgroundColor,
                            borderColor: borderColor,
                            borderRadius: this.props.border_radius,
                        }]}
                        rippleContainerBorderRadius={this.props.border_radius}
                        onPress={this.onClick}
                        disabled={this.props.disabled || this.props.loading}>
                        {this.props.loading ?
                            <View style={{
                                ...StyleSheet.absoluteFillObject,
                                alignItems: 'center', justifyContent: 'center',
                            }}>
                                <ActivityIndicator color={Colors.white}
                                                   size={'small'}/>
                            </View>
                            : null
                        }
                        <Text style={[btnTextStylesArray,
                            {fontSize: 16,lineHeight:18,marginRight: isArrow ? 8 : 0,
                                fontWeight:'400',
                            fontFamily:Fonts.regular},
                            this.props.loading ? {color: Colors.transparent} : null]}>
                            {this.props.children}
                        </Text>
                        {isArrow &&
                        <ArrowRight width={24} height={24}
                                    color={textColor}/>}
                    </Ripple>
                </View>
            </TouchableHighlight>
        );
    }
}

RoundButton.defaultProps = {
    ...TouchableHighlight.defaultProps,
    textColor: Colors.white,
    backgroundColor: Colors.primary,
    btn_xs: false,
    btn_sm: false,
    btn_lg: false,
    btn_xl: false,
    btn_block: false,
    border_radius: 30,
    mt: 0,
    mb: 0,
    ms: 0,
    me: 0,
    width: null,
};
RoundButton.propTypes = {
    ...TouchableHighlight.propTypes,
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    btn_xs: PropTypes.bool,
    btn_sm: PropTypes.bool,
    btn_lg: PropTypes.bool,
    btn_xl: PropTypes.bool,
    btn_block: PropTypes.bool,
    border_radius: PropTypes.number,
    mt: PropTypes.number,
    mb: PropTypes.number,
    ms: PropTypes.number,
    me: PropTypes.number,
    width: PropTypes.number,
};
export default RoundButton;
