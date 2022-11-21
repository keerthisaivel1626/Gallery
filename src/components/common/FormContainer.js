import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {height, width} from '../../utils/data';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const FormContainer = ({children}) => {
  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <KeyboardAwareScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}>
          {children}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    width: width,
    height: hp('65%'),
    backgroundColor: '#90ee90',
    borderTopEndRadius: height * 0.08,
    paddingTop: 5,
  },
  childContainer: {
    width: width,
    height: hp('64%'),
    backgroundColor: '#e6ffe6',
    borderTopEndRadius: height * 0.08,
    paddingHorizontal: 14,
  },
});
export default FormContainer;
