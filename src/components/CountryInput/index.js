import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, TextInput, Text, View} from 'react-native';
import CountryPicker, {DEFAULT_THEME} from 'react-native-country-picker-modal';
import {Colors} from "../../utils/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import {Ripple} from "../index";

const CountryInput = ({
                         style,
                         countryCode,
                         onCodeChange,
                         disabled,
                         ...props
                     }) => {
    const [cVisible, setCVisible] = useState(false);
    return (

            <Ripple style={[{
                alignItems: 'center',
                backgroundColor: Colors.theGrey,
                flexDirection: 'row',
                padding: 4,
                paddingRight: 0,
                borderRadius: 4
            },style]} onPress={() => setCVisible(true)}>
                <CPicker
                    countryCode={countryCode}
                    onSelect={onCodeChange}
                    onPress={() => setCVisible(true)}
                    onClose={() => setCVisible(false)}
                    visibleCountryCode={cVisible}
                />
                <Icon name="chevron-down-outline" size={26} color={Colors.white} style={{right:8}}/>
            </Ripple>
    );
};

const CPicker = ({
                     countryCode,
                     onPress,
                     visibleCountryCode,
                     onClose,
                     onSelect,
                 }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <CountryPicker
                onSelect={onSelect}
                containerButtonStyle={{
                    paddingLeft:4,
                    paddingVertical:4,
                    paddingRight:0,
                    margin:0,
                }}
                theme={DEFAULT_THEME}
                countryCode={countryCode}
                withCallingCodeButton={false}
                withCountryNameButton={false}
                withFlag={true}
                withEmoji={true}
                withFilter={true}
                withCallingCode={true}
                withFlagButton={true}
                withAlphaFilter={true}
                visible={visibleCountryCode}
                onClose={onClose}
                translation="eng">
            </CountryPicker>
        </TouchableOpacity>
    );
};

export default CountryInput;
