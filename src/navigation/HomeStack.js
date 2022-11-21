import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import DrawerStack from './DrawerStack';
import TabStack from './TabStack';

const Stack = createStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName={'DrawerStack'}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'green',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Stack.Screen
        name="DrawerStack"
        component={DrawerStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DashBoard"
        component={TabStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
