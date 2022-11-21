import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {REGULAR, width} from '../../utils/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  manageSelectedGalleryImage,
  manageStyle,
} from '../../redux/reducer/GalleryReducer';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
const HomeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {profileImage, selectedImage} = useSelector(
    state => state.galleryReducer,
  );

  const FlatItem = route?.params;
  const [isEmpty, setEmpty] = React.useState(false);
  const [selectedImages, setSelectedImage] = React.useState();
  const [userData, setUserData] = React.useState({
    profileImage: '',
  });

  React.useEffect(() => {
    fetchData();
   
    fetchImage();
    dispatch(manageStyle(1));
  }, [profileImage || selectedImage]);

  const fetchImage = async () => {
    
    const selectedImagedata = JSON.parse(
      await AsyncStorage.getItem('SelectedImage'),
    );   
  
    if (selectedImagedata) {
  
      var filtered = selectedImagedata.filter(function (el) {
        return el != null;
      });
    
      setSelectedImage(filtered);   
    }
    
  };

  const fetchData = async () => {
    const profileImageData = await AsyncStorage.getItem('imageData');
    if (profileImageData) {
      setUserData({
        ...userData,
        ['profileImage']: profileImageData,
      });
    }
  };

  const DeleteImage = async value => {
    const data = selectedImages.filter(
      item => item?.thumbnailUrl !== value?.thumbnailUrl,
    );

    if (data.length > 0) {
      await AsyncStorage.setItem('SelectedImage', JSON.stringify(data));
      dispatch(manageSelectedGalleryImage(data));
      setSelectedImage(data);
    } else if (!data.length) {
      let nodata = '';
      await AsyncStorage.removeItem('SelectedImage');
      setSelectedImage();
      setEmpty(true);
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <View>
        <Image
          width={(width - 24) / 3}
          source={{
            uri: item?.thumbnailUrl,
          }}
          style={styles.media}
        />
        <TouchableOpacity
          onPress={() => DeleteImage(item)}
          activeOpacity={0.9}
          style={styles.buttonDelete}>
          <Text style={styles.titleDelete}>x</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', flex: 0.25}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile', {flag: 'home'});
          }}>
          <Image
            source={
              userData.profileImage.length != 0
                ? {uri: userData.profileImage}
                : require('../../assets/images/man.png')
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <Text>Profile</Text>
      </View>
      <View style={{backgroundColor: '#eee', flex: 0.7}}>
        {selectedImages?.length && !isEmpty ? (
          <FlatList
            style={[
              styles.container,
              {
                paddingTop: 6,
              },
            ]}
            data={selectedImages}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            numColumns={3}
          />
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: REGULAR,
                  color: 'red',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {'Empty!):'}
              </Text>
              <LottieView
                style={{height: 300, width: 300}}
                source={require('../../assets/animation/empty.json')}
                autoPlay
                speed={1}
                loop={false}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    margin: 10,
    width: width * 0.24,
    height: width * 0.24,
    borderRadius: 50,

    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    flex: 1,
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 24,
  },
  media: {
    marginLeft: 6,
    width: (width - 24) / 3,
    height: (width - 24) / 3,
    marginBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  bottom: {
    padding: 24,
  },
  openText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    paddingVertical: 12,
  },
  openPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  buttonDelete: {
    width: '15%',
    height: '15%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ffffff92',
  },
  titleDelete: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'red',
  },
});
export default HomeScreen;
