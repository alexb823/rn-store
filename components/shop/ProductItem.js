import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Card from '../UI/Card';

const styles = StyleSheet.create({
  card: {
    margin: 20,
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
    height: '17%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'openSansBold',
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'openSans',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
});

const ProductItem = ({ imageUrl, title, price, onSelect, children }) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.card}>
      <View style={styles.TouchableContainer}>
        <TouchableCmp onPress={onSelect} useForeground>
          <View>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>{children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

export default ProductItem;
