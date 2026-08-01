import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrdersScreen from './src/screens/OrdersScreen';
import OrderDetails from './src/screens/OrderDetails';
import ActiveDelivery from './src/screens/ActiveDelivery';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Orders"
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: { fontWeight: '700', color: '#111827' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Orders"
          component={OrdersScreen}
          options={{ title: 'Orders' }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{ title: 'Order Details' }}
        />
        <Stack.Screen
          name="ActiveDelivery"
          component={ActiveDelivery}
          options={{ title: 'Active Delivery', headerBackVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}