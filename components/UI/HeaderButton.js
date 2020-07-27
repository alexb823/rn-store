import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../constants/Colors';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Color.primary}
    />
  );
};

export default CustomHeaderButton;
