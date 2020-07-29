import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const styles = StyleSheet.create({
  orderItem: {
    height: 'auto',
    minHeight: 'auto',
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  total: {
    fontFamily: 'openSansBold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'openSans',
    fontSize: 16,
    color: '#888',
  },
  detail: {},
  detailItems: {
    width: '100%',
  },
});

const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.total}>$ {amount}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        style={styles.detail}
        title={showDetails ? 'Hide Details' : 'Show Detail'}
        color={Colors.primary}
        onPress={() => setShowDetails((prev) => !prev)}
      />

      {showDetails && (
        <View style={styles.detailItems}>
          {items.map(({ id, quantity, productTitle, sum }) => (
            <CartItem
              key={id}
              quantity={quantity}
              productTitle={productTitle}
              sum={sum}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

export default OrderItem;
