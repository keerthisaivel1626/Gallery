import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Button from '../../components/common/Button';
import FormContainer from '../../components/common/FormContainer';
import FormInput from '../../components/common/FormInput';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  manageUserDetails,
  changeAuthStatus,
} from '../../redux/reducer/GalleryReducer';
import {
  REGULAR_VERTICAL_SPACE,
  SMALL_VERTICAL_SPACE,
  SMALL,
  width,
  height,
  REGULAR,
  VERY_SMALL,
  MEDIUM_VERTICAL_SPACE,
  VERY_SMALL_VERTICAL_SPACE,
  BIT_SMALL_VERTICAL_SPACE,
} from '../../utils/data';
import * as yup from 'yup';
import {Formik} from 'formik';
const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [ShowPassword, setShowPassword] = useState(false);
  let schema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid Email')
      .required('Email Address is Required.'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      )
      .required('Password is required.'),
  });
  const back = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F7F7FF'}}>
      <View style={{alignItems: 'center'}}>
        <LottieView
          style={{height: 300, width: 300}}
          source={require('../../assets/animation/image1.json')}
          autoPlay
          speed={1}
          loop={false}
        />
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={schema}
          onSubmit={async values => {
            await AsyncStorage.setItem('login', 'true');
            await dispatch(changeAuthStatus(true));
            navigation.navigate('DrawerStack');
          }}>
          {({errors, handleSubmit, handleChange, values}) => {
            return (
              <FormContainer>
                <View style={{height: VERY_SMALL_VERTICAL_SPACE}} />
                <Text style={styles.title}>Hi,</Text>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.Info}>
                  Please enter your Email ID to get access
                </Text>
                <View style={{height: VERY_SMALL_VERTICAL_SPACE}} />
                <FormInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  type={'email'}
                />
                <View style={{height: REGULAR_VERTICAL_SPACE}} />
                <FormInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  type={'password'}
                  ShowPassword={ShowPassword}
                  setShowPassword={setShowPassword}
                />
                {errors.email || errors.password ? (
                  <View style={{alignItems:'center'}}>
                    <View style={{height: VERY_SMALL_VERTICAL_SPACE}} />
                    <Text style={styles.errorText}>
                      {errors?.email ? errors.email : errors.password}
                    </Text>
                  </View>
                ) : (
                  <View style={{height: VERY_SMALL_VERTICAL_SPACE}} />
                )}
                <Button
                  title={'LOGIN'}
                  customStyle={{
                    height: 65,
                    backgroundColor: '#00FF00',
                    borderRadius: 50,
                  }}
                  shadowStatus={true}
                  titleStyle={{
                    color: 'white',
                    fontSize: SMALL,
                    fontWeight: 'bold',
                  }}
                  onPress={handleSubmit}
                />
                <View style={{height: BIT_SMALL_VERTICAL_SPACE}} />
                <Button
                  title={'SIGNUP'}
                  customStyle={{
                    height: 65,
                    borderWidth: 2,
                    borderColor: '#00FF00',
                    borderRadius: 50,
                  }}
                  shadowStatus={true}
                  titleStyle={{
                    color: '#00FF00',
                    fontSize: SMALL,
                    fontWeight: 'bold',
                  }}
                  onPress={back}
                />
                {(errors.email || errors.password) && (
                  <View style={{height: MEDIUM_VERTICAL_SPACE}} />
                )}
              </FormContainer>
            );
          }}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
  },
  logoImage: {
    alignSelf: 'center',
    width: width * 0.4,
    resizeMode: 'contain',
  },
  formContainer: {
    width: width,
    height: height * 0.5,
  },
  title: {
    fontSize: REGULAR,

    color: 'black',
  },
  Info: {
    fontSize: SMALL,
    color: 'gray',
  },
  textBoxlabel: {
    fontSize: VERY_SMALL,
    color: 'black',
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    textAlign:'center'
  },
});
export default LoginScreen;
