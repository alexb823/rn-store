import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    minHeight: 300,
  },
});

const Card = (props) => {
  const windowHeight = useWindowDimensions().height;

  return (
    <View
      style={{ ...styles.card, height: windowHeight / 1.9, ...props.style }}
    >
      {props.children}
    </View>
  );
};

export default Card;
