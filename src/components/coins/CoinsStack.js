import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinDetailsScreen from '../coinDetails/CoinDetailsScreen';
import colors from '../../resources/colors';

const Stack = createStackNavigator();

export default function CoinsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowOpacity: 0,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="coins" component={CoinsScreen} />
      <Stack.Screen name="coinDetail" component={CoinDetailsScreen} />
    </Stack.Navigator>
  );
}
