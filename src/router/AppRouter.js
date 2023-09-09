import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
    Splash,
    Home,
    SplashOnboarding,
    ForYou,
    CreatorHub,
    Story,
    Notifications,
    Profile,
    Register,
    RegisterEmail,
    RegisterVerification,
    Login,
    LoginEmail,
    LoginVerification,
    ShowsDetails,
    VideoDetails,
    VideoSubmit,
    CreatorDetails,
    GigsDetails,
    CategoryEpisodeDetails,
    NotificationDetails,
} from '../screens';
import {
    HomeTab,
    CreatorHubTab,
    NotificationTab,
    UserTab,
    PlusTab,
} from 'src/assets/svgs';
import Routes from './Routes';
import {Fonts, Colors, Images} from 'src/utils/theme';
import CustomTab from './CustomTab';
import RegisterFromMobile from "../screens/registerFromMobile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppRouter = props => {
    return AppStack(props);
};

const StoryStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({navigation}) => {
                return {
                    detachPreviousScreen: !navigation.isFocused(),
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false,
                };
            }}>
            <Stack.Screen name={Routes.Story} component={Story}/>
            <Stack.Screen name={Routes.VideoSubmit} component={VideoSubmit}/>
        </Stack.Navigator>
    );
};

const ForYouStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({navigation}) => {
                return {
                    detachPreviousScreen: !navigation.isFocused(),
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false,
                };
            }}>
            <Stack.Screen name={Routes.ForYou} component={ForYou}/>
            <Stack.Screen name={Routes.CreatorDetails} component={CreatorDetails}/>
        </Stack.Navigator>
    );
};

const CreatorHubStack = () => (
    <Stack.Navigator
        screenOptions={({navigation}) => {
            return {
                detachPreviousScreen: !navigation.isFocused(),
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
            };
        }}>
        <Stack.Screen name={Routes.CreatorHub} component={CreatorHub}/>
        <Stack.Screen name={Routes.GigsDetails} component={GigsDetails}/>
    </Stack.Navigator>
);

const TabNavigator = previousProps => {
    const iconSize = 22;
    return (
        <Tab.Navigator
            screenOptions={({route, navigation}) => ({
                headerShown: false,
                tabBarLabelStyle: {
                    fontFamily: Fonts.regular,
                    fontSize: 10,
                    marginTop: 7,
                },
                tabBarActiveTintColor: Colors.yellow1,
                tabBarInactiveTintColor: Colors.white,
            })}
            tabBar={props => <CustomTab {...props} />}>
            <Tab.Screen
                options={({route, navigation}) => {
                    return {
                        tabBarIcon: ({color, focused}) => (
                            <HomeTab width={iconSize} height={iconSize} color={color}/>
                        ),
                    };
                }}
                name={Routes.ForYou}
                component={ForYouStack}
            />
            <Tab.Screen
                options={({route, navigation}) => {
                    return {
                        tabBarIcon: ({color, focused}) => (
                            <CreatorHubTab width={iconSize} height={iconSize} color={color}/>
                        ),
                    };
                }}
                name={Routes.CreatorHub}
                component={CreatorHubStack}
            />
            <Tab.Screen
                options={({route, navigation}) => {
                    return {
                        tabBarLabel: '',
                        headerBackgroundContainerStyle: 'red',
                        tabBarIcon: ({color, focused}) => (
                            <PlusTab source={Images.add} style={[styles.tabCenterIcon]}/>
                        ),
                    };
                }}
                name={Routes.Story}
                component={StoryStack}
            />
            <Tab.Screen
                options={({route, navigation}) => {
                    return {
                        tabBarIcon: ({color, focused}) => (
                            <NotificationTab
                                width={iconSize + 4}
                                height={iconSize + 4}
                                color={color}
                            />
                        ),
                    };
                }}
                name={Routes.Notifications}
                component={Notifications}
            />
            <Tab.Screen
                options={({route, navigation}) => {
                    return {
                        tabBarIcon: ({color, focused}) => (
                            <UserTab
                                width={iconSize + 3}
                                height={iconSize + 3}
                                color={color}
                            />
                        ),
                    };
                }}
                name={Routes.Profile}
                component={Profile}
            />
        </Tab.Navigator>
    );
};

const AppStack = props => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={Routes.Splash}
                screenOptions={({navigation}) => {
                    return {
                        detachPreviousScreen: !navigation.isFocused(),
                        ...TransitionPresets.SlideFromRightIOS,
                        headerShown: false,
                    };
                }}>
                <Stack.Screen
                    name={Routes.Tabs}
                    component={routeProps => <TabNavigator {...props} {...routeProps} />}
                />
                <Stack.Screen name={Routes.ShowsDetails} component={ShowsDetails}/>
                <Stack.Screen name={Routes.VideoDetails} component={VideoDetails}/>
                <Stack.Screen name={Routes.Splash} component={Splash}/>
                <Stack.Screen
                    name={Routes.SplashOnboarding}
                    component={SplashOnboarding}
                />
                <Stack.Screen name={Routes.Register} component={Register}/>
                <Stack.Screen name={Routes.RegisterEmail} component={RegisterEmail}/>
                <Stack.Screen name={Routes.RegisterFromMobile} component={RegisterFromMobile}/>
                <Stack.Screen
                    name={Routes.RegisterVerification}
                    component={RegisterVerification}
                />
                <Stack.Screen name={Routes.Login} component={Login}/>
                <Stack.Screen name={Routes.LoginEmail} component={LoginEmail}/>
                <Stack.Screen
                    name={Routes.LoginVerification}
                    component={LoginVerification}
                />
                <Stack.Screen name={Routes.Home} component={Home}/>
                <Stack.Screen name={Routes.CreatorDetails} component={CreatorDetails}/>
                <Stack.Screen name={Routes.CategoryEpisodeDetails} component={CategoryEpisodeDetails}/>
                <Stack.Screen name={Routes.Story} component={Story}/>
                <Stack.Screen name={Routes.NotificationDetails} component={NotificationDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = EStyleSheet.create({
    tabCenterIcon: {
        width: '40rem',
        height: '40rem',
        marginTop: '12rem',
    },
});

export default AppRouter;
