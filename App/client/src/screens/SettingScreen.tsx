import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: '#000'}}>SettingScreen</Text>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
