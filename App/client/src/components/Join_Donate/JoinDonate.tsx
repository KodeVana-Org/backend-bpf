import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {RootStackParamList} from '../../navigator/RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const JoinDonate = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleJoinPress = () => {
    navigation.navigate('JoinScreen');
  };

  const handleDonatePress = () => {
    navigation.navigate('DonateScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleJoinPress} style={styles.button}>
        <Text style={styles.buttonText}>Join BPF</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDonatePress} style={styles.button}>
        <Text style={styles.buttonText}>Donate us</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinDonate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#252d3a',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: '#1d2733',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 2,
  },
});
