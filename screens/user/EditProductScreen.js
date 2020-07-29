import React, { useEffect, useReducer } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import {
  createProduct,
  updateProduct,
} from '../../store/actions/productsActions';
import Input from '../../components/UI/Input';

const styles = StyleSheet.create({
  form: {
    margin: 20,
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

  const {
    inputValues: { title, imageUrl, description, price },
  } = formState;

  useEffect(() => {
    navigation.setParams({ handleSubmit });
  }, [productId, formState]);

  const handleSubmit = () => {
    if (!formState.formIsValid) {
      return Alert.alert('Wrong!', 'Please check the errors in the form', [
        { text: 'Okay' },
      ]);
    }
    if (editedProduct) {
      dispatch(
        updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description,
          +formState.inputValues.price
        )
      );
    }
    navigation.navigate('UserProducts');
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={(Platform.OS === 'ios')? "padding" : null}
      keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
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
            initialValue={title}
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
            initialValue={imageUrl}
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
            initialValue={description}
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
