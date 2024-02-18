import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../components/BottomButton/CustomBottomTab';
// import HomeScreen from '../screens/HomeScreen';
// import PostScreen from '../screens/PostScreen';
// import VideoScreen from '../screens/VideoScreen';
// import LiveScreen from '../screens/LiveScreen';
// import ConferenceScreen from '../screens/ConferenceScreen';

import BTCHistoryScreen from '../screens/BTCHistoryScreen';
import MissionScreen from '../screens/MissionScreen';
import AchievementScreen from '../screens/AchievementScreen';
import VissionScreen from '../screens/VissionScreen.tsx';
import CommitteeScreen from '../screens/VissionScreen.tsx';
import MessageScreen from '../screens/MissionScreen.tsx';
import GalleryScreen from '../screens/BTCHistoryScreen.tsx';
import AboutScreen from '../screens/AchievementScreen.tsx';

export type BottomTabParamList = {
  Home: undefined;
  Post: undefined;
  Video: undefined;
  Live: undefined;
  Conference: undefined;
};

const CustomBottomTabs = (props: BottomTabBarProps) => {
  return <CustomBottomTab {...props} />;
};

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator
      tabBar={CustomBottomTabs}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={BTCHistoryScreen} />
      <Tab.Screen name="Post" component={MissionScreen} />
      <Tab.Screen name="Video" component={AchievementScreen} />
      <Tab.Screen name="Live" component={VissionScreen} />
      <Tab.Screen name="Conference" component={CommitteeScreen} />
      <Tab.Screen name="Video" component={MessageScreen} />
      <Tab.Screen name="Live" component={GalleryScreen} />
      <Tab.Screen name="Conference" component={AboutScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
