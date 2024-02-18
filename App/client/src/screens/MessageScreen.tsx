import React from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import NavHeader from '../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import Message from '../components/Message/Message';
import {message} from '../data/data.user';

const MessageScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <NavHeader />
          <FlatList
            data={message}
            renderItem={({item, index}) => {
              return <Message item={item} key={index} />;
            }}
          />
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252d3a',
  },
});
