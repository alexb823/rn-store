import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../store/actions/authActions';

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        navigation.navigate('Auth');
        return;
      }

      const { token, userId, expirationDate } = JSON.parse(userData);
      const expDate = new Date(expirationDate);
      if (expDate <= new Date() || !token || !userId) {
        navigation.navigate('Auth');
        return;
      }

      const expInMilSec = expDate.getTime() - Date.now();
      dispatch(authenticate(token, userId, expInMilSec));
      navigation.navigate('Shop');
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
