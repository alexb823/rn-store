import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
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
  const items = useSelector(({ cart: { items } }) => {
    const arr = [];
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        arr.push({ id: key, ...items[key] });
      }
    }
    return arr.sort((a, b) => (a.productTitle > b.productTitle ? 1 : -1));
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleRenderItems = ({ item }) => {
    const handleOnRemove = () => dispatch(removeFromCart(item.id));
    return <CartItem {...item} onRemove={handleOnRemove} deletable />;
  };

  const handleAddOrder = () => {
    setIsLoading(true);
    dispatch(addOrder(items, totalAmount)).then(() => {
      setIsLoading(false);
    });
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
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            title="Order Now"
            color={Colors.secondary}
            disabled={items.length === 0}
            onPress={handleAddOrder}
          />
        )}
      </Card>
      <FlatList data={items} renderItem={handleRenderItems} />
    </View>
  );
};

export const screenOptions = { headerTitle: 'Your Cart' };

export default CartScreen;
