import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Text, Platform, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cartActions';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

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

  return <FlatList data={products} renderItem={handleRenderItem} />;
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
