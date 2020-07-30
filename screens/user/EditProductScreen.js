import React, { useEffect, useReducer, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import {
  createProduct,
  updateProduct,
} from '../../store/actions/productsActions';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

const EditProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  const productId = navigation.getParam('productId');
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: !!editedProduct,
      imageUrl: !!editedProduct,
      description: !!editedProduct,
      price: !!editedProduct,
    },
    formIsValid: !!editedProduct,
  });


  useEffect(() => {
    if (error) {
      setError('');
      return Alert.alert('An error ocurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  useEffect(() => {
    navigation.setParams({ handleSubmit });
  }, [productId, formState]);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!formState.formIsValid) {
      return Alert.alert('Wrong!', 'Please check the errors in the form', [
        { text: 'Okay' },
      ]);
    }
    try {
      if (editedProduct) {
        await dispatch(
          updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description
          )
        );
      } else {
        await dispatch(
          createProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
            +formState.inputValues.price
          )
        );
      }
      navigation.navigate('UserProducts');
    } catch (error) {
      console.log('in the catch block', error);
      setError(error.message);
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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            label="Title"
            errorText="Enter valid title"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            inputName="title"
            onInputChange={handleOnInputChange}
            initialValue={formState.inputValues.title}
            initialValid={!!editedProduct}
            required
          />

          <Input
            label="Image URL"
            errorText="Enter valid url"
            keyboardType="default"
            returnKeyType="next"
            inputName="imageUrl"
            onInputChange={handleOnInputChange}
            initialValue={formState.inputValues.imageUrl}
            initialValid={!!editedProduct}
            required
          />

          {!productId && (
            <Input
              label="Price"
              errorText="Enter valid price"
              keyboardType="decimal-pad"
              returnKeyType="next"
              inputName="price"
              onInputChange={handleOnInputChange}
              required
              min={0.01}
            />
          )}

          <Input
            label="Description"
            errorText="Enter valid description"
            keyboardType="default"
            autoCorrect
            autoCapitalize="sentences"
            returnKeyType="next"
            multiline
            numberOfLines={3}
            inputName="description"
            onInputChange={handleOnInputChange}
            initialValue={formState.inputValues.description}
            initialValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const productId = navigation.getParam('productId');
  const handleSubmit = navigation.getParam('handleSubmit');
  const headerRight = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={handleSubmit}
        />
      </HeaderButtons>
    );
  };
  return {
    headerTitle: productId ? 'Edit Product' : 'Add Product',
    headerRight,
  };
};

export default EditProductScreen;
