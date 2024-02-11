import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const DonateScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: '#000'}}>DonateScreen</Text>
    </SafeAreaView>
  );
};

export default DonateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
