import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeArea, Label, Header} from 'src/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Strings} from 'src/utils/theme';
import sanitizeHtml from 'sanitize-html';
import styles from './styles';

export default class GigsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.route.params ? props.route.params.data : null,
      isCourses: props.route.params && props.route.params.type === 'courses',
    };
  }

  onPressBack = () => {
    this.props.navigation.goBack();
  };

  rednerDateTime = (icon, text) => {
    return null;
    // <View style={styles.dateTimeView}>
    //   <Icon name={icon} color={Colors.grey3} size={18} />
    //   <Label color={Colors.grey3} ms={8} style={styles.font12}>
    //     {text}
    //   </Label>
    // </View>
  };

  render() {
    const {details, isCourses} = this.state;
    console.log('details', details);
    const htmlContent = sanitizeHtml(details.post_content,{
      allowedTags: [],
      allowedAttributes: {}
    });

    return (
      <SafeArea statusBarColor={Colors.primary} bottomBarColor={Colors.primary}>
        <Header onPressBack={this.onPressBack} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topView}>
            {!isCourses && (
              <Label color={Colors.grey1} mb={10} style={styles.font12}>
                {`Published on ${moment(details.post_date).format(
                  'DD/MM/YYYY',
                )}`}
              </Label>
            )}
            <Label font_bold style={styles.font18}>
              {details.post_title}
            </Label>
            {!isCourses ? (
              <View style={styles.paidStatus}>
                <Label color={Colors.primary} style={styles.font12}>
                  {details.meta?.display_types?.[0].name}
                </Label>
              </View>
            ) : (
              <>
                {this.rednerDateTime(
                  'calendar-month-outline',
                  'September 24, 2021',
                )}
                {this.rednerDateTime(
                  'clock-time-three-outline',
                  '5:00 pm - 7:00 pm',
                )}
              </>
            )}
          </View>
          <Label ms={20} mt={20} me={20} mb={20} style={styles.font12}>
            {htmlContent}
          </Label>
          <TouchableOpacity style={styles.applyButton}>
            <Label color={Colors.primary}>{isCourses ? Strings.bookNow : Strings.apply}</Label>
          </TouchableOpacity>
        </ScrollView>
      </SafeArea>
    );
  }
}
