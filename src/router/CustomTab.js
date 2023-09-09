import React, {useState} from "react";
import {Strings} from "../utils/Strings";
import Routes from "./Routes";
import {Text, TouchableOpacity, View} from "react-native";
import {HeaderTab} from "../components";
import EStyleSheet from "react-native-extended-stylesheet";
import {isIphoneX} from "react-native-iphone-x-helper";
import {Colors} from "src/utils/Colors";
import {SCREEN_WIDTH} from "src/utils/theme";

const CustomTab = ({state, descriptors, navigation}) => {
    const [isStoryEnable, setStoryEnable] = useState(false);
    const [category, setCategory] = useState([
        {title: Strings.stock},
        {title: Strings.story},
        {title: Strings.shorts},
    ]);
    const [activeCategory, setActiveCategory] = useState(0);

    const updateCategory = index => {
        setActiveCategory(index);
        navigation.navigate(Routes.Story);
        setStoryEnable(false);
    };

    return (
        <>
            <View style={styles.tabContainer}>
                {state.routes.map((route, index) => {
                    const {options} = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        console.log('route.name', route, options, state);
                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            if (route.name === 'Story') {
                                // StoryTab();
                                setStoryEnable(true);
                            } else {
                                setStoryEnable(false);
                                navigation.navigate({name: route.name, merge: true});
                            }
                        }
                    };

                    // const onLongPress = () => {
                    //   navigation.emit({
                    //     type: 'tabLongPress',
                    //     target: route.key,
                    //   });
                    // };

                    return (
                        <TouchableOpacity
                            key={index.toString()}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? {selected: true} : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            // onLongPress={onLongPress}
                            style={styles.tabButton}>
                            <options.tabBarIcon
                                color={
                                    isFocused
                                        ? options.tabBarActiveTintColor
                                        : options.tabBarInactiveTintColor
                                }
                            />
                            <Text
                                style={[
                                    options.tabBarLabelStyle,
                                    {
                                        color: isFocused
                                            ? options.tabBarActiveTintColor
                                            : options.tabBarInactiveTintColor,
                                    },
                                ]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            {isStoryEnable ? (
                <View style={styles.tabView}>
                    <HeaderTab
                        category={category}
                        activeCategory={activeCategory}
                        updateCategory={updateCategory}
                    />
                </View>
            ) : null}
        </>
    );
};

export default CustomTab;

const styles = EStyleSheet.create({
    tabIcon: {
        width: '24rem',
        height: '24rem',
    },
    tabCenterIcon: {
        width: '40rem',
        height: '40rem',
        marginTop: '12rem',
    },
    tabContainer: {
        flexDirection: 'row',
        height: isIphoneX() ? 90 : 65,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        paddingBottom: isIphoneX() ? 10 : 0,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexView: {flex: 1},
    tabView: {
        backgroundColor: Colors.primary,
        paddingBottom: '10rem',
        position: 'absolute',
        width: SCREEN_WIDTH,
        bottom: isIphoneX() ? 90 : 60,
    },
    bottomTab: {height: isIphoneX() ? 90 : 60},
});
