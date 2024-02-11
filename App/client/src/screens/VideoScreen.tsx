import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const VideoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: '#000'}}>VideoScreen</Text>
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
