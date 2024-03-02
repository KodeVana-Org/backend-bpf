import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function SplashScreen() {
  return (
    <View>
      <Text style={styles.text}>SplashScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
});
