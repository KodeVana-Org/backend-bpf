import React, {useState, useEffect} from 'react';
import {FlatList, View, Image, StyleSheet, Dimensions} from 'react-native';
import {get_gallery} from '../../api/app_data_api';

const {width} = Dimensions.get('window');

const GalleryFlatlist = ({
  horizontal,
  marginType,
}: {
  horizontal: boolean;
  marginType?: 'bottom' | 'right';
}) => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await get_gallery();
        setGallery(response.gallery);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };

    fetchGallery();
  }, []);

  const calculateMargin = () => {
    if (marginType === 'bottom') {
      return {marginBottom: 20};
    } else {
      return {marginRight: 20};
    }
  };

  const startIndex = gallery.length - 5;

  const filteredGallery =
    marginType === 'right' ? gallery.slice(startIndex) : gallery;

  return (
    <View style={[styles.container, calculateMargin()]}>
      <FlatList
        data={filteredGallery.reverse()}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingRight: horizontal ? 16 : 0}}
        renderItem={({item}) => (
          <View style={[styles.postContainer, calculateMargin()]}>
            <Image source={{uri: item.imageUrl[0]}} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.2,
    width: width - 40,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 7,
  },
  text: {
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
  },
});

export default GalleryFlatlist;
