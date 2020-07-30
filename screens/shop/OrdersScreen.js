import React, {useEffect, useState} from 'react';
import { FlatList, Text, Platform, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import moment from 'moment';


import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import { fetchOrders } from '../../store/actions/ordersActions';
import Colors from '../../constants/Colors';


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})


const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=> {
    setIsLoading(true)
    dispatch(fetchOrders()).then(()=> setIsLoading(false))
  }, [])



  const handleRenderItem = ({ item }) => {
    return (
      <OrderItem
        amount={item.totalAmount}
        date={moment(item.date).format('MMMM Do YYYY, hh:mm a')}
        items={item.items}
      >
        {item.totalAmount}
      </OrderItem>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No orders found.</Text>
      </View>
    );
  }

  return <FlatList data={orders} renderItem={handleRenderItem} />;
};


//Navigatio
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
