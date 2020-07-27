import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Text, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cartActions';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const handleRenderItem = ({ item }) => {
    const handleOnViewDetail = () =>
      navigation.navigate('ProductDetail', {
        productId: item.id,
        productTitle: item.title,
      });
    const handleOnAddToCart = () => dispatch(addToCart(item));

    return (
      <ProductItem
        {...item}
        onViewDetail={handleOnViewDetail}
        onAddToCart={handleOnAddToCart}
      />
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

  return {
    headerTitle: 'All Products',
    headerRight,
  };
};

export default ProductsOverviewScreen;
