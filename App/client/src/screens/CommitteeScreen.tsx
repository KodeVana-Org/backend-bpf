import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import NavHeader from '../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import data from '../data/data.member';
import Accordion from '../components/Accordion/Accordion';

const CommitteeScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <NavHeader />
          <Text style={styles.text}>BPF Committee</Text>
          {data.map((value, index) => {
            return <Accordion value={value} key={index} type={value.type} />;
          })}
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default CommitteeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252d3a',
  },
  text: {
    marginLeft: 10,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});
