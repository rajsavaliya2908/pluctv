import React from 'react';
import {Dimensions, LogBox, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Store, Persistor} from './src/redux/Store';
import AppRouter from './src/router/AppRouter';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainContainer from './src/components/MainContainer';

// Extended Style Sheet Configuration
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 360});
LogBox.ignoreAllLogs();

const App = props => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <View style={{flex: 1}}>
          <AppRouter props={props} />
          <MainContainer />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
