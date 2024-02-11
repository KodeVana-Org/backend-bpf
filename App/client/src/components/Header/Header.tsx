import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SharedValue} from 'react-native-reanimated';
import BellIcon from '../../assets/icons/Bell.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigator/RootNavigator';
import {useNavigation} from '@react-navigation/native';

type Props = {
  active: SharedValue<boolean>;
};

const Header = ({active}: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNotificationPress = () => {
    navigation.navigate('NotificationScreen');
  };

  return (
    <View
      style={[
        styles.container,
        //If you're not using react-native-bars, you can remove these edges
        {paddingTop: insets.top},
        // {paddingTop: Platform.OS === 'ios' ? insets.top : 20},
      ]}>
      <Pressable
        style={styles.ham}
        onPress={() => {
          active.value = true;
        }}>
        <Image
          source={require('../../assets/icons/Hamburger.png')}
          style={styles.ham}
        />
      </Pressable>
      <Pressable style={styles.bell} onPress={handleNotificationPress}>
        <BellIcon width={23} height={23} fill="white" />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#252d3a',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  ham: {
    width: 35,
    height: 35,
  },
  bell: {},
});
