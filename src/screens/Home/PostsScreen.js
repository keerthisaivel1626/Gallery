import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {managePostsImage} from '../../redux/reducer/GalleryReducer';
import {MEDIUM_SMALL_VERTICAL_SPACE, REGULAR, SMALL, width} from '../../utils/data';
import {GETAPI} from '../../utils/api/Network';
import {limit, Posts} from '../../utils/api/EndPoints';
import Icons from 'react-native-vector-icons/Ionicons';
const PostsScreen = () => {
  const {postsImage} = useSelector(state => state.galleryReducer);
  const [isDisable, setIsDisable] = useState(false);
  const [images, setImages] = useState(postsImage);
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchGalleryData();
  }, [postsImage]);

  const fetchGalleryData = async () => {
    const profileImageData = JSON.parse(
      await AsyncStorage.getItem('postGallery'),
    );

    if (profileImageData?.length === 0 || profileImageData === null) {
      try {
        let requestPostsData = await GETAPI(Posts + limit);
        const {data} = requestPostsData;
        if (data) {
          await AsyncStorage.setItem('postGallery', JSON.stringify(data));
          dispatch(managePostsImage(data));
          setImages(data);
        }
      } catch (err) {
        console.log('err', err);
      }
    } else {
      dispatch(managePostsImage(profileImageData));
      setImages(profileImageData);
    }
  };

  const DeleteImage = value => {
    setIsDisable(true);
    const data = images.filter(
      item => item?.id !== value?.id,
    );
    setTimeout(async () => {
      await AsyncStorage.setItem('postGallery', JSON.stringify(data));
      dispatch(managePostsImage(data));
      setImages(data);
      setIsDisable(false);
    }, 1);
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          margin: 20,
          borderRadius: 10,
          backgroundColor: '#fff',
          elevation: 4,
          shadowColor: '#00FF00',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.25,
          shadowRadius: 3,
        }}>
        <View style={{marginTop: 50}}>
          <View>
            <Text
              style={{
                fontSize: REGULAR,
                textAlign: 'center',
                color: 'blue',
                fontWeight: 'bold',
              }}>
              {item.title}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#eee',
              marginVertical: 15,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: SMALL,
                color: 'black',
                textAlign: 'justify',
              }}>
              {item.body}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => DeleteImage(item)}
          activeOpacity={0.9}
          style={styles.buttonDelete}>
          <Icons
            color={'red'}
            name="ios-trash-bin"
            size={MEDIUM_SMALL_VERTICAL_SPACE}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {images?.length ? (
        <View style={{flex: 1, alignItems: 'center'}}>
          <FlatList
            data={images}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            removeClippedSubviews
          />
          {isDisable && (
            <View
              style={{
                width: '35%',
                height: '10%',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 8,
                backgroundColor: 'transparent',
                flex: 1,
              }}>
              <ActivityIndicator size={40} color="#00ff00" />
              <Text>Deleting...</Text>
            </View>
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

const styles = StyleSheet.create({
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
    margin: 4,
    width: (width - 24) / 3,
    height: (width - 24) / 3,
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
    width: '20%',
    height: '20%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',    
    right: 3,
    backgroundColor: '#ffffff92',
  },
  titleDelete: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'red',
  },
});
export default PostsScreen;
