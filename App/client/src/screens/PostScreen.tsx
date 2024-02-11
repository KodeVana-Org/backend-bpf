import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const PostScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: '#000'}}>PostScreen</Text>
    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
