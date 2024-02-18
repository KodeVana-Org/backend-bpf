import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
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
import FAB from '../components/FloatingActionButton/FAB';

const Videocreen = () => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text>Videocreen</Text>
          </Animated.View>
        </GestureHandlerRootView>
      </ScrollView>
      <FAB />
    </SafeAreaProvider>
  );
};

export default Videocreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252d3a',
    paddingBottom: 750,
  },
});
