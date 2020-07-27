import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cartActions';

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'openSansBold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

const CartScreen = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector(({ cart: { items } }) => {
    const arr = [];
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        arr.push({ id: key, ...items[key] });
      }
    }
    return arr.sort((a, b) => a.productTitle > b.productTitle ? 1 : -1);
  });
  const dispatch = useDispatch();

  const handleRenderItems = ({ item }) => {
    const handleOnRemove = () => dispatch(removeFromCart(item.id));
    return <CartItem {...item} onRemove={handleOnRemove} />;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.secondary}
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList data={cartItems} renderItem={handleRenderItems} />
    </View>
  );
};

export default CartScreen;
