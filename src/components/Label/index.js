import React from 'react';
import {Text} from 'react-native';
import {Colors} from 'src/utils/Colors';
import {Fonts} from 'src/utils/Fonts';
import PropTypes from 'prop-types';

class Label extends React.Component {
  onClick = () => {
    if (this.props.onPress) {
      this.props.onPress();
    }
  };

  render() {
    let stylesArray = [];
    if (this.props.xxlarge) {
      // stylesArray.push({fontSize: ThemeUtils.fontXXLarge});
    } else if (this.props.xlarge) {
      //  stylesArray.push({fontSize: ThemeUtils.fontXLarge});
    } else if (this.props.large) {
      //  stylesArray.push({fontSize: ThemeUtils.fontLarge});
    } else if (this.props.normal) {
      //  stylesArray.push({fontSize: ThemeUtils.fontNormal});
    } else if (this.props.small) {
      //  stylesArray.push({fontSize: ThemeUtils.fontSmall});
    } else if (this.props.xsmall) {
      //  stylesArray.push({fontSize: ThemeUtils.fontXSmall});
    } else {
      //  stylesArray.push({fontSize: ThemeUtils.fontNormal});
    }

    // if (this.props.bold) {
    //   stylesArray.push({fontWeight: '500'});
    // } else if (this.props.bolder) {
    //   stylesArray.push({fontWeight: 'bold'});
    // } else if (this.props.light) {
    //   stylesArray.push({fontWeight: '400'});
    // } else if (this.props.lighter) {
    //   stylesArray.push({fontWeight: '200'});
    // } else {
    //   stylesArray.push({fontWeight: 'normal'});
    // }

    if (this.props.font_medium) {
      stylesArray.push({fontFamily: Fonts.medium});
    } else if (this.props.font_regular) {
      stylesArray.push({fontFamily: Fonts.regular});
    } else if (this.props.font_bold) {
      stylesArray.push({fontFamily: Fonts.bold});
    } else if (this.props.font_semi_bold) {
      stylesArray.push({fontFamily: Fonts.semiBold});
    } else {
      stylesArray.push({fontFamily: Fonts.regular});
    }

    stylesArray.push({
      color: this.props.color,
      marginTop: this.props.mt,
      marginBottom: this.props.mb,
      marginStart: this.props.ms,
      marginEnd: this.props.me,
      textAlign: this.props.align,
    });
    stylesArray.push(this.props.style);
    stylesArray.push({includeFontPadding: false});
    return (
      <Text
        numberOfLines={
          this.props.singleLine
            ? 1
            : this.props.maxLine
            ? this.props.maxLine
            : null
        }
        style={stylesArray}
        onPress={this.props.onPress ? this.onClick : null}>
        {this.props.children}
      </Text>
    );
  }
}

Label.defaultProps = {
  xsmall: false,
  small: false,
  normal: false,
  large: false,
  xlarge: false,
  xxlarge: false,
  bold: false,
  bolder: false,
  lighter: false,
  light: false,
  color: Colors.white,
  font_regular: false,
  font_medium: false,
  font_bold: false,
  font_semi_bold: false,
  align: 'left',
  mt: 0,
  mb: 0,
  ms: 0,
  me: 0,
  singleLine: false,
};
Label.propTypes = {
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  normal: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  xxlarge: PropTypes.bool,
  bold: PropTypes.bool,
  bolder: PropTypes.bool,
  light: PropTypes.bool,
  lighter: PropTypes.bool,
  color: PropTypes.string,
  font_medium: PropTypes.bool,
  font_regular: PropTypes.bool,
  font_bold: PropTypes.bool,
  font_semi_bold: PropTypes.bool,
  font_ui_medium: PropTypes.bool,
  font_ui_regular: PropTypes.bool,
  mt: PropTypes.number,
  mb: PropTypes.number,
  ms: PropTypes.number,
  me: PropTypes.number,
  align: PropTypes.string,
  singleLine: PropTypes.bool,
};
export default Label;
