import React from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import GalleryFlatlist from '../../components/GalleryFlatlist/GalleryFlatlist';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const GalleryScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        <NavHeader title={'Gallery'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.imageContainer}>
          <GalleryFlatlist horizontal={false} marginType="bottom" />
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    marginTop: 10,
  },
  image: {
    height: 300,
    width: windowWidth,
  },
});
