import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cartActions';
import { addOrder } from '../../store/actions/ordersActions';
import Card from '../../components/UI/Card';

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 20,
    height: 'auto',
    minHeight: 'auto',
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
    return arr.sort((a, b) => (a.productTitle > b.productTitle ? 1 : -1));
  });
  const dispatch = useDispatch();

  const handleRenderItems = ({ item }) => {
    const handleOnRemove = () => dispatch(removeFromCart(item.id));
    return <CartItem {...item} onRemove={handleOnRemove} deletable />;
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.secondary}
          disabled={cartItems.length === 0}
          onPress={() => dispatch(addOrder(cartItems, totalAmount))}
        />
      </Card>
      <FlatList data={cartItems} renderItem={handleRenderItems} />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};

export default CartScreen;
