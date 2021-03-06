import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  Platform,
  Button,
  Alert,
  View,
  Text,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/productsActions';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const handleRenderItem = ({ item }) => {
    const handleDelete = () => {
      Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => dispatch(deleteProduct(item.id)),
        },
      ]);
    };
    const handleEditProduct = () =>
      navigation.navigate('EditProduct', { productId: item.id });

    return (
      <ProductItem
        imageUrl={item.imageUrl}
        title={item.title}
        price={item.price}
        onSelect={() => {}}
      >
        <Button
          title="Edit"
          color={Colors.primary}
          onPress={handleEditProduct}
        />
        <Button title="Delete" color={Colors.primary} onPress={handleDelete} />
      </ProductItem>
    );
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start creating some.</Text>
      </View>
    );
  }

  return <FlatList data={userProducts} renderItem={handleRenderItem} />;
};

//Navigation
UserProductsScreen.navigationOptions = ({ navigation }) => {
  const headerLeft = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    );
  };
  const headerRight = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => navigation.navigate('EditProduct')}
        />
      </HeaderButtons>
    );
  };
  return {
    headerTitle: 'Your Products',
    headerLeft,
    headerRight,
  };
};

export default UserProductsScreen;
