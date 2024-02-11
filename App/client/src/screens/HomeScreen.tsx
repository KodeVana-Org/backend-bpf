import React from 'react';
import {StyleSheet, FlatList, ScrollView} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SystemBars} from 'react-native-bars';
import Drawer from '../components/Drawer/Drawer';
import Header from '../components/Header/Header';
import {message} from '../data/data.drawer';
import Message from '../components/Message/Message';
import ImageCarousal from '../components/Corousel/ImageCarousal';
import JoinDonate from '../components/Join_Donate/JoinDonate';
import FAB from '../components/FloatingActionButton/FAB';

const HomeScreen = () => {
  const active = useSharedValue(false);
  const drawerWidth = useSharedValue(1000);
  const drawerTranslateX = useSharedValue(-drawerWidth.value);

  const animatedStyle = useAnimatedStyle(() => {
    const containerTranslateX = interpolate(
      drawerTranslateX.value,
      [-drawerWidth.value, 0],
      [0, 100],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{translateX: containerTranslateX}],
    };
  });

  return (
    <SafeAreaProvider>
      <ScrollView>
        <GestureHandlerRootView style={{flex: 1}}>
          {/* If you're not using react-native-bars, you can remove SystemBars */}
          <SystemBars animated={true} barStyle={'light-content'} />
          <Drawer
            active={active}
            translateX={drawerTranslateX}
            drawerWidth={drawerWidth}
          />
          <Animated.View style={[styles.container, animatedStyle]}>
            <Header active={active} />
            <ImageCarousal />
            <JoinDonate />
            <FlatList
              data={message}
              renderItem={({item, index}) => {
                return <Message item={item} key={index} />;
              }}
            />
          </Animated.View>
        </GestureHandlerRootView>
      </ScrollView>
      <FAB />
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252d3a',
    paddingBottom: 100,
  },
});
