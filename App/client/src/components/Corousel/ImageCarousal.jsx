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
      image: require('../../assets/images/CorouselImage1.jpg'),
    },
    {
      image: require('../../assets/images/CorouselImage2.jpg'),
    },
    {
      image: require('../../assets/images/CorouselImage3.jpg'),
    },
    {
      image: require('../../assets/images/CorouselImage4.jpg'),
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
    backgroundColor: '#fff',
  },
  carouselContainer: {
    marginBottom: 16,
  },
});
