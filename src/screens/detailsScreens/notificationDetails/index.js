import React, {Component} from 'react';
import {View, ScrollView,Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeArea, Header} from 'src/components';
import {Colors} from 'src/utils/theme';
import styles from './styles';
import {notificationType} from "src/utils/ExternalData";
import Routes from "src/router/Routes";


class NotificationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: props.route.params ? props.route.params.data : null,
        };
    }

    onPressBack = () => {
        this.props.navigation.goBack();
    };

    onButtonPress = (type) => {
        if (type === notificationType.UploadVideo) {
            this.props.navigation.navigate(Routes.Story);
        } else if (type === notificationType.Explore) {
            this.props.navigation.navigate(Routes.ForYou);
        } else if (type === notificationType.StartWatching) {
            this.props.navigation.navigate(Routes.ForYou);
        } else if (type === notificationType.Courses) {
            this.props.navigation.navigate(Routes.CreatorHub);
        }
    }


    render() {
        const {details} = this.state;

        return (
            <SafeArea statusBarColor={Colors.primary} bottomBarColor={Colors.primary}>
                <Header onPressBack={this.onPressBack}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.topView}>
                        <Text font_bold style={styles.font18}>
                            {details?.title}
                        </Text>
                    </View>
                    <Text ms={20} mt={20} me={20} mb={20} style={styles.font12}>
                        {details?.subTitle}
                    </Text>
                    <TouchableOpacity style={styles.applyButton} onPress={() => this.onButtonPress(details.type)}>
                        <Text style={styles.buttonTitle}>{details?.buttonTitle}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeArea>
        );
    }
}

export default NotificationDetails;
