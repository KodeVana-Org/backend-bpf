import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

const VissionScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        <NavHeader />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{color: '#000'}}>VissionScreen</Text>
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default VissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
