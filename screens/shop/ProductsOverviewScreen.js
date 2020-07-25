import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Text } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cartActions';

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

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductsOverviewScreen;
