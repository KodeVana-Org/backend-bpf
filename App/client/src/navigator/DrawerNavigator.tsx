import React from 'react';
import {
  DrawerScreenProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import CustomSideDrawer from '../components/Drawer/CustomSideDrawer.tsx';
import BTCHistoryScreen from '../screens/drawer/BTCHistoryScreen.tsx';
import MissionScreen from '../screens/drawer/MissionScreen.tsx';
import AchievementScreen from '../screens/drawer/AchievementScreen.tsx';
import VissionScreen from '../screens/drawer/VissionScreen.tsx';
import CommitteeScreen from '../screens/drawer/CommitteeScreen.tsx';
import GalleryScreen from '../screens/drawer/GalleryScreen.tsx';
import AboutScreen from '../screens/drawer/AboutScreen.tsx';

export type DrawerParamList = {
  navigate(arg0: string): void;
  History: undefined;
  Mission: undefined;
  Achievement: undefined;
  Vission: undefined;
  Committee: undefined;
  Gallery: undefined;
  About: undefined;
};

const CustomSideDrawers = () => {
  return (
    <CustomSideDrawer
      active={undefined}
      translateX={undefined}
      drawerWidth={undefined}
    />
  );
};

const DrawerNavigator = () => {
  const Stack = createDrawerNavigator<DrawerParamList>();

  return (
    <Stack.Navigator
      drawerContent={CustomSideDrawers}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="History" component={BTCHistoryScreen} />
      <Stack.Screen name="Mission" component={MissionScreen} />
      <Stack.Screen name="Achievement" component={AchievementScreen} />
      <Stack.Screen name="Vission" component={VissionScreen} />
      <Stack.Screen name="Committee" component={CommitteeScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default DrawerNavigator;
