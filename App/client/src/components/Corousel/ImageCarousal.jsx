import {
  StyleSheet,
  SafeAreaView,
  // Platform,
  // StatusBar,
  View,
} from 'react-native';
import React from 'react';
import CustomImageCarousal from './CustomImageCarousal';

const ImageCarousal = () => {
  const data = [
    {
      image: require('../../assets/images/image-product-1.jpg'),
    },
    {
      image: require('../../assets/images/image-product-2.jpg'),
    },
    {
      image: require('../../assets/images/image-product-3.jpg'),
    },
    {
      image: require('../../assets/images/image-product-4.jpg'),
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        <CustomImageCarousal data={data} autoPlay={true} pagination={true} />
      </View>
    </SafeAreaView>
  );
};

export default ImageCarousal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#252d3a',
  },
  carouselContainer: {
    marginBottom: 16,
  },
});
