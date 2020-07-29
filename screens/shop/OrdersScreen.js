import React from 'react';
import { FlatList, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);

  const handleRenderItem = ({ item }) => {
    return (
      <OrderItem
        amount={item.totalAmount}
        date={item.readableDate}
        items={item.items}
      >
        {item.totalAmount}
      </OrderItem>
    );
  };

  return <FlatList data={orders} renderItem={handleRenderItem} />;
};

OrdersScreen.navigationOptions = ({ navigation }) => {
  const headerLeft = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    );
  };

  return {
    headerTitle: 'Your Orders',
    headerLeft,
  };
};

export default OrdersScreen;
