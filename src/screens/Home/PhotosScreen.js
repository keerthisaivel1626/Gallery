import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {width} from '../../utils/data';
import {Photos, limit} from '../../utils/api/EndPoints';
import CardStyle from '../../components/home/photos/CardStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  manageSelectedGalleryImage,
  managePhotosImage,
  manageStyle,
} from '../../redux/reducer/GalleryReducer';
import {GETAPI} from '../../utils/api/Network';

const PhotosScreen = ({navigation}) => {
  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState([]);
  const [cleanData, setCleanData] = React.useState(0);
  const dispatch = useDispatch();
  const {photosImage, clearStyle} = useSelector(state => state.galleryReducer);
  React.useEffect(() => {
    fetchGalleryData();
  }, [photosImage]);

  const fetchGalleryData = async () => {
    const photosImageData = JSON.parse(await AsyncStorage.getItem('Photos'));
    if (photosImageData?.length === 0 || photosImageData === null) {
      try {
        let requestPhotosData = await GETAPI(Photos + limit);
        const {data} = requestPhotosData;
        if (data) {
          setImages(data);
          await AsyncStorage.setItem('Photos', JSON.stringify(data));
        }
      } catch (err) {
        console.log('err', err);
      }
    } else {
      dispatch(managePhotosImage(photosImageData));
      setImages(photosImageData);
    }
  };
  const sendAction = async () => {
    const previousImage = JSON.parse(
      await AsyncStorage.getItem('SelectedImage'),
    );

    const newData = selectedImage.concat(previousImage);
    const data = await AsyncStorage.setItem(
      'SelectedImage',
      JSON.stringify(newData),
    );
    navigation.navigate('Home', data);
    dispatch(manageSelectedGalleryImage(data));
    setSelectedImage('');
    dispatch(manageStyle(1));
  };

  const getSelected = item => selectedImage.includes(item);
  const handleImageData = value => {
    if (selectedImage.length <= 9) {
      setSelectedImage([...selectedImage, value]);
    } else {
      Alert.alert('Select Image', "Can't share more than 10 images", [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'HomePage',
          onPress: async () => {
            const previousImage = JSON.parse(
              await AsyncStorage.getItem('SelectedImage'),
            );
            const newData = selectedImage.concat(previousImage);
            console.log('newdata', newData?.length);
            const data = await AsyncStorage.setItem(
              'SelectedImage',
              JSON.stringify(newData),
            );
            navigation.navigate('Home', data);
            dispatch(manageSelectedGalleryImage(data));
            setSelectedImage('');
            dispatch(manageStyle(1));
            console.log('data', data?.length);
          },
          style: 'default',
        },
      ]);
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <View>
        <Image
          width={width * 0.4}
          source={{
            uri: item?.thumbnailUrl,
          }}
          style={style.image}
        />
        <CardStyle
          onPress={() => handleImageData(item)}
          selected={selectedImage ? getSelected(item) : null}
          flag={cleanData}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      {images.length !== 0 ? (
        <View style={{flex: 1, alignItems: 'center'}}>
          <FlatList
            style={[
              style.container,
              {
                paddingTop: 6,
              },
            ]}
            data={images}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            numColumns={3}
          />
          {selectedImage.length >= 1 && selectedImage.length <= 10 && (
            <TouchableOpacity
              style={{
                width: '35%',
                height: '10%',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 8,
                backgroundColor: '#ffffff92',
                flex: 1,
              }}
              onPress={sendAction}>
              <Text style={{fontWeight: 'bold', fontSize: 16, color: 'blue'}}>
                SEND
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 24,
  },
  image: {
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
});
export default PhotosScreen;
