import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabStack from './TabStack';
import PostsScreen from '../screens/Home/PostsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
const Drawer = createDrawerNavigator();
import {useNavigation} from '@react-navigation/native';
const DrawerStack = () => {
  //   const navigation = useNavigation();
  //    const [userData, setUserData] = React.useState({
  //      profileImage: '',
  //    });
  // React.useEffect(() => {
  //   fetchData();
  // }, []);
  //   const fetchData = async () => {
  //     const profileImageData = await AsyncStorage.getItem('imageData');

  //     if (profileImageData) {
  //       console.log('yes profile');
  //       setUserData({
  //         ...userData,
  //         ['profileImage']: profileImageData,
  //       });
  //     }
  //   };
  return (
    <Drawer.Navigator
      initialRouteName={'DashBoard'}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#00FF00',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
      }}>
      <Drawer.Screen
        name="DashBoard"
        component={TabStack}
        options={{
          drawerIcon: () => (
            <Icon name="photo-library" size={22} color={'#00FF00'} />
          ),
          // headerRight: () => (
          //   <Pressable
          //     style={{marginRight: 15}}
          //     onPress={() =>
          //       navigation.navigate('Profile', {
          //         flag: 'home',

          //       })
          //     }>
          //     <Image
          //       source={require('../assets/images/man.png')}
          //       style={{width: 40, height: 35}}
          //     />
          //   </Pressable>
          // ),
        }}
      />
      <Drawer.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          drawerIcon: () => (
            <Icons name="post-outline" size={22} color={'#00FF00'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
