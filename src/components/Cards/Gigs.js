import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import {Colors, Fonts, Strings} from '../../utils/theme';
import moment from "moment";

const Gigs = props => {
  const {meta:{location,display_types},title,post_date,  onPress, jobStatus, postDate, expiresIn, post_title} =
    props;
  const publishDate = new Date(post_date);
  const momentDate = moment(publishDate);
  const displayDate = momentDate.format('DD MMM');
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{post_title}</Text>
        <View style={styles.centerView}>
          {location ? <SubComponent icon="map-marker" text={location} /> : <View/>}
          {display_types[0]?.name ? <SubComponent icon="briefcase-variant-outline" text={display_types[0]?.name} /> : <View/>}
      </View>
      <View style={[styles.centerView, {marginTop: 0}]}>
        <SubComponent icon="calendar-blank-outline" text={`${Strings.posted} ${displayDate}`} />
      </View>
      <View style={styles.bottomContainer}>
        {/*   <View style={styles.expireView}>
          <Text style={[styles.subText, {fontSize: 12}]}>{expiresIn}</Text>
        </View>
        <Icon1
          name="more-vertical"
          color={Colors.white2}
          size={22}
          style={styles.menu}
          onClick={() => console.log('more')}
        />*/}
      </View>
    </TouchableOpacity>
  );
};

const formatDate = (date) => {
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let year = date.getFullYear();
  return day + "/" + month + "/" + year;
}

const SubComponent = ({icon, text}) => {
  return (
    <>
      <Icon name={icon} color={Colors.white2} size={23} />
      <Text style={styles.subText}>{text}</Text>
    </>
  );
};

export default Gigs;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: Colors.grey,
    marginBottom: '16rem',
    padding: '16rem',
    borderRadius: '4rem',
  },
  title: {
    color: Colors.white2,
    fontSize: '17rem',
    fontFamily: Fonts.bold,
  },
  centerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15rem',
    marginBottom: '11rem',
  },
  subText: {
    color: Colors.white2,
    fontFamily: Fonts.regular,
    marginHorizontal: '8rem',
    fontSize: '11rem',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  expireView: {
    backgroundColor: Colors.red,
    borderRadius: 19,
    paddingVertical: 5,
  },
});
