import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { enableScreens } from 'react-native-screens';

import store from './store';
import ShopNavigator from './navigation/ShopNavigator';

enableScreens();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  const prepareResources = async () => {
    await Font.loadAsync({
      openSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
      openSans: require('./assets/fonts/OpenSans-Regular.ttf'),
    });
    setAppReady(true);
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.log(e);
      }
      prepareResources();
    })()
  }, []);

  if (!appReady) return null;

  return (
    <Provider store={store}>
      <ShopNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}
