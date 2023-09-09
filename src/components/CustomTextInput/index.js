import React from 'react';
import {TextInput, View} from 'react-native';
import styles from './styles';
import {Colors} from '../../utils/Colors';

const TextInputUI = ({
  onChangeText,
  onSubmitEditing,
  SecureTextEntry,
  PlaceHolder,
  keyboardType,
  LeftIcon,
  isDisbaleIcon,
  containerStyle,
  inputStyle,
  value,
  multiline,
    props
}) => {
  const handleOnChangeText = text => {
    onChangeText(text);
  };

  const handleOnSubmitEditing = () => {
    onSubmitEditing();
  };

  return (
    <View
      style={[
        styles.inputContainer,
        containerStyle,
        multiline && {paddingVertical: 8, minHeight: 150},
      ]}>
      {!isDisbaleIcon && (
        <LeftIcon width={24} height={24} style={styles.leftIcon} />
      )}
      <TextInput
        onSubmitEditing={handleOnSubmitEditing}
        secureTextEntry={!!SecureTextEntry}
        placeholderTextColor={'white'}
        placeholder={PlaceHolder}
        style={[styles.input, inputStyle]}
        keyboardType={keyboardType}
        autoCapitalize="none"
        onChangeText={handleOnChangeText}
        selectionColor={Colors.yellow1}
        value={value}
        multiline={multiline ? multiline : false}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...props}
        // numberOfLines={multiline ? 5 : 1}
      />
    </View>
  );
};

export default TextInputUI;
