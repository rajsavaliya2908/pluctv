import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    ActivityIndicator,
    StatusBar,
    Platform,
    StyleSheet
} from 'react-native';
import {Colors, SCREEN_HEIGHT} from "src/utils/theme";

class Loader extends Component {
    render() {
        if (!this.props.loading) return null;
        return (
            <View style={[styles.vContainer, {backgroundColor: 'rgba(0,0,0,0.4)'}]}>
                <StatusBar backgroundColor={Colors.primary}/>
                <ActivityIndicator color={Colors.white} size="large"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    vContainer: {
        //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingTop: 0,
        backgroundColor: Colors.white,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        flex: 1,
    },
});

const mapStateToProps = (state) => ({
    loading: state.CommonReducer.loading,
});

export default connect(mapStateToProps)(Loader);


