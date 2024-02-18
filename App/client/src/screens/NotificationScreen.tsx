import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import NavHeader from '../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

const NotificationScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <NavHeader />
          <Text style={{color: '#000'}}>NotificationScreen</Text>
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
