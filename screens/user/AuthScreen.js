import React, { useReducer, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { signup, login } from '../../store/actions/authActions';

const styles = StyleSheet.create({
  gradient: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authCnt: {
    width: '80%',
    height: 'auto',
    minHeight: 'auto',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  btnCnt: {
    marginTop: 10,
  },
});

const INPUT_UPDATE = 'INPUT_UPDATE';

const formReducer = (state, action) => {
  switch (action.type) {
    case INPUT_UPDATE:
      return inputUpdateHelper(state, action);
    default:
      return state;
  }
};

//form reducer helper funcs
const inputUpdateHelper = (state, action) => {
  const { inputValues, inputValidities } = state;
  const { text, isValid, inputName } = action;
  const updatedInputs = { ...inputValues, [inputName]: text };
  const updatedValidities = { ...inputValidities, [inputName]: isValid };
  let formIsValid = true;
  for (const key in updatedValidities) {
    if (updatedValidities.hasOwnProperty(key)) {
      if (!updatedValidities[key]) formIsValid = false;
    }
  }
  return {
    inputValues: updatedInputs,
    inputValidities: updatedValidities,
    formIsValid,
  };
};

//Component
const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError('');
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (error) {
      setError(error.meesage);
    }
    setIsLoading(false);
  };

  const handleOnInputChange = (inputName, value, isValid) => {
    dispatchFormState({
      type: INPUT_UPDATE,
      inputName,
      text: value,
      isValid,
    });
  };

  return (
    <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={50}
      >
        <Card style={styles.authCnt}>
          <ScrollView>
            <Input
              inputName="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              initialValue=""
              onInputChange={handleOnInputChange}
            />
            <Input
              inputName="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid email password"
              initialValue=""
              onInputChange={handleOnInputChange}
            />
            <View style={styles.btnCnt}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? 'Sing Up' : 'Log In'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.btnCnt}>
              <Button
                title={`Go to ${isSignup ? 'Log In' : 'Sing Up'}`}
                color={Colors.secondary}
                onPress={() => setIsSignup((prev) => !prev)}
              />
            </View>
          </ScrollView>
        </Card>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Log In',
};

export default AuthScreen;
