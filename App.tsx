import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';

import MainNavigator from './src/navigation/MainNavigator';
import store from './src/state/store';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
