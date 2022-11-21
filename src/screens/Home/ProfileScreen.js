import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeAuthStatus,
  manageProfileImage,
} from '../../redux/reducer/GalleryReducer';
import {

  SMALL,
  REGULAR_HORIZONTAL__SPACE,
  BIG_HORIZONTAL__SPACE,
 
} from '../../utils/data';
import Button from '../../components/common/Button';
const ProfileScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {profileImage} = useSelector(state => state.galleryReducer);

  const [browseType, setBrowseType] = React.useState('');
  const [userData, setUserData] = React.useState({
    profileImage: '',
  });
  React.useEffect(() => {
    if (browseType) openCameraOrGallery();
  }, [browseType]);

  React.useEffect(() => {
    fetchImageProfile();
    if (route?.params?.flag === 'home') {
      alertAction();
    }
  }, [route?.params?.flag]);

  const fetchImageProfile = async () => {
    const profileImageData = await AsyncStorage.getItem('imageData');
    if (profileImageData) {
      setUserData({
        ...userData,
        ['profileImage']: profileImageData,
      });
    }
  };

  const alertAction = () => {
    Alert.alert('Select Image', 'Browse/Capture Profile Image', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Camera',
        onPress: async () => {
          let status = await checkCameraStatus();

          if (status) {
            setBrowseType('camera');
          } else {
            console.log('no status');
          }
        },
        style: 'default',
      },
      {
        text: 'Gallery',
        onPress: async () => {
          let status = await checkCameraStatus();

          if (status) {
            setBrowseType('gallery');
          }
        },
        style: 'default',
      },
    ]);
  };
  const selectImage = async () => {
    alertAction();
  };
  const checkCameraStatus = async () => {
    let cameraStatus = await check(PERMISSIONS.ANDROID.CAMERA);

    if (cameraStatus == 'unavailable') {
      ToastAndroid.show('Camera is unavailable.', ToastAndroid.SHORT);
    } else if (cameraStatus == 'denied') {
      let status = await request(PERMISSIONS.ANDROID.CAMERA);
      if (status == 'granted') {
        return true;
      } else if (status == 'blocked') {
        openSettings().catch(() => {
          ToastAndroid.show("Can't open settings.", ToastAndroid.SHORT);
          return false;
        });
      } else {
        return false;
      }
    } else if (cameraStatus == 'blocked') {
      openSettings().catch(() => {
        ToastAndroid.show("Can't open settings.", ToastAndroid.SHORT);
        return false;
      });
    } else if (cameraStatus == 'granted') {
      return true;
    }
  };
  const updateProfile = async userObj => {
    Keyboard.dismiss();
    ToastAndroid.show('Profile has been Updated.', ToastAndroid.SHORT);
    const profileImageData = await AsyncStorage.getItem('imageData');

    setUserData({
      ...userData,
      ['profileImage']: profileImageData,
    });
    //route?.params?.setIconProfile(userData)
  };
  const uploadFile = async imageData => {
    setUserData({
      ...userData,
      ['profileImage']: imageData.uri,
    });

    await AsyncStorage.setItem('imageData', imageData.uri);

    dispatch(manageProfileImage(imageData.uri));
    updateProfile({
      Image: imageData,
    });
  };
  const openCameraOrGallery = async () => {
    let result;
    if (browseType == 'camera') {
      setBrowseType('');
      result = await launchCamera({
        mediaType: 'photo',
        quality: 1,
      });
    } else {
      setBrowseType('');
      result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
    }

    if (!result.didCancel) {
      uploadFile({
        uri: result.assets[0].uri,
        name: result.assets[0].fileName,
        type: result.assets[0].type,
      });
    }
  };
  const removeImage = async () => {
    await AsyncStorage.setItem('imageData', '');
    setUserData({
      ['profileImage']: '',
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.ProfileCard}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={{paddingHorizontal: 8}}
            onPress={() => {
              AsyncStorage.clear();
              dispatch(changeAuthStatus(false));
              navigation.navigate('AuthStack');
            }}>
            <MaterialCommunityIcons name="logout" size={40} color={'#00FF00'} />
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={
              userData.profileImage.length != 0
                ? {uri: userData.profileImage}
                : require('../../assets/images/man.png')
            }
            style={{width: 200, height: 200, borderRadius: 200 / 2}}
          />
          <View style={{height: REGULAR_HORIZONTAL__SPACE}} />
          <Button
            title={'Upload'}
            customStyle={{
              height: 45,
              backgroundColor: '#00FF00',
              borderRadius: 10,
              width: BIG_HORIZONTAL__SPACE,
            }}
            shadowStatus={true}
            titleStyle={{
              color: 'white',
              fontSize: SMALL,
              fontWeight: 'bold',
            }}
            onPress={selectImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProfileCard: {
    flex: 0.8,
    margin: 20,

    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#00FF00',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },

  dottedBox: {
    borderRadius: 200 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  imageStyle: {
    width: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProfileScreen;
