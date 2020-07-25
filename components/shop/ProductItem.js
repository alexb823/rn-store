import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  useWindowDimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    minHeight: 300,
  },
  TouchableContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  textContainer: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'openSansBold'
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'openSans'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
});

const ProductItem = ({ imageUrl, title, price, onViewDetail, onAddToCart }) => {
  const windowHeight = useWindowDimensions().height;
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...styles.product, height: windowHeight / 1.9 }}>
      <View style={styles.TouchableContainer}>
        <TouchableCmp onPress={onViewDetail} useForeground>
          <View>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="View Details"
                color={Colors.primary}
                onPress={onViewDetail}
              />
              <Button
                title="To Cart"
                color={Colors.primary}
                onPress={onAddToCart}
              />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

export default ProductItem;
