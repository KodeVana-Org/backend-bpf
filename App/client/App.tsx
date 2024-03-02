import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigator/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppContextProvider} from './src/navigator/AppContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContextProvider>
        <NavigationContainer>
          {/* <SystemBars animated={true} barStyle={'dark-content'} /> */}
          <RootNavigator />
        </NavigationContainer>
      </AppContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
