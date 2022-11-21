import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import PhotosScreen from '../screens/Home/PhotosScreen';
import ProfileScreen from '../screens/Home/ProfileScreen';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();
const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      barStyle={{paddingBottom: 48}}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Photos') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else {
            iconName = focused ? 'sticker-emoji' : 'sticker-emoji';
          }
          return <Icons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#00FF00',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Photos" component={PhotosScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabStack;
