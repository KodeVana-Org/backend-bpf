import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import BackIcon from '../../assets/icons/ArrowIcon.svg';
import {useNavigation} from '@react-navigation/native';

const NavHeader = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        //If you're not using react-native-bars, you can remove these edges
        {paddingTop: insets.top},
        // {paddingTop: Platform.OS === 'ios' ? insets.top : 20},
      ]}>
      <Pressable style={styles.backIcon} onPress={handleBackPress}>
        <Image
          source={require('../../assets/icons/ArrowIcon.png')}
          style={styles.back}
        />
        {/* <BackIcon width={23} height={23} fill="white" /> */}
      </Pressable>
    </View>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1d2733',
    height: 80,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  backIcon: {
    transform: [{rotate: '180deg'}],
  },
  back: {
    width: 35,
    height: 35,
    // color: 'white',
  },
});
