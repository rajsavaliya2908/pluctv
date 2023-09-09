import React,{useState} from 'react';
import {View, FlatList,RefreshControl,TouchableOpacity,Text} from 'react-native';
import styles from './styles';
import {Label, SafeArea, SearchHeader} from "src/components";
import {Colors} from "src/utils/Colors";
import {Strings} from "src/utils/theme";
import {notificationType,notificationsList} from "src/utils/ExternalData";
import {AppIcon} from "src/assets/svgs";
import Routes from "src/router/Routes";

const Notifications = ({navigation}) => {

    const [isRefresh, setIsRefresh] = useState(false)

    const onRefresh = () => {
        setIsRefresh(!isRefresh)
        setTimeout(() => {
            setIsRefresh(false)
        },2000)
    }

    const onNotificationPress = (item) => {
        navigation.navigate(Routes.NotificationDetails,{
                data:item
        })
    }



    const renderNotificationItem = ({item, index}) => {
        return (
            <TouchableOpacity style={styles.notificationItem} onPress={() => onNotificationPress(item)}>
                <AppIcon width={32} height={32} style={{
                    marginRight: 10
                }}/>
                <View style={styles.viewFlex}>
                    <Text style={styles.notificationTitle}>
                        {`${item.title}`}
                    </Text>
                   {/* <Label style={styles.notificationTime}>
                        {item.time}
                    </Label>*/}
                </View>
                <View style={styles.readDot}/>
            </TouchableOpacity>);
    };

    return (
        <SafeArea statusBarColor={Colors.primary} style={styles.container}>
            <SearchHeader title={Strings.notification}/>
            <View style={styles.container}>
                <FlatList
                    data={notificationsList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderNotificationItem}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefresh}
                            onRefresh={onRefresh}
                            tintColor={Colors.white}
                        />
                    }
                />
            </View>
        </SafeArea>
    );
};

export default Notifications;
