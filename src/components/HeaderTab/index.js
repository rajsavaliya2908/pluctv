import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../utils/theme';

const HeaderTab = props => {
  const {category, updateCategory, activeCategory,headerTabStyle} = props;
  return (
    <View style={[styles.categoryView,headerTabStyle]}>
      {category.map((item, index) => {
        return (
          <TouchableOpacity
            key={index.toString()}
            style={[
              styles.categoryButton,
              {
                backgroundColor:
                  activeCategory === index ? Colors.grey1 : Colors.transparent,
              },
            ]}
            onPress={() => updateCategory(index)}>
            <Text style={styles.category}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default HeaderTab;

const styles = EStyleSheet.create({
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '15rem',
    paddingHorizontal: '20rem',
  },
  category: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: '12rem',
  },
  categoryButton: {
    backgroundColor: Colors.grey1,
    paddingHorizontal: '12rem',
    paddingVertical: '6rem',
    borderRadius: '19rem',
  },
});
