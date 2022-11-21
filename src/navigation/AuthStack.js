import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
const AuthStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
