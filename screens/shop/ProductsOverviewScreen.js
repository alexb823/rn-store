import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FlatList,
  Text,
  Platform,
  Button,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cartActions';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import { fetchProducts } from '../../store/actions/productsActions';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ProductsOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = () => {
    setError(false);
    setRefreshing(true);
    dispatch(fetchProducts())
      .then(() => {
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    loadProducts();
  }, []);

  useEffect(() => {
    const willFocusListener = navigation.addListener('willFocus', loadProducts);
    return () => {
      willFocusListener.remove();
    };
  }, []);

  const handleRenderItem = ({ item }) => {
    const handleOnSelect = () =>
      navigation.navigate('ProductDetail', {
        productId: item.id,
        productTitle: item.title,
      });

    const handleOnAddToCart = () => dispatch(addToCart(item));

    return (
      <ProductItem {...item} onSelect={handleOnSelect}>
        <Button
          title="View Details"
          color={Colors.primary}
          onPress={handleOnSelect}
        />
        <Button
          title="To Cart"
          color={Colors.primary}
          onPress={handleOnAddToCart}
        />
      </ProductItem>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start creating some.</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button title="Reload" onPress={loadProducts} />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={refreshing}
      data={products}
      renderItem={handleRenderItem}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
  const headerRight = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    );
  };

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

  return {
    headerTitle: 'All Products',
    headerRight,
    headerLeft,
  };
};

export default ProductsOverviewScreen;
