import React from 'react';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';

import {store} from './redux/store';
import RootStack from './navigation/RootStack';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
       
          <RootStack />
      
      </NavigationContainer>
    </Provider>
  );
};

export default App;
