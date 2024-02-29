import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackIconLight from '../../assets/icons/ChevronLeftLight.js';
import {useNavigation} from '@react-navigation/native';

const NavHeader = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        //If you're not using react-native-bars, you can remove these edges
        {paddingTop: insets.top},
        {paddingTop: Platform.OS === 'ios' ? insets.top : 12},
      ]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIcon}>
        <BackIconLight width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#046A38',
  },
  backIcon: {},
});
