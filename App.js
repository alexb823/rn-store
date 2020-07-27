import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';

import store from './store';
import ShopNavigator from './navigation/ShopNavigator';

import usePrepareResources from './hooks/usePrepareResources.js';

enableScreens();

export default function App() {
  const prepareFonts = () => {
    return Font.loadAsync({
      openSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
      openSans: require('./assets/fonts/OpenSans-Regular.ttf'),
    });
  };

  const [appReady] = usePrepareResources(prepareFonts());

  if (!appReady) return null;

  return (
    <Provider store={store}>
      <ShopNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}
