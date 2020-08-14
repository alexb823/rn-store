import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  Image,
  Button,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import Colors from '../../constants/Colors';
import { addToCart } from '../../store/actions/cartActions';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    minHeight: 300,
  },
  actions: {
    alignItems: 'center',
    marginVertical: 10,
  },
  price: {
    fontFamily: 'openSansBold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontFamily: 'openSans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

const ProductDetailScreen = ({ route }) => {
  const imgHeight = useWindowDimensions().height / 1.9;
  const { productId } = route.params;
  const product = useSelector(({ products }) =>
    products.availableProducts.find((item) => item.id === productId)
  );
  const dispatch = useDispatch();

  const handleAddToCart = () => dispatch(addToCart(product));

  return (
    <ScrollView>
      <Image
        style={{ ...styles.image, height: imgHeight }}
        source={{ uri: product.imageUrl }}
      />
      <View style={styles.actions}>
        <Button
          title="Add to Cart"
          color={Colors.primary}
          onPress={handleAddToCart}
        />
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description} </Text>
    </ScrollView>
  );
};

export const screenOptions = ({ route }) => {
  const headerTitle = route.params?.productTitle;

  return { headerTitle };
};

export default ProductDetailScreen;
