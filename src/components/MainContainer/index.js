import React from 'react';
import {View} from 'react-native';
import Loader from '../Loader';
import {SCREEN_WIDTH} from "src/utils/theme";

class MainContainer extends React.PureComponent {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    width: SCREEN_WIDTH,
                    zIndex: 9999,
                }}>
                <Loader />
            </View>
        );
    }
}

export default MainContainer;
