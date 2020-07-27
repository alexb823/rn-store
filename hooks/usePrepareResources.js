import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

//takes async function calls that load resources
const usePrepareResources = (...promises) => {
  const [appReady, setAppReady] = useState(false);

  //once all the loading resource promises are resolved, hides splash screen
  const prepareResources = () => {
    Promise.all(promises)
      .then(() => {
        setAppReady(true);
        SplashScreen.hideAsync();
      })
      .catch((error) => console.log(error));
  };

  //pauses splash screen and calls prepareResources
  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.log(error);
      }
      prepareResources();
    })();
  }, []);

  return [appReady];
};

export default usePrepareResources;
