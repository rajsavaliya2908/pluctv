import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  SafeArea,
  CustomTextInput,
  RegisterAppBar,
  Header,
} from 'src/components';
import {Colors, Fonts, Strings} from 'src/utils/theme';
import styles from './style';

export default class VideoSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      description: '',
    };
  }

  handleInput = (txt, key) => {
    this.setState({[key]: txt});
  };

  render() {
    const {title, location, description} = this.state;
    return (
      <SafeArea statusBarColor={Colors.primary} bottomBarColor={Colors.primary}>
        <Header onPressBack={() => this.props.navigation.popToTop()} />
        <View
          style={{
            height: '28%',
            backgroundColor: 'red',
            marginBottom: 8,
          }}></View>
        <CustomTextInput
          SecureTextEntry={false}
          PlaceHolder={Strings.mobileNo}
          keyboardType={'phone-pad'}
          onChangeText={txt => this.handleInput(txt, 'title')}
          isDisbaleIcon
          value={title}
          onSubmitEditing={() => {}}
          inputStyle={styles.videoTitle}
          containerStyle={styles.titleContainer}
        />
        <CustomTextInput
          SecureTextEntry={false}
          PlaceHolder={Strings.videoDesc}
          onChangeText={txt => this.handleInput(txt, 'description')}
          isDisbaleIcon
          value={description}
          onSubmitEditing={() => {}}
          inputStyle={[styles.videoTitle, {minHeight: 150}]}
          containerStyle={styles.titleContainer}
          multiline={true}
        />
        <CustomTextInput
          SecureTextEntry={false}
          PlaceHolder={Strings.location}
          onChangeText={txt => this.handleInput(txt, 'location')}
          isDisbaleIcon
          value={location}
          onSubmitEditing={() => {}}
          inputStyle={styles.videoTitle}
          containerStyle={styles.titleContainer}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{Strings.submitFootage}</Text>
        </TouchableOpacity>
      </SafeArea>
    );
  }
}
