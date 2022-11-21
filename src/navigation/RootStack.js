import {View} from 'react-native';
import React,{useLayoutEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  storeLoginDetails,
  changeAuthStatus,
} from '../redux/reducer/GalleryReducer';
import {useDispatch, useSelector} from 'react-redux';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
const RootStack = () => {
  
  const dispatch = useDispatch();

  const {isLogin} = useSelector(state => state.galleryReducer);

 useLayoutEffect(() => {  
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    let login = JSON.parse(await AsyncStorage.getItem('login'));

    if (login) {
      dispatch(changeAuthStatus(true));
      dispatch(storeLoginDetails(login));
    }
  };

  return (
   
      <View style={{flex: 1}}>{isLogin ? <HomeStack /> : <AuthStack />}</View>
    
  );
};

export default RootStack;
