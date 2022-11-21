import React from 'react';
import {StyleSheet, Text, Pressable, ActivityIndicator} from 'react-native';

 const Button = ({
  customStyle,

  title,
  titleStyle,
  onPress,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        {...customStyle, justifyContent: 'center', alignItems: 'center'},
      ]}>
      {!isLoading && <Text style={{...titleStyle}}>{title}</Text>}
      {isLoading && <ActivityIndicator size={'small'} color="white" />}
    </Pressable>
  );
};


export default Button;
