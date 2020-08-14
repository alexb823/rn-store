import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { authenticate, setDidTryAl } from '../store/actions/authActions';

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        dispatch(setDidTryAl());
        return;
      }

      const { token, userId, expirationDate } = JSON.parse(userData);
      const expDate = new Date(expirationDate);
      if (expDate <= new Date() || !token || !userId) {
        dispatch(setDidTryAl())
        return;
      }

      const expInMilSec = expDate.getTime() - Date.now();
      dispatch(authenticate(token, userId, expInMilSec));
    };
    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartupScreen;
