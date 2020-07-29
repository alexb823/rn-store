import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  cardItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'openSansBold',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'openSansBold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

const CartItem = ({ quantity, productTitle, sum, onRemove, deletable }) => {
  return (
    <View style={styles.cardItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText} numberOfLines={1}>
          {productTitle}
        </Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{sum.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;
